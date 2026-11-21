import type { AnimationClip } from "three";

export function assertSingleClip(
  clips: AnimationClip[],
  source: string
): AnimationClip {
  const [clip, ...extraClips] = clips;
  if (!clip || extraClips.length > 0) {
    throw new Error(
      `Expected exactly one animation clip in ${source}, found ${clips.length}`
    );
  }
  return clip;
}
