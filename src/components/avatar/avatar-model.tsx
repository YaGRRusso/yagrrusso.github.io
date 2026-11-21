"use client";

import { Center, useAnimations, useGLTF } from "@react-three/drei";
import {
  type ComponentProps,
  type ReactNode,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import type { Group, Object3D, Vector3 } from "three";
import type { NormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import {
  type BoneLookAtSettings,
  useBoneLookAt,
} from "@/hooks/three/use-bone-look-at";
import { getOrThrow } from "@/lib/get-or-throw";

function disableFrustumCulling(root: Object3D): void {
  root.traverse((object) => {
    object.frustumCulled = false;
  });
}

interface AvatarModelProps extends Omit<ComponentProps<"group">, "ref"> {
  gazeTarget: Vector3;
  headBoneName: string;
  idleClipName: string;
  lookSettings: BoneLookAtSettings;
  modelPath: string;
  onReady: () => void;
  pointerRef: RefObject<NormalizedPointer | null>;
}

export function AvatarModel({
  gazeTarget,
  headBoneName,
  idleClipName,
  lookSettings,
  modelPath,
  onReady,
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

  useEffect(() => onReady(), [onReady]);

  useLayoutEffect(() => {
    const idle = getOrThrow(
      animations.actions[idleClipName],
      `animation clip "${idleClipName}" in ${modelPath}`
    );
    idle.reset().play();

    return () => {
      idle.stop();
    };
  }, [animations.actions, idleClipName, modelPath]);

  // intentionally after useAnimations: the look offset must run after the mixer each frame
  useBoneLookAt({
    bone: headBone,
    gazeTarget,
    pointerRef,
    rootRef: rigRef,
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
