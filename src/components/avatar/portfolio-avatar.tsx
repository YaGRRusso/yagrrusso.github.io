"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { mapValues } from "lodash";
import { type ComponentProps, type ReactNode, useRef, useState } from "react";
import { Vector3, type Vector3Tuple } from "three";
import { DebugMarker } from "@/components/three/debug-marker";
import { LookAtCamera } from "@/components/three/look-at-camera";
import { OrbitDebugControls } from "@/components/three/orbit-debug-controls";
import { SnapshotDebugControls } from "@/components/three/snapshot-debug-controls";
import { useInViewport } from "@/hooks/reactive/use-in-viewport";
import { useNormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import type { BoneLookAtSettings } from "@/hooks/three/use-bone-look-at";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { useDebugStore } from "@/stores/debug";
import { AvatarModel } from "./avatar-model";

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

useGLTF.preload(AVATAR_MODEL.path);

const LOOK_FOLDER = "look";

const DEFAULT_HEAD_LOOK: BoneLookAtSettings = {
  dampSpeed: 4,
  pitchLimit: 0.45,
  targetDepth: 0.5,
  yawLimit: 0.6,
};

function logHeadLook(get: (path: string) => number): void {
  console.log(
    mapValues(DEFAULT_HEAD_LOOK, (_, key) => get(`${LOOK_FOLDER}.${key}`))
  );
}

interface PortfolioAvatarProps extends Omit<ComponentProps<"div">, "ref"> {
  onReady: () => void;
}

export function PortfolioAvatar({
  className,
  onReady,
  ...props
}: PortfolioAvatarProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(containerRef);
  const headLook = useControls(LOOK_FOLDER, {
    dampSpeed: { max: 30, min: 1, value: DEFAULT_HEAD_LOOK.dampSpeed },
    pitchLimit: { max: 1.57, min: 0, value: DEFAULT_HEAD_LOOK.pitchLimit },
    targetDepth: { max: 3, min: 0.05, value: DEFAULT_HEAD_LOOK.targetDepth },
    yawLimit: { max: 1.57, min: 0, value: DEFAULT_HEAD_LOOK.yawLimit },
  });
  useControls({ "log look": button(logHeadLook) });
  const debugStore = useDebugStore();
  const animation = useControls("animation", {
    paused: {
      onChange: debugStore.setIsAnimationPaused,
      transient: false,
      value: debugStore.isAnimationPaused,
    },
  });
  const isAnimating = isInViewport && !animation.paused;
  const pointerRef = useNormalizedPointer(containerRef, isAnimating);
  const [gazeTarget] = useState(() => new Vector3());

  return (
    <div
      className={cn("h-full w-full", className)}
      ref={containerRef}
      {...props}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={isAnimating ? "always" : "demand"}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) =>
            event.preventDefault()
          );
        }}
      >
        <LookAtCamera
          fov={AVATAR_CAMERA.fov}
          makeDefault
          position={AVATAR_CAMERA.position}
          target={AVATAR_CAMERA.target}
        />
        {env.NEXT_PUBLIC_DEBUG && (
          <>
            <OrbitDebugControls
              cameraPosition={AVATAR_CAMERA.position}
              target={AVATAR_CAMERA.target}
            />
            <DebugMarker color="red" target={gazeTarget} />
            <SnapshotDebugControls />
          </>
        )}
        <ambientLight intensity={0.85} />
        <directionalLight intensity={1.3} position={[2, 3, 2]} />
        <Environment files="/hdri/city.hdr" frames={1} />
        <AvatarModel
          gazeTarget={gazeTarget}
          headBoneName={AVATAR_MODEL.headBoneName}
          idleClipName={AVATAR_MODEL.idleClipName}
          lookSettings={headLook}
          modelPath={AVATAR_MODEL.path}
          onReady={onReady}
          pointerRef={pointerRef}
        />
      </Canvas>
    </div>
  );
}
