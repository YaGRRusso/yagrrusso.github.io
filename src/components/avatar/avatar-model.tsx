"use client";

import { Center, useAnimations, useGLTF } from "@react-three/drei";
import {
  type ComponentProps,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { Group, Object3D, Vector3 } from "three";
import type { NormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import {
  type BoneLookAtSettings,
  useBoneLookAt,
} from "@/hooks/three/use-bone-look-at";
import { useClipPlayer } from "@/hooks/three/use-clip-player";
import { useMixamoClips } from "@/hooks/three/use-mixamo-clips";
import { getOrThrow } from "@/lib/get-or-throw";
import { useAvatarStore } from "@/stores/avatar";

function disableFrustumCulling(root: Object3D): void {
  root.traverse((object) => {
    object.frustumCulled = false;
  });
}

export type AvatarLookBone = "head" | "torso";

interface AvatarModelProps extends Omit<ComponentProps<"group">, "ref"> {
  boneNames: Record<AvatarLookBone, string>;
  gazeTarget: Vector3;
  idleClipName: string;
  lookSettings: Record<AvatarLookBone, BoneLookAtSettings>;
  mixamoClipPaths: Record<string, string>;
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
  const mixamoClips = useMixamoClips(mixamoClipPaths);
  const rigRef = useRef<Group>(null);
  const clips = useMemo(
    () => [...gltf.animations, ...mixamoClips],
    [gltf.animations, mixamoClips]
  );
  const animations = useAnimations(clips, rigRef);
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
    mixer: animations.mixer,
    request: clipRequest,
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
    </group>
  );
}
