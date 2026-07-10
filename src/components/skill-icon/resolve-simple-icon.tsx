import Image from "next/image";
import type { ReactNode } from "react";
import icons from "simple-icons/icons.json";
import { simpleIconsCdn } from "@/lib/cdn";

const SIZE_CLASS = "size-[1em]";
const SIMPLE_ICON_SLUGS = new Set(
  (icons as { slug: string }[]).map((icon) => icon.slug)
);

export function resolveSimpleIcon(slug: string): ReactNode | null {
  if (!SIMPLE_ICON_SLUGS.has(slug)) {
    return null;
  }

  return (
    <Image
      alt={slug}
      className={SIZE_CLASS}
      height={24}
      src={simpleIconsCdn(slug)}
      width={24}
    />
  );
}
