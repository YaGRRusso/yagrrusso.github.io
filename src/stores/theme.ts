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
      theme: "system",
      setTheme: (theme: ThemePreference) => set({ theme }),
    }),
    { name: "preference", storage: createJSONStorage(() => localStorage) }
  )
);
