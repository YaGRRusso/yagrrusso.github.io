"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { mapValues } from "lodash";
import { type ComponentProps, type ReactNode, useRef, useState } from "react";
import { Vector3, type Vector3Tuple } from "three";
import { DebugMarker } from "@/components/three/debug-marker";
import { LookAtCamera } from "@/components/three/look-at-camera";
import { OrbitDebugControls } from "@/components/three/orbit-debug-controls";
import { useInViewport } from "@/hooks/reactive/use-in-viewport";
import { useNormalizedMouse } from "@/hooks/reactive/use-normalized-mouse";
import type { BoneLookAtSettings } from "@/hooks/three/use-bone-look-at";
import { IS_DEBUG } from "@/lib/debug";
import { cn } from "@/lib/utils";
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

const LOOK_FOLDER = "look";

const DEFAULT_HEAD_LOOK: BoneLookAtSettings = {
  dampSpeed: 8,
  pitchLimit: 0.45,
  pitchOffset: 0,
  targetDepth: 0.5,
  yawLimit: 0.7,
  yawOffset: 0,
};

function logHeadLook(get: (path: string) => number): void {
  console.log(
    mapValues(DEFAULT_HEAD_LOOK, (_, key) => get(`${LOOK_FOLDER}.${key}`))
  );
}

function slider(value: number, min: number, max: number, step = 0.01) {
  return { max, min, step, value };
}

type PortfolioAvatarProps = Omit<ComponentProps<"div">, "ref">;

export function PortfolioAvatar({
  className,
  ...props
}: PortfolioAvatarProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(containerRef);
  const mouseRef = useNormalizedMouse(containerRef, isInViewport);
  const headLook = useControls(LOOK_FOLDER, {
    dampSpeed: slider(DEFAULT_HEAD_LOOK.dampSpeed, 1, 30, 0.5),
    pitchLimit: slider(DEFAULT_HEAD_LOOK.pitchLimit, 0, Math.PI / 2),
    pitchOffset: slider(DEFAULT_HEAD_LOOK.pitchOffset, -1, 1),
    targetDepth: slider(DEFAULT_HEAD_LOOK.targetDepth, 0.05, 3),
    yawLimit: slider(DEFAULT_HEAD_LOOK.yawLimit, 0, Math.PI / 2),
    yawOffset: slider(DEFAULT_HEAD_LOOK.yawOffset, -1, 1),
  });
  useControls({ "log look": button(logHeadLook) });
  const [gazeTarget] = useState(() => new Vector3());

  return (
    <div
      className={cn("h-full w-full", className)}
      ref={containerRef}
      {...props}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={isInViewport ? "always" : "demand"}
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
        {IS_DEBUG && (
          <>
            <OrbitDebugControls
              cameraPosition={AVATAR_CAMERA.position}
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
          pointerRef={mouseRef}
        />
      </Canvas>
    </div>
  );
}
