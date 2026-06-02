import type { ComponentProps, ReactNode } from "react";
import { simpleIconsCdn } from "@/lib/cdn";
import { Avatar } from "./ui/avatar";

interface Props extends ComponentProps<typeof Avatar.Root> {
  fallback?: ReactNode;
  fallbackClassName?: string;
  name: string;
  slug: string;
}

export function SkillAvatar({
  name,
  slug,
  fallback,
  fallbackClassName,
  ...props
}: Props) {
  return (
    <Avatar.Root {...props}>
      <Avatar.Image alt={name} src={simpleIconsCdn(slug)} />
      <Avatar.Fallback className={fallbackClassName}>
        {fallback}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
