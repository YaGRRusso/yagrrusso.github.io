import { useEffect, useLayoutEffect, useRef } from "react";
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
  const currentRef = useRef<AnimationAction | null>(null);

  useLayoutEffect(() => {
    const base = getAction(actions, baseClipName);
    base.reset().play();
    currentRef.current = base;

    const returnToBase = (event: { action: AnimationAction }) => {
      if (event.action !== currentRef.current) return;
      base.reset().play();
      event.action.crossFadeTo(base, CLIP_FADE_SECONDS, false);
      currentRef.current = base;
    };
    mixer.addEventListener("finished", returnToBase);

    return () => {
      mixer.removeEventListener("finished", returnToBase);
      base.stop();
    };
  }, [actions, baseClipName, mixer]);

  useEffect(() => {
    if (!request) return;

    const clip = getAction(actions, request.name);
    const { current } = currentRef;
    const {
      loop = LoopRepeat,
      repetitions = 1,
      timeScale = 1,
    } = request.options;

    clip.reset().setLoop(loop, repetitions);
    clip.clampWhenFinished = true;
    clip.timeScale = timeScale;
    clip.play();

    if (current === clip) {
      clip.setEffectiveWeight(1);
    } else {
      current?.crossFadeTo(clip, CLIP_FADE_SECONDS, false);
    }
    currentRef.current = clip;
  }, [actions, request]);
}
