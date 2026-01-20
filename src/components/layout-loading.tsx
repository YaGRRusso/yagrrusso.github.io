"use client";

import { BracketsCurlyIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { type ComponentProps, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {}

export function LayoutLoading({ className, ...props }: Props) {
  const t = useTranslations("layout");

  const [isShowing, setIsShowing] = useState(true);
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsShowing(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isRendering) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background text-3xl text-foreground transition-transform duration-700",
        !isShowing && "-translate-y-full",
        className
      )}
      onTransitionEnd={() => setIsRendering(false)}
      {...props}
    >
      <span>{t("welcome")}</span>
      <BracketsCurlyIcon className="animate-pulse text-primary" weight="bold" />
    </div>
  );
}
