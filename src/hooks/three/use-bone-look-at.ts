import { useFrame } from "@react-three/fiber";
import { type RefObject, useRef } from "react";
import {
  type Camera,
  Euler,
  MathUtils,
  type Object3D,
  Plane,
  Quaternion,
  Raycaster,
  Vector2,
  Vector3,
} from "three";
import type { NormalizedPointer } from "@/hooks/reactive/use-normalized-mouse";

const MAX_FRAME_DELTA = 0.05;

export type BoneLookAtSettings = {
  dampSpeed: number;
  pitchLimit: number;
  pitchOffset: number;
  targetDepth: number;
  yawLimit: number;
  yawOffset: number;
};

type BoneLookAtState = {
  animatedQuat: Quaternion;
  appliedQuat: Quaternion;
  pitch: number;
  yaw: number;
};

const raycaster = new Raycaster();
const pointerNdc = new Vector2();
const gazePlane = new Plane();
const cameraForward = new Vector3();
const planePoint = new Vector3();
const boneWorld = new Vector3();
const boneLocal = new Vector3();
const gazeLocal = new Vector3();
const lookEuler = new Euler(0, 0, 0, "YXZ");
const lookQuat = new Quaternion();
const targetAngles = { pitch: 0, yaw: 0 };

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

function aimAtGazeTarget(
  root: Object3D,
  bonePosition: Vector3,
  gazeTarget: Vector3,
  settings: BoneLookAtSettings
): void {
  root.worldToLocal(boneLocal.copy(bonePosition));
  root.worldToLocal(gazeLocal.copy(gazeTarget)).sub(boneLocal);

  targetAngles.yaw = MathUtils.clamp(
    Math.atan2(gazeLocal.x, gazeLocal.z) + settings.yawOffset,
    -settings.yawLimit,
    settings.yawLimit
  );
  targetAngles.pitch = MathUtils.clamp(
    Math.atan2(-gazeLocal.y, Math.hypot(gazeLocal.x, gazeLocal.z)) +
      settings.pitchOffset,
    -settings.pitchLimit,
    settings.pitchLimit
  );
}

function dampTowardTargetAngles(
  look: BoneLookAtState,
  dampSpeed: number,
  delta: number
): void {
  look.yaw = MathUtils.damp(look.yaw, targetAngles.yaw, dampSpeed, delta);
  look.pitch = MathUtils.damp(look.pitch, targetAngles.pitch, dampSpeed, delta);
}

function applyLookOffset(bone: Object3D, look: BoneLookAtState): void {
  lookEuler.set(look.pitch, look.yaw, 0, "YXZ");
  lookQuat.setFromEuler(lookEuler);
  bone.quaternion.multiply(lookQuat);
  look.appliedQuat.copy(bone.quaternion);
}

type UseBoneLookAtOptions = {
  bone: Object3D;
  gazeTarget: Vector3;
  pointerRef: RefObject<NormalizedPointer | null>;
  rootRef: RefObject<Object3D | null>;
  settings: BoneLookAtSettings;
};

export function useBoneLookAt({
  bone,
  gazeTarget,
  pointerRef,
  rootRef,
  settings,
}: UseBoneLookAtOptions): void {
  const lookRef = useRef<BoneLookAtState>({
    animatedQuat: new Quaternion(),
    appliedQuat: new Quaternion(),
    pitch: 0,
    yaw: 0,
  });

  useFrame(({ camera }, delta) => {
    const root = rootRef.current;
    if (!root) return;

    const look = lookRef.current;
    restoreAnimatedPose(bone, look);

    const pointer = pointerRef.current;
    if (pointer) {
      bone.getWorldPosition(boneWorld);
      projectPointerToGazePlane(
        camera,
        pointer,
        boneWorld,
        settings.targetDepth,
        gazeTarget
      );
      aimAtGazeTarget(root, boneWorld, gazeTarget, settings);
    } else {
      targetAngles.yaw = 0;
      targetAngles.pitch = 0;
    }

    dampTowardTargetAngles(
      look,
      settings.dampSpeed,
      Math.min(delta, MAX_FRAME_DELTA)
    );
    applyLookOffset(bone, look);
  });
}
