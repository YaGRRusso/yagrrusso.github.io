"use client";

import { type RefObject, useEffect, useRef } from "react";

export type NormalizedPointer = { x: number; y: number };

export function useNormalizedPointer(
  elementRef: RefObject<HTMLElement | null>,
  isEnabled: boolean
): RefObject<NormalizedPointer | null> {
  const pointerRef = useRef<NormalizedPointer | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const trackPointer = (event: PointerEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: 1 - ((event.clientY - rect.top) / rect.height) * 2,
      };
    };

    const releaseTouch = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      pointerRef.current = null;
    };

    const options = { passive: true };
    window.addEventListener("pointerdown", trackPointer, options);
    window.addEventListener("pointermove", trackPointer, options);
    window.addEventListener("pointerup", releaseTouch, options);
    window.addEventListener("pointercancel", releaseTouch, options);

    return () => {
      pointerRef.current = null;
      window.removeEventListener("pointerdown", trackPointer);
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("pointerup", releaseTouch);
      window.removeEventListener("pointercancel", releaseTouch);
    };
  }, [elementRef, isEnabled]);

  return pointerRef;
}
