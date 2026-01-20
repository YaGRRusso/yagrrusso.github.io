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
      initial={{ opacity, filter: `blur(${blur}px)`, y, x }}
      onViewportEnter={() =>
        controls.start({ opacity: 1, filter: "blur(0px)", y: 0, x: 0 })
      }
      onViewportLeave={(entry) => {
        if (entry?.boundingClientRect.top && entry.boundingClientRect.top > 0)
          controls.start({ opacity, filter: `blur(${blur}px)`, y, x });
      }}
      transition={transition}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}
