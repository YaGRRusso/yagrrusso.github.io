"use client";

import { useEffect, useState } from "react";

function isWindowActive(): boolean {
  return !document.hidden && document.hasFocus();
}

export function useWindowActive(): boolean {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const syncIsActive = () => setIsActive(isWindowActive());

    syncIsActive();
    window.addEventListener("focus", syncIsActive);
    window.addEventListener("blur", syncIsActive);
    document.addEventListener("visibilitychange", syncIsActive);

    return () => {
      window.removeEventListener("focus", syncIsActive);
      window.removeEventListener("blur", syncIsActive);
      document.removeEventListener("visibilitychange", syncIsActive);
    };
  }, []);

  return isActive;
}
