"use client";

import { PerspectiveCamera } from "@react-three/drei";
import {
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import type { Vector3Tuple } from "three";

interface LookAtCameraProps
  extends Omit<ComponentProps<typeof PerspectiveCamera>, "ref"> {
  target: Vector3Tuple;
}

export function LookAtCamera({
  target,
  ...props
}: LookAtCameraProps): ReactNode {
  const cameraRef = useRef<ComponentRef<typeof PerspectiveCamera>>(null);

  useLayoutEffect(() => {
    cameraRef.current?.lookAt(...target);
  });

  return <PerspectiveCamera ref={cameraRef} {...props} />;
}
