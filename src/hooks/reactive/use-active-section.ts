"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    const sectionIds = idsKey ? idsKey.split(",") : [];
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      setActiveId(null);
      return;
    }

    const visible = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        const [topMost] = [...visible.values()].sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );

        setActiveId(topMost.target.id);
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
