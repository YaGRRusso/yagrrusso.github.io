import { PackageIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { SkillAvatar } from "./skill-avatar";
import { Badge } from "./ui/badge";

interface Props extends ComponentProps<typeof Badge> {
  name: string;
  slug: string;
}

export function SkillBadge({ name, slug, ...props }: Props) {
  return (
    <Badge variant="outline" {...props}>
      <SkillAvatar
        className="size-2.5 rounded-xs"
        fallback={<PackageIcon weight="fill" />}
        fallbackClassName="bg-transparent"
        name={name}
        slug={slug}
      />
      {name}
    </Badge>
  );
}
