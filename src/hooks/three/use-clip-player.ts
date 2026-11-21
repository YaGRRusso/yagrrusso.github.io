import { useEffect, useLayoutEffect } from "react";
import { type AnimationAction, type AnimationMixer, LoopRepeat } from "three";
import { getOrThrow } from "@/lib/get-or-throw";

const CLIP_FADE_SECONDS = 0.3;

export type ClipOptions = Partial<
  Pick<AnimationAction, "loop" | "repetitions" | "timeScale">
>;

export type ClipRequest = { id: number; name: string; options: ClipOptions };

type Actions = Record<string, AnimationAction | null>;

function getAction(actions: Actions, name: string): AnimationAction {
  return getOrThrow(actions[name], `animation clip "${name}"`);
}

type UseClipPlayerOptions = {
  actions: Actions;
  baseClipName: string;
  mixer: AnimationMixer;
  request: ClipRequest | null;
};

export function useClipPlayer({
  actions,
  baseClipName,
  mixer,
  request,
}: UseClipPlayerOptions): void {
  useLayoutEffect(() => {
    const base = getAction(actions, baseClipName);
    base.reset().play();

    return () => {
      base.stop();
    };
  }, [actions, baseClipName]);

  useEffect(() => {
    if (!request) return;

    const base = getAction(actions, baseClipName);
    const clip = getAction(actions, request.name);
    const {
      loop = LoopRepeat,
      repetitions = 1,
      timeScale = 1,
    } = request.options;

    clip.reset().setLoop(loop, repetitions);
    clip.clampWhenFinished = true;
    clip.timeScale = timeScale;
    clip.play();
    base.crossFadeTo(clip, CLIP_FADE_SECONDS, false);

    const returnToBase = (event: { action: AnimationAction }) => {
      if (event.action !== clip) return;
      base.reset().play();
      clip.crossFadeTo(base, CLIP_FADE_SECONDS, false);
    };
    mixer.addEventListener("finished", returnToBase);

    return () => {
      mixer.removeEventListener("finished", returnToBase);
    };
  }, [actions, baseClipName, mixer, request]);
}
