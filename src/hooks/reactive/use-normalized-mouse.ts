"use client";

import { type RefObject, useEffect, useRef } from "react";

export type NormalizedPointer = { x: number; y: number };

export function useNormalizedMouse(
  elementRef: RefObject<HTMLElement | null>,
  isEnabled: boolean
): RefObject<NormalizedPointer | null> {
  const mouseRef = useRef<NormalizedPointer | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      mouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: 1 - ((event.clientY - rect.top) / rect.height) * 2,
      };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [elementRef, isEnabled]);

  return mouseRef;
}
