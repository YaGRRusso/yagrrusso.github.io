import { create } from "zustand";
import {
  ANIMATION_ASSETS,
  type AnimationAsset,
  type AnimationId,
} from "@/components/avatar/avatar-config";
import type { ClipOptions, ClipRequest } from "@/hooks/three/use-clip-player";

function getAssetOptions(name: AnimationId): ClipOptions {
  const { path, ...options }: AnimationAsset = ANIMATION_ASSETS[name];
  return options;
}

type AvatarStore = {
  clipRequest: ClipRequest | null;
  playClip: (name: AnimationId, options?: ClipOptions) => void;
  playClipWhenIdle: (name: AnimationId, options?: ClipOptions) => void;
};

export const useAvatarStore = create<AvatarStore>()((set) => ({
  clipRequest: null,
  playClip: (name, options = {}) =>
    set((store) => ({
      clipRequest: {
        id: (store.clipRequest?.id ?? 0) + 1,
        mode: "interrupt",
        name,
        options: { ...getAssetOptions(name), ...options },
      },
    })),
  playClipWhenIdle: (name, options = {}) =>
    set((store) => ({
      clipRequest: {
        id: (store.clipRequest?.id ?? 0) + 1,
        mode: "whenIdle",
        name,
        options: { ...getAssetOptions(name), ...options },
      },
    })),
}));
