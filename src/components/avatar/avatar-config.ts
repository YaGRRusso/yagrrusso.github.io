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
  "head-hit": { path: "/animations/head-hit.glb", timeScale: 1.5 },
  idle: { path: "/animations/idle.glb", timeScale: 0.5 },
  "neck-stretching": { path: "/animations/neck-stretching.glb" },
  "spin-in-place": { path: "/animations/spin-in-place.glb" },
  "torso-hit": { path: "/animations/torso-hit.glb", timeScale: 1.5 },
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
      "head-hit",
      "neck-stretching",
      "spin-in-place",
      "torso-hit",
    ],
    camera: { fov: 30, position: [0.6, 0.6, 1.4], target: [0.03, 0.6, 0] },
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
        pitchLimit: 0,
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
