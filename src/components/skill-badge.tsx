"use client";

import type { ComponentProps } from "react";
import { SkillIcon } from "@/components/skill-icon";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export type SkillItem = {
  id: string;
  slug: string;
  title: string;
};

interface Props extends ComponentProps<typeof Badge> {
  slug: string;
  title: string;
}

export function SkillBadge({ slug, title, className, ...props }: Props) {
  return (
    <Badge className={cn("max-w-full", className)} variant="outline" {...props}>
      <SkillIcon className="shrink-0 text-[0.625rem]" slug={slug} />
      <span className="min-w-0 truncate">{title}</span>
    </Badge>
  );
}
