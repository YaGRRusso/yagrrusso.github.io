"use client";

import { type RefObject, useEffect, useState } from "react";

const VISIBILITY_THRESHOLD = 0.05;

export function useInViewport(ref: RefObject<HTMLElement | null>): boolean {
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: VISIBILITY_THRESHOLD }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return isInViewport;
}
