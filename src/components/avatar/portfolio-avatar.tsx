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
import { useAvatarStore } from "@/stores/avatar";
import { useDebugStore } from "@/stores/debug";
import { type AvatarLookBone, AvatarModel } from "./avatar-model";

const AVATAR_CAMERA = {
  fov: 30,
  position: [0, 0.6, 1.6],
  target: [0, 0.6, 0],
} satisfies { fov: number; position: Vector3Tuple; target: Vector3Tuple };

const AVATAR_MODEL = {
  boneNames: { head: "Head", torso: "Spine2" },
  idleClipName: "IdleV4.2(maya_head)",
  mixamoClipPaths: { wave: "/animations/wave.glb" },
  path: "/model.glb",
} as const;

useGLTF.preload(AVATAR_MODEL.path);

const DEFAULT_LOOK = {
  head: {
    dampSpeed: 4,
    pitchLimit: 0.45,
    targetDepth: 0.5,
    weight: 1,
    yawLimit: 0.6,
  },
  torso: {
    dampSpeed: 2,
    pitchLimit: 0.15,
    targetDepth: 0.5,
    weight: 0.35,
    yawLimit: 0.35,
  },
} satisfies Record<AvatarLookBone, BoneLookAtSettings>;

function logLook(get: (path: string) => number): void {
  console.log({
    head: mapValues(DEFAULT_LOOK.head, (_, key) => get(`head.${key}`)),
    torso: mapValues(DEFAULT_LOOK.torso, (_, key) => get(`torso.${key}`)),
  });
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
  const headLook = useControls("head", {
    dampSpeed: { max: 30, min: 1, value: DEFAULT_LOOK.head.dampSpeed },
    pitchLimit: { max: 1.57, min: 0, value: DEFAULT_LOOK.head.pitchLimit },
    targetDepth: { max: 3, min: 0.05, value: DEFAULT_LOOK.head.targetDepth },
    weight: { max: 1, min: 0, value: DEFAULT_LOOK.head.weight },
    yawLimit: { max: 1.57, min: 0, value: DEFAULT_LOOK.head.yawLimit },
  });
  const torsoLook = useControls("torso", {
    dampSpeed: { max: 30, min: 1, value: DEFAULT_LOOK.torso.dampSpeed },
    pitchLimit: { max: 1.57, min: 0, value: DEFAULT_LOOK.torso.pitchLimit },
    targetDepth: { max: 3, min: 0.05, value: DEFAULT_LOOK.torso.targetDepth },
    weight: { max: 1, min: 0, value: DEFAULT_LOOK.torso.weight },
    yawLimit: { max: 1.57, min: 0, value: DEFAULT_LOOK.torso.yawLimit },
  });
  useControls({ "log look": button(logLook) });
  const debugStore = useDebugStore();
  const playClip = useAvatarStore((store) => store.playClip);
  useControls("animation", {
    paused: {
      onChange: debugStore.setIsAnimationPaused,
      value: debugStore.isAnimationPaused,
    },
  });
  const isAnimating = isInViewport && !debugStore.isAnimationPaused;
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
          boneNames={AVATAR_MODEL.boneNames}
          gazeTarget={gazeTarget}
          idleClipName={AVATAR_MODEL.idleClipName}
          lookSettings={{ head: headLook, torso: torsoLook }}
          mixamoClipPaths={AVATAR_MODEL.mixamoClipPaths}
          modelPath={AVATAR_MODEL.path}
          onClick={() => playClip("wave", { repetitions: 1 })}
          onReady={onReady}
          pointerRef={pointerRef}
        />
      </Canvas>
    </div>
  );
}
