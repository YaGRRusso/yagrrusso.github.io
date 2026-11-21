import { create } from "zustand";
import type { AvatarClipName } from "@/components/avatar/avatar-config";
import type { ClipOptions, ClipRequest } from "@/hooks/three/use-clip-player";

type AvatarStore = {
  clipRequest: ClipRequest | null;
  playClip: (name: AvatarClipName, options?: ClipOptions) => void;
};

export const useAvatarStore = create<AvatarStore>()((set) => ({
  clipRequest: null,
  playClip: (name, options = {}) =>
    set((store) => ({
      clipRequest: { id: (store.clipRequest?.id ?? 0) + 1, name, options },
    })),
}));
