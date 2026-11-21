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
import type { NormalizedPointer } from "@/hooks/reactive/use-normalized-pointer";

const MAX_FRAME_DELTA = 0.05;

export type HeadLookSettings = {
  dampSpeed: number;
  pitchLimit: number;
  pitchOffset: number;
  targetDepth: number;
  yawLimit: number;
  yawOffset: number;
};

type HeadLookState = {
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
const headWorld = new Vector3();
const headLocal = new Vector3();
const gazeLocal = new Vector3();
const lookEuler = new Euler(0, 0, 0, "YXZ");
const lookQuat = new Quaternion();

function restoreAnimatedPose(headBone: Object3D, look: HeadLookState): void {
  // the mixer skips writing unchanged values, so undo our last offset ourselves
  if (headBone.quaternion.equals(look.appliedQuat)) {
    headBone.quaternion.copy(look.animatedQuat);
  }
  look.animatedQuat.copy(headBone.quaternion);
}

function projectPointerToGazePlane(
  camera: Camera,
  pointer: NormalizedPointer,
  headPosition: Vector3,
  targetDepth: number,
  gazeTarget: Vector3
): void {
  camera.getWorldDirection(cameraForward);
  planePoint.copy(cameraForward).multiplyScalar(-targetDepth).add(headPosition);
  gazePlane.setFromNormalAndCoplanarPoint(cameraForward, planePoint);

  raycaster.setFromCamera(pointerNdc.set(pointer.x, pointer.y), camera);
  raycaster.ray.intersectPlane(gazePlane, gazeTarget);
}

function dampLookAngles(
  look: HeadLookState,
  rig: Object3D,
  headPosition: Vector3,
  gazeTarget: Vector3,
  settings: HeadLookSettings,
  delta: number
): void {
  rig.worldToLocal(headLocal.copy(headPosition));
  rig.worldToLocal(gazeLocal.copy(gazeTarget)).sub(headLocal);

  const targetYaw = MathUtils.clamp(
    Math.atan2(gazeLocal.x, gazeLocal.z) + settings.yawOffset,
    -settings.yawLimit,
    settings.yawLimit
  );
  const targetPitch = MathUtils.clamp(
    Math.atan2(-gazeLocal.y, Math.hypot(gazeLocal.x, gazeLocal.z)) +
      settings.pitchOffset,
    -settings.pitchLimit,
    settings.pitchLimit
  );

  look.yaw = MathUtils.damp(look.yaw, targetYaw, settings.dampSpeed, delta);
  look.pitch = MathUtils.damp(
    look.pitch,
    targetPitch,
    settings.dampSpeed,
    delta
  );
}

function applyLookOffset(headBone: Object3D, look: HeadLookState): void {
  lookEuler.set(look.pitch, look.yaw, 0, "YXZ");
  lookQuat.setFromEuler(lookEuler);
  headBone.quaternion.multiply(lookQuat);
  look.appliedQuat.copy(headBone.quaternion);
}

type UseHeadLookOptions = {
  gazeTarget: Vector3;
  headBone: Object3D;
  pointerRef: RefObject<NormalizedPointer>;
  rigRef: RefObject<Object3D | null>;
  settings: HeadLookSettings;
};

export function useHeadLook({
  gazeTarget,
  headBone,
  pointerRef,
  rigRef,
  settings,
}: UseHeadLookOptions): void {
  const lookRef = useRef<HeadLookState>({
    animatedQuat: new Quaternion(),
    appliedQuat: new Quaternion(),
    pitch: 0,
    yaw: 0,
  });

  useFrame(({ camera }, delta) => {
    const rig = rigRef.current;
    if (!rig) return;

    const look = lookRef.current;
    restoreAnimatedPose(headBone, look);

    headBone.getWorldPosition(headWorld);
    projectPointerToGazePlane(
      camera,
      pointerRef.current,
      headWorld,
      settings.targetDepth,
      gazeTarget
    );
    dampLookAngles(
      look,
      rig,
      headWorld,
      gazeTarget,
      settings,
      Math.min(delta, MAX_FRAME_DELTA)
    );
    applyLookOffset(headBone, look);
  });
}
