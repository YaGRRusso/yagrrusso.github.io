"use client";

import { type MotionProps, motion, useScroll } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>;
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={cn(
        "absolute inset-x-0 bottom-0 z-50 h-px origin-left bg-linear-to-r from-primary/40 to-primary",
        className
      )}
      ref={ref}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
}
