import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IS_DEBUG } from "@/lib/debug";

type DebugStore = {
  isAnimationPaused: boolean;
  setIsAnimationPaused: (isAnimationPaused: boolean) => void;
};

export const useDebugStore = create<DebugStore>()(
  persist(
    (set) => ({
      isAnimationPaused: IS_DEBUG,
      setIsAnimationPaused: (isAnimationPaused: boolean) =>
        set({ isAnimationPaused }),
    }),
    { name: "debug", storage: createJSONStorage(() => localStorage) }
  )
);
