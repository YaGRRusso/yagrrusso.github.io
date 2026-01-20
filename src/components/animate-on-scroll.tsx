"use client";

import { motion, useAnimation } from "motion/react";
import type { ComponentProps } from "react";

type MotionDivProps = ComponentProps<typeof motion.div>;
type AnimationProps = { opacity?: number } & (
  | { x: number; y?: number }
  | { x?: number; y: number }
);

type AnimateOnScrollProps = MotionDivProps & AnimationProps;

export function AnimateOnScroll({
  children,
  transition = { duration: 0.5 },
  viewport = { amount: 0.5 },
  opacity = 0,
  x,
  y,
  ...props
}: AnimateOnScrollProps) {
  const controls = useAnimation();

  return (
    <motion.div
      animate={controls}
      initial={{ opacity, y, x }}
      onViewportEnter={() => controls.start({ opacity: 1, y: 0, x: 0 })}
      onViewportLeave={(entry) => {
        if (entry?.boundingClientRect.top && entry.boundingClientRect.top > 0)
          controls.start({ opacity, y, x });
      }}
      transition={transition}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}
