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
import type { AvatarClipName, AvatarLookBone } from "./avatar-config";

interface AvatarModelProps extends Omit<ComponentProps<"group">, "ref"> {
  boneNames: Record<AvatarLookBone, string>;
  gazeTarget: Vector3;
  idleClipName: string;
  lookSettings: Record<AvatarLookBone, BoneLookAtSettings>;
  mixamoClipPaths: Record<AvatarClipName, string>;
  modelPath: string;
  onReady: () => void;
  pointerRef: RefObject<NormalizedPointer | null>;
}

export function AvatarModel({
  boneNames,
  gazeTarget,
  idleClipName,
  lookSettings,
  mixamoClipPaths,
  modelPath,
  onReady,
  pointerRef,
  ...props
}: AvatarModelProps): ReactNode {
  const gltf = useGLTF(modelPath);
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
        gltf.scene.getObjectByName(boneNames.head),
        `head bone "${boneNames.head}" in ${modelPath}`
      ),
      torso: getOrThrow(
        gltf.scene.getObjectByName(boneNames.torso),
        `torso bone "${boneNames.torso}" in ${modelPath}`
      ),
    }),
    [boneNames, gltf.scene, modelPath]
  );

  useEffect(() => disableFrustumCulling(gltf.scene), [gltf.scene]);

  useEffect(() => onReady(), [onReady]);

  useClipPlayer({
    actions: animations.actions,
    baseClipName: idleClipName,
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
      <MixamoClipsLoader clipPaths={mixamoClipPaths} onLoad={handleClipLoad} />
    </group>
  );
}
