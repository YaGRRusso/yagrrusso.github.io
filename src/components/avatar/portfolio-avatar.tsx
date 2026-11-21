"use client";

import { Environment, useCursor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { mapValues, sample } from "lodash";
import { type ComponentProps, type ReactNode, useRef, useState } from "react";
import { Vector3 } from "three";
import { DebugMarker } from "@/components/three/debug-marker";
import { LookAtCamera } from "@/components/three/look-at-camera";
import { OrbitDebugControls } from "@/components/three/orbit-debug-controls";
import { SnapshotDebugControls } from "@/components/three/snapshot-debug-controls";
import { useInViewport } from "@/hooks/reactive/use-in-viewport";
import { useNormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import { useRandomInterval } from "@/hooks/reactive/use-random-interval";
import { BONE_LOOK_AT_RANGES } from "@/hooks/three/use-bone-look-at";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { useAvatarStore } from "@/stores/avatar";
import { useDebugStore } from "@/stores/debug";
import {
  HDRI_ASSETS,
  MODEL_ASSETS,
  SCENES,
  type Scene,
  type SceneId,
} from "./avatar-config";
import { AvatarModel } from "./avatar-model";

const IDLE_BREAK_ANIMATIONS = ["arm-stretching", "neck-stretching"] as const;

function logLook(get: (path: string) => number, look: Scene["look"]): void {
  console.log({
    head: mapValues(look.head, (_, key) => get(`head.${key}`)),
    torso: mapValues(look.torso, (_, key) => get(`torso.${key}`)),
  });
}

interface PortfolioAvatarProps extends Omit<ComponentProps<"div">, "ref"> {
  onReady: () => void;
  sceneId: SceneId;
}

export function PortfolioAvatar({
  className,
  onReady,
  sceneId,
  ...props
}: PortfolioAvatarProps): ReactNode {
  const scene = SCENES[sceneId];
  const model = MODEL_ASSETS[scene.model];
  const hdri = HDRI_ASSETS[scene.hdri];
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(containerRef);
  const headLook = useControls("head", {
    dampSpeed: {
      ...BONE_LOOK_AT_RANGES.dampSpeed,
      value: scene.look.head.dampSpeed,
    },
    pitchLimit: {
      ...BONE_LOOK_AT_RANGES.pitchLimit,
      value: scene.look.head.pitchLimit,
    },
    targetDepth: {
      ...BONE_LOOK_AT_RANGES.targetDepth,
      value: scene.look.head.targetDepth,
    },
    weight: { ...BONE_LOOK_AT_RANGES.weight, value: scene.look.head.weight },
    yawLimit: {
      ...BONE_LOOK_AT_RANGES.yawLimit,
      value: scene.look.head.yawLimit,
    },
  });
  const torsoLook = useControls("torso", {
    dampSpeed: {
      ...BONE_LOOK_AT_RANGES.dampSpeed,
      value: scene.look.torso.dampSpeed,
    },
    pitchLimit: {
      ...BONE_LOOK_AT_RANGES.pitchLimit,
      value: scene.look.torso.pitchLimit,
    },
    targetDepth: {
      ...BONE_LOOK_AT_RANGES.targetDepth,
      value: scene.look.torso.targetDepth,
    },
    weight: { ...BONE_LOOK_AT_RANGES.weight, value: scene.look.torso.weight },
    yawLimit: {
      ...BONE_LOOK_AT_RANGES.yawLimit,
      value: scene.look.torso.yawLimit,
    },
  });
  useControls({ "log look": button((get) => logLook(get, scene.look)) });
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
  useRandomInterval(() => playClip(sample(IDLE_BREAK_ANIMATIONS)), {
    isEnabled: isAnimating,
    maxMs: 30_000,
    minMs: 10_000,
  });
  const [gazeTarget] = useState(() => new Vector3());
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  useCursor(isAvatarHovered);

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
          fov={scene.camera.fov}
          makeDefault
          position={scene.camera.position}
          target={scene.camera.target}
        />
        {env.NEXT_PUBLIC_DEBUG && (
          <>
            <OrbitDebugControls
              cameraPosition={scene.camera.position}
              target={scene.camera.target}
            />
            <DebugMarker color="red" target={gazeTarget} />
            <SnapshotDebugControls />
          </>
        )}
        <ambientLight intensity={0.85} />
        <directionalLight intensity={1.3} position={[2, 3, 2]} />
        <Environment files={hdri.path} frames={1} />
        <AvatarModel
          animationIds={scene.animations}
          gazeTarget={gazeTarget}
          idleId={scene.idle}
          lookSettings={{ head: headLook, torso: torsoLook }}
          model={model}
          onClick={() => playClip("waving", { repetitions: 1 })}
          onPointerOut={() => setIsAvatarHovered(false)}
          onPointerOver={() => setIsAvatarHovered(true)}
          onReady={onReady}
          pointerRef={pointerRef}
          restGaze={scene.restGaze}
        />
      </Canvas>
    </div>
  );
}
