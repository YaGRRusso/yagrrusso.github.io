"use client";

import { useFrame } from "@react-three/fiber";
import { type ComponentProps, type ReactNode, useRef } from "react";
import type { ColorRepresentation, Mesh, Vector3 } from "three";

const MARKER_RADIUS = 0.015;

interface DebugMarkerProps extends Omit<ComponentProps<"mesh">, "ref"> {
  color: ColorRepresentation;
  target: Vector3;
}

export function DebugMarker({
  color,
  target,
  ...props
}: DebugMarkerProps): ReactNode {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    meshRef.current?.position.copy(target);
  });

  return (
    <mesh ref={meshRef} renderOrder={1} {...props}>
      <sphereGeometry args={[MARKER_RADIUS, 16, 16]} />
      <meshBasicMaterial color={color} depthTest={false} />
    </mesh>
  );
}
