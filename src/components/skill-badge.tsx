"use client";

import type { ComponentProps } from "react";
import { SkillIcon } from "@/components/skill-icon";
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

export function SkillBadge({ slug, title, ...props }: Props) {
  return (
    <Badge variant="outline" {...props}>
      <SkillIcon className="text-[0.625rem]" slug={slug} />
      {title}
    </Badge>
  );
}
