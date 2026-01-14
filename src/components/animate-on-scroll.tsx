"use client";

import { motion, useAnimation } from "motion/react";
import type { ComponentProps } from "react";

type MotionDivProps = ComponentProps<typeof motion.div>;
type Axis = number | string;
type AnimationAxis = { x: Axis; y?: Axis } | { x?: Axis; y: Axis };

type AnimateOnScrollProps = MotionDivProps & AnimationAxis;

export function AnimateOnScroll({
  children,
  transition = { duration: 0.5 },
  viewport = { amount: 0.35 },
  x,
  y,
  ...props
}: AnimateOnScrollProps) {
  const controls = useAnimation();

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0, y, x }}
      onViewportEnter={() => controls.start({ opacity: 1, y: 0, x: 0 })}
      onViewportLeave={(entry) => {
        if (entry?.boundingClientRect.top && entry.boundingClientRect.top > 0)
          controls.start({ opacity: 0, y, x });
      }}
      transition={transition}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}
