import { button, useControls } from "leva";
import { mapValues } from "lodash";
import type { HeadLookSettings } from "./use-head-look";

const LOOK_FOLDER = "look";

const DEFAULT_HEAD_LOOK: HeadLookSettings = {
  dampSpeed: 2,
  pitchLimit: 0.7,
  pitchOffset: 0,
  targetDepth: 0.05,
  yawLimit: 1.2,
  yawOffset: 0.8,
};

function logHeadLook(get: (path: string) => number): void {
  console.log(
    mapValues(DEFAULT_HEAD_LOOK, (_, key) => get(`${LOOK_FOLDER}.${key}`))
  );
}

function slider(value: number, min: number, max: number, step = 0.01) {
  return { max, min, step, value };
}

export function useHeadLookTuning(): HeadLookSettings {
  const headLook = useControls(LOOK_FOLDER, {
    dampSpeed: slider(DEFAULT_HEAD_LOOK.dampSpeed, 1, 30, 0.5),
    pitchLimit: slider(DEFAULT_HEAD_LOOK.pitchLimit, 0, Math.PI / 2),
    pitchOffset: slider(DEFAULT_HEAD_LOOK.pitchOffset, -1, 1),
    targetDepth: slider(DEFAULT_HEAD_LOOK.targetDepth, 0.05, 3),
    yawLimit: slider(DEFAULT_HEAD_LOOK.yawLimit, 0, Math.PI / 2),
    yawOffset: slider(DEFAULT_HEAD_LOOK.yawOffset, -1, 1),
  });
  useControls({ "log look": button(logHeadLook) });

  return headLook;
}
