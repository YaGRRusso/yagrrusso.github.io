import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FALLBACK_ICON } from "./fallback-icon";
import { resolveAwsIcon } from "./resolve-aws-icon";
import { resolveSimpleIcon } from "./resolve-simple-icon";
import { resolveSlugOverride } from "./resolve-slug-override";

const ICON_CACHE = new Map<string, ReactNode>();

const ICON_RESOLVERS: ((slug: string) => ReactNode | null)[] = [
  resolveAwsIcon,
  resolveSlugOverride,
  resolveSimpleIcon,
];

function resolveSkillIcon(slug: string): ReactNode {
  for (const resolve of ICON_RESOLVERS) {
    const icon = resolve(slug);

    if (icon) {
      return icon;
    }
  }

  return FALLBACK_ICON;
}

type SkillIconProps = {
  /** Prefer slug for icon resolution; pass id as fallback for cache key stability. */
  slug?: string | null;
  className?: string;
};

export function SkillIcon({ slug, className }: SkillIconProps) {
  const cacheKey = slug?.trim().toLowerCase() ?? "";

  if (!ICON_CACHE.has(cacheKey)) {
    ICON_CACHE.set(
      cacheKey,
      cacheKey ? resolveSkillIcon(cacheKey) : FALLBACK_ICON
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        className
      )}
    >
      {ICON_CACHE.get(cacheKey)}
    </span>
  );
}
