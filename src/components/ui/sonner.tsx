"use client";

import {
  CircleNotchIcon,
  SealCheckIcon,
  SealQuestionIcon,
  SealWarningIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      icons={{
        error: <SealWarningIcon className="size-4" />,
        info: <SealWarningIcon className="size-4" />,
        loading: <CircleNotchIcon className="size-4 animate-spin" />,
        success: <SealCheckIcon className="size-4" />,
        warning: <SealQuestionIcon className="size-4" />,
      }}
      style={
        {
          "--border-radius": "var(--radius)",
          "--normal-bg": "var(--popover)",
          "--normal-border": "var(--border)",
          "--normal-text": "var(--popover-foreground)",
        } as CSSProperties
      }
      theme={theme as ToasterProps["theme"]}
      {...props}
    />
  );
};

export { Toaster };
