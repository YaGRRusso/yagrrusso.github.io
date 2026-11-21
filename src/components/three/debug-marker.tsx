"use client";

import { useFrame } from "@react-three/fiber";
import { type ReactNode, useRef } from "react";
import type { ColorRepresentation, Mesh, Vector3 } from "three";

const MARKER_RADIUS = 0.015;

interface DebugMarkerProps {
  color: ColorRepresentation;
  target: Vector3;
}

export function DebugMarker({ color, target }: DebugMarkerProps): ReactNode {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    meshRef.current?.position.copy(target);
  });

  return (
    <mesh ref={meshRef} renderOrder={1}>
      <sphereGeometry args={[MARKER_RADIUS, 16, 16]} />
      <meshBasicMaterial color={color} depthTest={false} />
    </mesh>
  );
}
