import { useFrame } from "@react-three/fiber";
import { type RefObject, useRef } from "react";
import {
  type Camera,
  MathUtils,
  Matrix4,
  type Object3D,
  Plane,
  Quaternion,
  Raycaster,
  SkinnedMesh,
  Vector2,
  Vector3,
} from "three";
import type { NormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";
import { getOrThrow } from "@/lib/get-or-throw";

const MAX_FRAME_DELTA = 0.05;
const GLTF_FORWARD = new Vector3(0, 0, 1);
const UP = new Vector3(0, 1, 0);

export type BoneLookAtSettings = {
  dampSpeed: number;
  pitchLimit: number;
  targetDepth: number;
  weight: number;
  yawLimit: number;
};

type BoneLookAtState = {
  animatedQuat: Quaternion;
  appliedQuat: Quaternion;
  boneForward: Vector3;
  pitch: number;
  yaw: number;
};

type Angles = { pitch: number; yaw: number };

const raycaster = new Raycaster();
const pointerNdc = new Vector2();
const gazePlane = new Plane();
const cameraForward = new Vector3();
const planePoint = new Vector3();
const boneWorld = new Vector3();
const gazeDirection = new Vector3();
const faceDirection = new Vector3();
const rootUp = new Vector3();
const pitchAxis = new Vector3();
const boneWorldQuat = new Quaternion();
const rootWorldQuat = new Quaternion();
const inverseRootQuat = new Quaternion();
const parentWorldQuat = new Quaternion();
const yawQuat = new Quaternion();
const pitchQuat = new Quaternion();
const bindMatrix = new Matrix4();
const targetCorrection: Angles = { pitch: 0, yaw: 0 };

function findBindForward(bone: Object3D): Vector3 {
  let top = bone;
  while (top.parent) top = top.parent;

  let skinnedMesh: SkinnedMesh | undefined;
  top.traverse((object) => {
    if (
      object instanceof SkinnedMesh &&
      object.skeleton.getBoneByName(bone.name) === bone
    ) {
      skinnedMesh ??= object;
    }
  });

  const { skeleton } = getOrThrow(
    skinnedMesh,
    `skinned mesh for "${bone.name}"`
  );
  const skeletonBone = getOrThrow(
    skeleton.getBoneByName(bone.name),
    `bone "${bone.name}" in its skeleton`
  );
  const boneInverse =
    skeleton.boneInverses[skeleton.bones.indexOf(skeletonBone)];
  const bindRotation = new Quaternion().setFromRotationMatrix(
    bindMatrix.copy(boneInverse).invert()
  );
  return GLTF_FORWARD.clone().applyQuaternion(bindRotation.invert());
}

function restoreAnimatedPose(bone: Object3D, look: BoneLookAtState): void {
  // the mixer skips writing unchanged values, so undo our last offset ourselves
  if (bone.quaternion.equals(look.appliedQuat)) {
    bone.quaternion.copy(look.animatedQuat);
  }
  look.animatedQuat.copy(bone.quaternion);
}

function projectPointerToGazePlane(
  camera: Camera,
  pointer: NormalizedPointer,
  bonePosition: Vector3,
  targetDepth: number,
  gazeTarget: Vector3
): void {
  camera.getWorldDirection(cameraForward);
  planePoint.copy(cameraForward).multiplyScalar(-targetDepth).add(bonePosition);
  gazePlane.setFromNormalAndCoplanarPoint(cameraForward, planePoint);

  raycaster.setFromCamera(pointerNdc.set(pointer.x, pointer.y), camera);
  raycaster.ray.intersectPlane(gazePlane, gazeTarget);
}

function toAngles(rootDirection: Vector3): Angles {
  return {
    pitch: Math.atan2(
      -rootDirection.y,
      Math.hypot(rootDirection.x, rootDirection.z)
    ),
    yaw: Math.atan2(rootDirection.x, rootDirection.z),
  };
}

function wrapAngle(angle: number): number {
  return MathUtils.euclideanModulo(angle + Math.PI, Math.PI * 2) - Math.PI;
}

function aimCorrection(
  boneForward: Vector3,
  gazeTarget: Vector3,
  settings: BoneLookAtSettings
): void {
  gazeDirection
    .subVectors(gazeTarget, boneWorld)
    .applyQuaternion(inverseRootQuat);
  const gaze = toAngles(gazeDirection);

  faceDirection
    .copy(boneForward)
    .applyQuaternion(boneWorldQuat)
    .applyQuaternion(inverseRootQuat);
  const face = toAngles(faceDirection);

  const yaw = MathUtils.clamp(gaze.yaw, -settings.yawLimit, settings.yawLimit);
  const pitch = MathUtils.clamp(
    gaze.pitch,
    -settings.pitchLimit,
    settings.pitchLimit
  );
  targetCorrection.yaw = wrapAngle(yaw - face.yaw) * settings.weight;
  targetCorrection.pitch = (pitch - face.pitch) * settings.weight;
}

function dampCorrection(
  look: BoneLookAtState,
  dampSpeed: number,
  delta: number
): void {
  look.yaw = MathUtils.damp(look.yaw, targetCorrection.yaw, dampSpeed, delta);
  look.pitch = MathUtils.damp(
    look.pitch,
    targetCorrection.pitch,
    dampSpeed,
    delta
  );
}

function applyCorrection(
  bone: Object3D,
  boneForward: Vector3,
  look: BoneLookAtState
): void {
  rootUp.copy(UP).applyQuaternion(rootWorldQuat);
  faceDirection.copy(boneForward).applyQuaternion(boneWorldQuat);
  pitchAxis.crossVectors(rootUp, faceDirection).normalize();

  yawQuat.setFromAxisAngle(rootUp, look.yaw);
  pitchQuat.setFromAxisAngle(pitchAxis, look.pitch);
  boneWorldQuat.premultiply(pitchQuat).premultiply(yawQuat);

  bone.parent?.getWorldQuaternion(parentWorldQuat);
  bone.quaternion.copy(parentWorldQuat.invert().multiply(boneWorldQuat));
  look.appliedQuat.copy(bone.quaternion);
}

function createBoneLookAtState(bone: Object3D): BoneLookAtState {
  return {
    animatedQuat: new Quaternion(),
    appliedQuat: new Quaternion(),
    boneForward: findBindForward(bone),
    pitch: 0,
    yaw: 0,
  };
}

type BoneFrame = {
  camera: Camera;
  delta: number;
  gazeTarget: Vector3;
  pointer: NormalizedPointer | null;
  root: Object3D;
};

function updateBoneLook(
  bone: Object3D,
  settings: BoneLookAtSettings,
  look: BoneLookAtState,
  frame: BoneFrame
): void {
  restoreAnimatedPose(bone, look);

  bone.updateWorldMatrix(true, false);
  bone.getWorldPosition(boneWorld);
  bone.getWorldQuaternion(boneWorldQuat);
  frame.root.getWorldQuaternion(rootWorldQuat);
  inverseRootQuat.copy(rootWorldQuat).invert();

  if (frame.pointer) {
    projectPointerToGazePlane(
      frame.camera,
      frame.pointer,
      boneWorld,
      settings.targetDepth,
      frame.gazeTarget
    );
    aimCorrection(look.boneForward, frame.gazeTarget, settings);
  } else {
    targetCorrection.yaw = 0;
    targetCorrection.pitch = 0;
  }

  dampCorrection(look, settings.dampSpeed, frame.delta);
  applyCorrection(bone, look.boneForward, look);
}

export type BoneLookAt = { bone: Object3D; settings: BoneLookAtSettings };

type UseBoneLookAtOptions = {
  bones: BoneLookAt[];
  gazeTarget: Vector3;
  pointerRef: RefObject<NormalizedPointer | null>;
  rootRef: RefObject<Object3D | null>;
};

export function useBoneLookAt({
  bones,
  gazeTarget,
  pointerRef,
  rootRef,
}: UseBoneLookAtOptions): void {
  const statesRef = useRef(new Map<Object3D, BoneLookAtState>());

  useFrame(({ camera }, delta) => {
    const root = rootRef.current;
    if (!root) return;

    const frame: BoneFrame = {
      camera,
      delta: Math.min(delta, MAX_FRAME_DELTA),
      gazeTarget,
      pointer: pointerRef.current,
      root,
    };

    for (const { bone, settings } of bones) {
      let look = statesRef.current.get(bone);
      if (!look) {
        look = createBoneLookAtState(bone);
        statesRef.current.set(bone, look);
      }
      updateBoneLook(bone, settings, look, frame);
    }
  });
}
