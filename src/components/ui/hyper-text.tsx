"use client";

import { AnimatePresence, type MotionProps, motion } from "motion/react";
import { type ElementType, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type CharacterSet = string[] | readonly string[];

interface HyperTextProps extends MotionProps {
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Component to render as - defaults to div */
  as?: ElementType;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
  /** Optional className for styling */
  className?: string;
  /** The text content to be animated */
  content: string;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export function HyperText({
  content,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayText, setDisplayText] = useState<string[]>(() =>
    content.split("")
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement>(null);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const maxIterations = content.length;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      iterationCount.current = progress * maxIterations;

      setDisplayText((currentText) =>
        currentText.map((letter, index) =>
          letter === " "
            ? letter
            : // biome-ignore lint/style/noNestedTernary: shadcn generated
              index <= iterationCount.current
              ? content[index]
              : characterSet[getRandomInt(characterSet.length)]
        )
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [content, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      className={cn("overflow-hidden py-2 font-bold text-4xl", className)}
      onMouseEnter={handleAnimationTrigger}
      ref={elementRef}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            className={cn("font-mono", letter === " " ? "w-3" : "")}
            key={index}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
