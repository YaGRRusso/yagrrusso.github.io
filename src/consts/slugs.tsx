import { SiJavascript, SiVite } from "@icons-pack/react-simple-icons";
import { PackageIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/avatar";
import { simpleIconsCdn } from "@/lib/cdn";

export type SlugType = {
  icon: ReactNode;
};

export const SLUGS = {
  other: { icon: <PackageIcon /> },
  javascript: { icon: <SiJavascript className="size-[1em]" color="default" /> },
  vite: { icon: <SiVite className="size-[1em]" color="default" /> },
} as const satisfies Record<string, SlugType>;

export function getSlug(value: keyof typeof SLUGS | (string & {})) {
  const slug = SLUGS[value as keyof typeof SLUGS];
  if (slug) return slug;

  return {
    icon: (
      <Avatar.Root className="size-[1em] rounded-none">
        <Avatar.Image alt={value} src={simpleIconsCdn(value)} />
        <Avatar.Fallback className="bg-transparent">
          {SLUGS.other.icon}
        </Avatar.Fallback>
      </Avatar.Root>
    ),
  };
}
