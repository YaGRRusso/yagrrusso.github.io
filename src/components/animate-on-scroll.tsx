"use client";

import { motion, useAnimation } from "motion/react";
import type { ComponentProps } from "react";

type MotionDivProps = ComponentProps<typeof motion.div>;
type AnimationProps = { opacity?: number; blur?: number } & (
  | { x: number; y?: number }
  | { x?: number; y: number }
);

type AnimateOnScrollProps = MotionDivProps & AnimationProps;

export function AnimateOnScroll({
  children,
  transition = { delay: 0.1, duration: 0.4, ease: "easeOut" },
  viewport = { margin: "-96px" },
  opacity = 0,
  blur = 5,
  x,
  y,
  ...props
}: AnimateOnScrollProps) {
  const controls = useAnimation();

  return (
    <motion.div
      animate={controls}
      initial={{ filter: `blur(${blur}px)`, opacity, x, y }}
      onViewportEnter={() =>
        controls.start({ filter: "blur(0px)", opacity: 1, x: 0, y: 0 })
      }
      onViewportLeave={(entry) => {
        if (entry?.boundingClientRect.top && entry.boundingClientRect.top > 0)
          controls.start({ filter: `blur(${blur}px)`, opacity, x, y });
      }}
      transition={transition}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}
