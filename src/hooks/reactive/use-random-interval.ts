"use client";

import { random } from "lodash";
import { useEffect, useRef } from "react";

type RandomIntervalOptions = {
  isEnabled: boolean;
  maxMs: number;
  minMs: number;
};

export function useRandomInterval(
  callback: () => void,
  { isEnabled, maxMs, minMs }: RandomIntervalOptions
): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!isEnabled) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeoutId = setTimeout(
        () => {
          callbackRef.current();
          schedule();
        },
        random(minMs, maxMs)
      );
    };
    schedule();

    return () => clearTimeout(timeoutId);
  }, [isEnabled, maxMs, minMs]);
}
