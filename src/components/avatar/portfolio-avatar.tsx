"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { type ReactNode, useRef, useState } from "react";
import { Vector3, type Vector3Tuple } from "three";
import { DebugMarker } from "@/components/three/debug-marker";
import { useInViewport } from "@/hooks/reactive/use-in-viewport";
import { useNormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import { useWindowActive } from "@/hooks/reactive/use-window-active";
import { AvatarCamera } from "./avatar-camera";
import { AvatarModel } from "./avatar-model";
import { CameraDebugControls } from "./camera-debug-controls";
import { useHeadLookTuning } from "./use-head-look-tuning";

const IS_AVATAR_DEBUG = process.env.NEXT_PUBLIC_AVATAR_DEBUG === "true";

const AVATAR_CAMERA = {
  fov: 30,
  position: [0, 0.6, 1.6],
  target: [0, 0.6, 0],
} satisfies { fov: number; position: Vector3Tuple; target: Vector3Tuple };

const AVATAR_MODEL = {
  headBoneName: "Head",
  idleClipName: "IdleV4.2(maya_head)",
  path: "/model.glb",
} as const;

export function PortfolioAvatar(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(containerRef);
  const isWindowActive = useWindowActive();
  const isAnimating = isInViewport && isWindowActive;
  const pointerRef = useNormalizedPointer(containerRef, isAnimating);
  const headLook = useHeadLookTuning();
  const [gazeTarget] = useState(() => new Vector3());

  return (
    <div className="h-full w-full" ref={containerRef}>
      <Leva hidden={!IS_AVATAR_DEBUG} />
      <Canvas
        dpr={[1, 1.5]}
        frameloop={isAnimating ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) =>
            event.preventDefault()
          );
        }}
      >
        <AvatarCamera
          fov={AVATAR_CAMERA.fov}
          position={AVATAR_CAMERA.position}
          target={AVATAR_CAMERA.target}
        />
        {IS_AVATAR_DEBUG && (
          <>
            <CameraDebugControls
              position={AVATAR_CAMERA.position}
              target={AVATAR_CAMERA.target}
            />
            <DebugMarker color="red" target={gazeTarget} />
          </>
        )}
        <ambientLight intensity={0.85} />
        <directionalLight intensity={1.3} position={[2, 3, 2]} />
        <Environment frames={1} preset="city" />
        <AvatarModel
          gazeTarget={gazeTarget}
          headBoneName={AVATAR_MODEL.headBoneName}
          idleClipName={AVATAR_MODEL.idleClipName}
          lookSettings={headLook}
          modelPath={AVATAR_MODEL.path}
          pointerRef={pointerRef}
        />
      </Canvas>
    </div>
  );
}
