import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { env } from "@/lib/env";

type DebugStore = {
  isAnimationPaused: boolean;
  setIsAnimationPaused: (isAnimationPaused: boolean) => void;
};

export const useDebugStore = create<DebugStore>()(
  persist(
    (set) => ({
      isAnimationPaused: env.NEXT_PUBLIC_DEBUG,
      setIsAnimationPaused: (isAnimationPaused: boolean) =>
        set({ isAnimationPaused }),
    }),
    { name: "debug", storage: createJSONStorage(() => localStorage) }
  )
);
