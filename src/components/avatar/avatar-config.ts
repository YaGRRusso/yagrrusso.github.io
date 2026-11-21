import type { Vector3Tuple } from "three";
import type { BoneLookAtSettings } from "@/hooks/three/use-bone-look-at";

export const AVATAR_CAMERA = {
  fov: 30,
  position: [0, 0.6, 1.6],
  target: [0, 0.6, 0],
} satisfies { fov: number; position: Vector3Tuple; target: Vector3Tuple };

export const AVATAR_MODEL = {
  boneNames: { head: "Head", torso: "Spine2" },
  idleClipName: "IdleV4.2(maya_head)",
  mixamoClipPaths: { wave: "/animations/wave.glb" },
  path: "/model.glb",
} as const;

export type AvatarClipName = keyof typeof AVATAR_MODEL.mixamoClipPaths;

export type AvatarLookBone = keyof typeof AVATAR_MODEL.boneNames;

export const DEFAULT_LOOK = {
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
