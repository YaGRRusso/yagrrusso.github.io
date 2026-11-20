/** biome-ignore-all lint/suspicious/noUnknownAttribute: don't fuck */
"use client";

import { Center, Environment, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, type RootState, useFrame } from "@react-three/fiber";
import {
  type ComponentProps,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Euler,
  type Group,
  LoopRepeat,
  MathUtils,
  type Object3D,
  Quaternion,
} from "three";

const HEAD_BONE_CANDIDATES = ["Head", "mixamorigHead", "Neck"] as const;
const LOOK_CLAMP = { pitch: 0.45, yaw: 0.7 } as const;
const DAMP_SPEED = 8;
const MAX_DELTA = 0.05;
const SCALE_EPSILON = 0.0005;

export interface AvatarDebugParams {
  camY: number;
  camZ: number;
  fov: number;
  modelY: number;
  pitchMult: number;
  scale: number;
  yawMult: number;
}

const DEFAULT_DEBUG_PARAMS: AvatarDebugParams = {
  camY: 0.5,
  camZ: 1.0,
  fov: 30,
  modelY: 0,
  pitchMult: 0.5,
  scale: 1,
  yawMult: 0.5,
};

type PointerCoords = { x: number; y: number };

type HeadLookState = {
  animatedQuat: Quaternion;
  appliedQuat: Quaternion;
  pitch: number;
  yaw: number;
};

declare global {
  interface Window {
    __avatarDebug?: AvatarDebugParams;
  }
}

function findHeadBone(scene: Object3D): Object3D | null {
  for (const name of HEAD_BONE_CANDIDATES) {
    const bone = scene.getObjectByName(name);
    if (bone) return bone;
  }
  return null;
}

function resolveIdleAnimationName(names: string[]): string | undefined {
  return names.find((name) => name.toLowerCase().includes("idle")) ?? names[0];
}

function disableFrustumCulling(root: Object3D): void {
  root.traverse((obj) => {
    if ("frustumCulled" in obj) {
      obj.frustumCulled = false;
    }
  });
}

function applyRestArmsPose(root: Object3D): void {
  const leftArm = root.getObjectByName("LeftArm");
  const rightArm = root.getObjectByName("RightArm");
  if (leftArm) leftArm.rotation.z = 1.2;
  if (rightArm) rightArm.rotation.z = -1.2;
}

function useViewportVisibility(ref: RefObject<HTMLElement | null>): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

function useWindowActive(): boolean {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const syncState = () => {
      setIsActive(!document.hidden && document.hasFocus());
    };

    syncState();
    window.addEventListener("focus", syncState);
    window.addEventListener("blur", syncState);
    document.addEventListener("visibilitychange", syncState);

    return () => {
      window.removeEventListener("focus", syncState);
      window.removeEventListener("blur", syncState);
      document.removeEventListener("visibilitychange", syncState);
    };
  }, []);

  return isActive;
}

function useNormalizedPointer(active: boolean): RefObject<PointerCoords> {
  const pointerRef = useRef<PointerCoords>({ x: 0, y: 0 });

  useEffect(() => {
    if (!active) return;

    const onMouseMove = (event: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      if (w === 0 || h === 0) return;

      pointerRef.current.x = (event.clientX / w) * 2 - 1;
      pointerRef.current.y = (event.clientY / h) * 2 - 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [active]);

  return pointerRef;
}

function useAvatarDebug(
  params: AvatarDebugParams
): RefObject<AvatarDebugParams> {
  const debugRef = useRef<AvatarDebugParams>({ ...params });

  useEffect(() => {
    window.__avatarDebug = debugRef.current;
    return () => {
      window.__avatarDebug = undefined;
    };
  }, []);

  return debugRef;
}

function syncCameraAndRig(
  state: RootState,
  rig: Group | null,
  params: AvatarDebugParams,
  lastCam: { camY: number; camZ: number; fov: number }
): void {
  if (lastCam.camY !== params.camY || lastCam.camZ !== params.camZ) {
    state.camera.position.y = params.camY;
    state.camera.position.z = params.camZ;
    lastCam.camY = params.camY;
    lastCam.camZ = params.camZ;
  }

  if (
    lastCam.fov !== params.fov &&
    "fov" in state.camera &&
    state.camera.fov !== params.fov
  ) {
    state.camera.fov = params.fov;
    state.camera.updateProjectionMatrix();
    lastCam.fov = params.fov;
  }

  if (rig && rig.position.y !== params.modelY) {
    rig.position.y = params.modelY;
  }
}

const lookEuler = new Euler(0, 0, 0, "YXZ");
const lookQuat = new Quaternion();

function updateHeadLook(
  headBone: Object3D,
  pointer: PointerCoords,
  params: AvatarDebugParams,
  look: HeadLookState,
  delta: number
): void {
  // the mixer skips writing unchanged values, so undo our last offset ourselves
  if (headBone.quaternion.equals(look.appliedQuat)) {
    headBone.quaternion.copy(look.animatedQuat);
  }
  look.animatedQuat.copy(headBone.quaternion);

  const targetYaw = MathUtils.clamp(
    pointer.x * params.yawMult,
    -LOOK_CLAMP.yaw,
    LOOK_CLAMP.yaw
  );
  const targetPitch = MathUtils.clamp(
    pointer.y * params.pitchMult,
    -LOOK_CLAMP.pitch,
    LOOK_CLAMP.pitch
  );

  look.yaw = MathUtils.damp(look.yaw, targetYaw, DAMP_SPEED, delta);
  look.pitch = MathUtils.damp(look.pitch, targetPitch, DAMP_SPEED, delta);

  lookEuler.set(look.pitch, look.yaw, 0, "YXZ");
  lookQuat.setFromEuler(lookEuler);
  headBone.quaternion.multiply(lookQuat);
  look.appliedQuat.copy(headBone.quaternion);
}

function updateRigScale(rig: Group, targetScale: number, delta: number): void {
  const current = rig.scale.x;
  if (Math.abs(current - targetScale) <= SCALE_EPSILON) return;

  const factor = 1 - Math.exp(-12 * delta);
  rig.scale.setScalar(MathUtils.lerp(current, targetScale, factor));
}

interface AvatarSceneProps extends ComponentProps<"group"> {
  debugRef: RefObject<AvatarDebugParams>;
  modelPath: string;
  pointerRef: RefObject<PointerCoords>;
}

function AvatarScene({
  modelPath,
  pointerRef,
  debugRef,
  ...props
}: AvatarSceneProps) {
  const { scene, animations } = useGLTF(modelPath);
  const rigRef = useRef<Group>(null);
  const { actions, names } = useAnimations(animations, rigRef);
  const headLookRef = useRef<HeadLookState>({
    animatedQuat: new Quaternion(),
    appliedQuat: new Quaternion(),
    pitch: 0,
    yaw: 0,
  });
  const lastCamRef = useRef({
    camY: DEFAULT_DEBUG_PARAMS.camY,
    camZ: DEFAULT_DEBUG_PARAMS.camZ,
    fov: DEFAULT_DEBUG_PARAMS.fov,
  });

  const headBone = useMemo(() => findHeadBone(scene), [scene]);

  useEffect(() => {
    disableFrustumCulling(scene);
    if (names.length === 0) {
      applyRestArmsPose(scene);
    }
  }, [scene, names.length]);

  useEffect(() => {
    const idleName = resolveIdleAnimationName(names);
    if (!idleName) return;

    const action = actions[idleName];
    if (!action || action.isRunning()) return;

    action
      .setLoop(LoopRepeat, Number.POSITIVE_INFINITY)
      .reset()
      .fadeIn(0.25)
      .play();
    return () => {
      action.fadeOut(0.2);
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    const params = debugRef.current;
    const rig = rigRef.current;
    if (!params) return;

    const dt = Math.min(delta, MAX_DELTA);
    syncCameraAndRig(state, rig, params, lastCamRef.current);

    if (headBone) {
      updateHeadLook(
        headBone,
        pointerRef.current,
        params,
        headLookRef.current,
        dt
      );
    }

    if (rig) {
      updateRigScale(rig, params.scale, dt);
    }
  });

  return (
    <group ref={rigRef} {...props}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

interface PortfolioAvatarProps extends Partial<ComponentProps<typeof Canvas>> {
  modelPath?: string;
}

export function PortfolioAvatar({
  modelPath = "/model.glb",
  ...props
}: PortfolioAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useViewportVisibility(containerRef);
  const isWindowActive = useWindowActive();
  const shouldAnimate = isVisible && isWindowActive;

  const pointerRef = useNormalizedPointer(shouldAnimate);
  const debugRef = useAvatarDebug(DEFAULT_DEBUG_PARAMS);

  return (
    <div className="h-full w-full" ref={containerRef}>
      <Canvas
        camera={{
          fov: DEFAULT_DEBUG_PARAMS.fov,
          position: [0, DEFAULT_DEBUG_PARAMS.camY, DEFAULT_DEBUG_PARAMS.camZ],
        }}
        dpr={[1, 1.5]}
        frameloop={shouldAnimate ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => e.preventDefault(),
            false
          );
        }}
        {...props}
      >
        <ambientLight intensity={0.85} />
        <directionalLight intensity={1.3} position={[2, 3, 2]} />
        <Environment frames={1} preset="city" />
        <AvatarScene
          debugRef={debugRef}
          modelPath={modelPath}
          pointerRef={pointerRef}
        />
      </Canvas>
    </div>
  );
}
