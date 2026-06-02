import type { ComponentProps } from "react";
import { getSlug } from "@/consts/slugs";
import { Badge } from "./ui/badge";

interface Props extends ComponentProps<typeof Badge> {
  name: string;
  slug: string;
}

export function SkillBadge({ name, slug, ...props }: Props) {
  return (
    <Badge variant="outline" {...props}>
      {getSlug(slug).icon}
      {name}
    </Badge>
  );
}
