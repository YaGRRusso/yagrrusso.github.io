"use client";

import { useEffect, useState } from "react";

export function useDebounce(callback: any, dependencies: any[], delay = 1000, skipMount = true) {
  const [isFirstRender, setIsFirstRender] = useState(skipMount);

  return useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      const timer = setTimeout(() => {
        callback();
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isFirstRender, callback, delay, ...dependencies]);
}
