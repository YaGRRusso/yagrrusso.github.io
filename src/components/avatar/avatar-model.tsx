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
import { getOrThrow } from "@/lib/get-or-throw";
import { type HeadLookSettings, useHeadLook } from "./use-head-look";

const IDLE_FADE_IN_SECONDS = 0.25;
const IDLE_FADE_OUT_SECONDS = 0.2;

function disableFrustumCulling(root: Object3D): void {
  root.traverse((object) => {
    object.frustumCulled = false;
  });
}

interface AvatarModelProps extends ComponentProps<"group"> {
  gazeTarget: Vector3;
  headBoneName: string;
  idleClipName: string;
  lookSettings: HeadLookSettings;
  modelPath: string;
  pointerRef: RefObject<NormalizedPointer>;
}

export function AvatarModel({
  gazeTarget,
  headBoneName,
  idleClipName,
  lookSettings,
  modelPath,
  pointerRef,
  ...props
}: AvatarModelProps): ReactNode {
  const gltf = useGLTF(modelPath);
  const rigRef = useRef<Group>(null);
  const animations = useAnimations(gltf.animations, rigRef);

  const headBone = useMemo(
    () =>
      getOrThrow(
        gltf.scene.getObjectByName(headBoneName),
        `head bone "${headBoneName}" in ${modelPath}`
      ),
    [gltf.scene, headBoneName, modelPath]
  );

  useEffect(() => disableFrustumCulling(gltf.scene), [gltf.scene]);

  useEffect(() => {
    const idle = getOrThrow(
      animations.actions[idleClipName],
      `animation clip "${idleClipName}" in ${modelPath}`
    );
    idle.reset().fadeIn(IDLE_FADE_IN_SECONDS).play();

    return () => {
      idle.fadeOut(IDLE_FADE_OUT_SECONDS);
    };
  }, [animations.actions, idleClipName, modelPath]);

  // intentionally after useAnimations: the look offset must run after the mixer each frame
  useHeadLook({
    gazeTarget,
    headBone,
    pointerRef,
    rigRef,
    settings: lookSettings,
  });

  return (
    <group ref={rigRef} {...props}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  );
}
