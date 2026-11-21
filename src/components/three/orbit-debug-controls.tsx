"use client";

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import {
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { type Camera, Vector3, type Vector3Tuple } from "three";
import { DebugMarker } from "@/components/three/debug-marker";

type OrbitControlsInstance = ComponentRef<typeof OrbitControls>;

const LOG_PRECISION = 3;

function roundVector(vector: Vector3): Vector3Tuple {
  const [x, y, z] = vector.toArray();
  return [
    Number(x.toFixed(LOG_PRECISION)),
    Number(y.toFixed(LOG_PRECISION)),
    Number(z.toFixed(LOG_PRECISION)),
  ];
}

function logCamera(
  camera: Camera,
  controls: OrbitControlsInstance | null
): void {
  console.log({
    position: roundVector(camera.position),
    target: controls ? roundVector(controls.target) : null,
  });
}

function resetCamera(
  camera: Camera,
  controls: OrbitControlsInstance | null,
  cameraPosition: Vector3Tuple,
  target: Vector3Tuple
): void {
  camera.position.set(...cameraPosition);
  controls?.target.set(...target);
  controls?.update();
}

interface OrbitDebugControlsProps
  extends Omit<
    ComponentProps<typeof OrbitControls>,
    "onChange" | "ref" | "target"
  > {
  cameraPosition: Vector3Tuple;
  target: Vector3Tuple;
}

export function OrbitDebugControls({
  cameraPosition,
  target,
  ...props
}: OrbitDebugControlsProps): ReactNode {
  const controlsRef = useRef<OrbitControlsInstance>(null);
  const [pivot] = useState(() => new Vector3(...target));
  const getThree = useThree((state) => state.get);

  useControls({
    "log camera": button(() =>
      logCamera(getThree().camera, controlsRef.current)
    ),
    "reset camera": button(() =>
      resetCamera(
        getThree().camera,
        controlsRef.current,
        cameraPosition,
        target
      )
    ),
  });

  return (
    <>
      <OrbitControls
        onChange={() => {
          if (controlsRef.current) pivot.copy(controlsRef.current.target);
        }}
        ref={controlsRef}
        target={target}
        {...props}
      />
      <DebugMarker color="dodgerblue" target={pivot} />
    </>
  );
}
