import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemePreference = "light" | "dark" | "system";

type PreferencesStore = {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
};

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      setTheme: (theme: ThemePreference) => set({ theme }),
      theme: "system",
    }),
    { name: "preference", storage: createJSONStorage(() => localStorage) }
  )
);
