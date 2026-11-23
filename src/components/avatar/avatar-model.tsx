"use client";

import { Center, useAnimations, useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import {
  type ComponentProps,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type AnimationClip,
  type Group,
  SkinnedMesh,
  type Vector3,
} from "three";
import { MixamoClipsLoader } from "@/components/three/mixamo-clips-loader";
import type { NormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import {
  type BoneLookAtSettings,
  useBoneLookAt,
} from "@/hooks/three/use-bone-look-at";
import { useClipPlayer } from "@/hooks/three/use-clip-player";
import { assertClipMatchesModel } from "@/lib/assert-clip-matches-model";
import { assertSingleClip } from "@/lib/assert-single-clip";
import { disableFrustumCulling } from "@/lib/disable-frustum-culling";
import { getDominantBone } from "@/lib/get-dominant-bone";
import { getOrThrow } from "@/lib/get-or-throw";
import { toInPlaceMixamoClip } from "@/lib/mixamo";
import { useAvatarStore } from "@/stores/avatar";
import {
  ANIMATION_ASSETS,
  type AnimationId,
  type AvatarLookBone,
  type ModelAsset,
} from "./avatar-config";

interface AvatarModelProps
  extends Omit<ComponentProps<"group">, "onClick" | "ref"> {
  animationIds: AnimationId[];
  gazeTarget: Vector3;
  idleId: AnimationId;
  lookSettings: Record<AvatarLookBone, BoneLookAtSettings>;
  model: ModelAsset;
  onBodyClick: (part: AvatarLookBone) => void;
  onClipLoad: (name: string) => void;
  onReady: () => void;
  pointerRef: RefObject<NormalizedPointer | null>;
  restGaze: NormalizedPointer;
}

export function AvatarModel({
  animationIds,
  gazeTarget,
  idleId,
  lookSettings,
  model,
  onBodyClick,
  onClipLoad,
  onReady,
  pointerRef,
  restGaze,
  ...props
}: AvatarModelProps): ReactNode {
  const gltf = useGLTF(model.path);
  const idleGltf = useGLTF(ANIMATION_ASSETS[idleId].path);
  const rigRef = useRef<Group>(null);
  const idleClips = useMemo(
    () => [
      assertClipMatchesModel(
        toInPlaceMixamoClip(
          assertSingleClip(idleGltf.animations, ANIMATION_ASSETS[idleId].path),
          idleId
        ),
        gltf.scene,
        ANIMATION_ASSETS[idleId].path
      ),
    ],
    [gltf.scene, idleGltf.animations, idleId]
  );
  const animations = useAnimations(idleClips, rigRef);
  const [loadedClips] = useState(() => new Map<string, AnimationClip>());
  const onClipLoadRef = useRef(onClipLoad);
  onClipLoadRef.current = onClipLoad;
  const handleClipLoad = useCallback(
    (name: string, clip: AnimationClip) => {
      loadedClips.set(
        name,
        assertClipMatchesModel(clip, gltf.scene, `animation "${name}"`)
      );
      onClipLoadRef.current(name);
    },
    [gltf.scene, loadedClips]
  );
  const clipRequest = useAvatarStore((store) => store.clipRequest);

  const bones = useMemo(
    () => ({
      head: getOrThrow(
        gltf.scene.getObjectByName(model.boneNames.head),
        `head bone "${model.boneNames.head}" in ${model.path}`
      ),
      torso: getOrThrow(
        gltf.scene.getObjectByName(model.boneNames.torso),
        `torso bone "${model.boneNames.torso}" in ${model.path}`
      ),
    }),
    [gltf.scene, model]
  );

  useEffect(() => disableFrustumCulling(gltf.scene), [gltf.scene]);

  useEffect(() => onReady(), [onReady]);

  useClipPlayer({
    actions: animations.actions,
    baseClipName: idleId,
    clips: loadedClips,
    mixer: animations.mixer,
    request: clipRequest,
    rootRef: rigRef,
  });

  // intentionally after useAnimations and torso before head: each builds on the previous pose
  useBoneLookAt({
    bones: [
      { bone: bones.torso, settings: lookSettings.torso },
      { bone: bones.head, settings: lookSettings.head },
    ],
    gazeTarget,
    pointerRef,
    restPointer: restGaze,
    rootRef: rigRef,
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (!(event.object instanceof SkinnedMesh && event.face)) return;

    const bone = getDominantBone(event.object, event.face.a);
    const isHead = bones.head.getObjectById(bone.id) !== undefined;
    onBodyClick(isHead ? "head" : "torso");
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: three.js group, not a DOM element
    <group onClick={handleClick} ref={rigRef} {...props}>
      {/* intentionally not precise: precise measures the posed skeleton, which includes the previous centering offset */}
      <Center precise={false}>
        <primitive object={gltf.scene} />
      </Center>
      <MixamoClipsLoader
        clips={animationIds.map((id) => ({
          name: id,
          path: ANIMATION_ASSETS[id].path,
        }))}
        onLoad={handleClipLoad}
      />
    </group>
  );
}
