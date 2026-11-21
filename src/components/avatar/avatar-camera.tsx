"use client";

import { PerspectiveCamera } from "@react-three/drei";
import {
  type ComponentRef,
  type ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import type { Vector3Tuple } from "three";

interface AvatarCameraProps {
  fov: number;
  position: Vector3Tuple;
  target: Vector3Tuple;
}

export function AvatarCamera({
  fov,
  position,
  target,
}: AvatarCameraProps): ReactNode {
  const cameraRef = useRef<ComponentRef<typeof PerspectiveCamera>>(null);
  const [targetX, targetY, targetZ] = target;

  useLayoutEffect(() => {
    cameraRef.current?.lookAt(targetX, targetY, targetZ);
  }, [targetX, targetY, targetZ]);

  return (
    <PerspectiveCamera
      fov={fov}
      makeDefault
      position={position}
      ref={cameraRef}
    />
  );
}
