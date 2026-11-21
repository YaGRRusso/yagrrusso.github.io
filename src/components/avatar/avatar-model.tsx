"use client";

import { Center, useAnimations, useGLTF } from "@react-three/drei";
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
import type { AnimationClip, Group, Vector3 } from "three";
import { MixamoClipsLoader } from "@/components/three/mixamo-clips-loader";
import type { NormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import {
  type BoneLookAtSettings,
  useBoneLookAt,
} from "@/hooks/three/use-bone-look-at";
import { useClipPlayer } from "@/hooks/three/use-clip-player";
import { disableFrustumCulling } from "@/lib/disable-frustum-culling";
import { getOrThrow } from "@/lib/get-or-throw";
import { useAvatarStore } from "@/stores/avatar";
import {
  ANIMATION_ASSETS,
  type AnimationId,
  type AvatarLookBone,
  type ModelAsset,
} from "./avatar-config";

interface AvatarModelProps extends Omit<ComponentProps<"group">, "ref"> {
  animationIds: AnimationId[];
  gazeTarget: Vector3;
  lookSettings: Record<AvatarLookBone, BoneLookAtSettings>;
  model: ModelAsset;
  onReady: () => void;
  pointerRef: RefObject<NormalizedPointer | null>;
}

export function AvatarModel({
  animationIds,
  gazeTarget,
  lookSettings,
  model,
  onReady,
  pointerRef,
  ...props
}: AvatarModelProps): ReactNode {
  const gltf = useGLTF(model.path);
  const rigRef = useRef<Group>(null);
  const animations = useAnimations(gltf.animations, rigRef);
  const [loadedClips] = useState(() => new Map<string, AnimationClip>());
  const handleClipLoad = useCallback(
    (name: string, clip: AnimationClip) => loadedClips.set(name, clip),
    [loadedClips]
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
    baseClipName: model.idleClipName,
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
    rootRef: rigRef,
  });

  return (
    <group ref={rigRef} {...props}>
      <Center>
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
