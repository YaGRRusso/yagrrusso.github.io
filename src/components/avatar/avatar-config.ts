import type { Vector3Tuple } from "three";
import type { NormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import type { BoneLookAtSettings } from "@/hooks/three/use-bone-look-at";
import type { ClipOptions } from "@/hooks/three/use-clip-player";

export type AvatarLookBone = "head" | "torso";

export type ModelAsset = {
  boneNames: Record<AvatarLookBone, string>;
  path: string;
};

export type AnimationAsset = { path: string } & ClipOptions;

export type HdriAsset = { path: string };

export const MODEL_ASSETS = {
  avaturn: {
    boneNames: { head: "Head", torso: "Spine2" },
    path: "/models/avaturn.glb",
  },
} satisfies Record<string, ModelAsset>;

export const ANIMATION_ASSETS = {
  "arm-stretching": { path: "/animations/arm-stretching.glb" },
  "head-hit-a": { path: "/animations/head-hit-a.glb", timeScale: 2 },
  "head-hit-b": { path: "/animations/head-hit-b.glb", timeScale: 2 },
  idle: { path: "/animations/idle.glb" },
  "neck-stretching": { path: "/animations/neck-stretching.glb" },
  "spin-in-place": { path: "/animations/spin-in-place.glb" },
  "torso-hit-a": { path: "/animations/torso-hit-a.glb", timeScale: 2 },
  "torso-hit-b": { path: "/animations/torso-hit-b.glb", timeScale: 2 },
  waving: { path: "/animations/waving.glb" },
} satisfies Record<string, AnimationAsset>;

export const HDRI_ASSETS = {
  city: { path: "/hdri/city.hdr" },
} satisfies Record<string, HdriAsset>;

export type ModelId = keyof typeof MODEL_ASSETS;

export type AnimationId = keyof typeof ANIMATION_ASSETS;

export type HdriId = keyof typeof HDRI_ASSETS;

export type Scene = {
  animations: AnimationId[];
  camera: { fov: number; position: Vector3Tuple; target: Vector3Tuple };
  hdri: HdriId;
  idle: AnimationId;
  look: Record<AvatarLookBone, BoneLookAtSettings>;
  model: ModelId;
  restGaze: NormalizedPointer;
};

export const SCENES = {
  hero: {
    animations: [
      "arm-stretching",
      "waving",
      "head-hit-a",
      "head-hit-b",
      "neck-stretching",
      "spin-in-place",
      "torso-hit-a",
      "torso-hit-b",
    ],
    camera: { fov: 30, position: [0, 0.6, 1.4], target: [0, 0.6, 0] },
    hdri: "city",
    idle: "idle",
    look: {
      head: {
        dampSpeed: 4,
        pitchLimit: 0.45,
        targetDepth: 0.5,
        weight: 1,
        yawLimit: 0.6,
      },
      torso: {
        dampSpeed: 2,
        pitchLimit: 0.5,
        targetDepth: 0.5,
        weight: 0.35,
        yawLimit: 0.35,
      },
    },
    model: "avaturn",
    restGaze: { x: -10, y: 1 },
  },
} satisfies Record<string, Scene>;

export type SceneId = keyof typeof SCENES;

export function getSnapshotPath(sceneId: SceneId): string {
  return `/snapshots/${sceneId}.webp`;
}
