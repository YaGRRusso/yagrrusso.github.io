"use client";

import { type RefObject, useEffect, useRef } from "react";

export type NormalizedPointer = { x: number; y: number };

export function useNormalizedPointer(
  elementRef: RefObject<HTMLElement | null>,
  isEnabled: boolean
): RefObject<NormalizedPointer> {
  const pointerRef = useRef<NormalizedPointer>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isEnabled) return;

    const onMouseMove = (event: MouseEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = 1 - ((event.clientY - rect.top) / rect.height) * 2;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [elementRef, isEnabled]);

  return pointerRef;
}
