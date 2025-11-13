"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { type ThemePreference, usePreferencesStore } from "@/stores/theme";

type Theme = Exclude<ThemePreference, "system">;

type ThemeContextType = {
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme: preferredTheme } = usePreferencesStore();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    switch (preferredTheme) {
      case "dark":
        document.documentElement.classList.add("dark");
        setTheme("dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        setTheme("light");
        break;
      default:
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark");
          setTheme("dark");
        } else {
          document.documentElement.classList.remove("dark");
          setTheme("light");
        }
        break;
    }
  }, [preferredTheme]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
