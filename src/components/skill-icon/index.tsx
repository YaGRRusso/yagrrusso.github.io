import { PackageIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { resolveAwsIcon } from "./resolve-aws-icon";
import { resolveSimpleIcon } from "./resolve-simple-icon";
import { resolveSlugOverride } from "./resolve-slug-override";

const ICON_CACHE = new Map<string, ReactNode>();

const SIZE_CLASS = "size-[1em]";
const FALLBACK_ICON = <PackageIcon className={SIZE_CLASS} />;

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
  slug: string;
  className?: string;
};

export function SkillIcon({ slug, className }: SkillIconProps) {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!ICON_CACHE.has(normalizedSlug)) {
    ICON_CACHE.set(
      normalizedSlug,
      normalizedSlug ? resolveSkillIcon(normalizedSlug) : FALLBACK_ICON
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        className
      )}
    >
      {ICON_CACHE.get(normalizedSlug)}
    </span>
  );
}
