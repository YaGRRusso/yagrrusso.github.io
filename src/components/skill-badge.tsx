"use client";

import type { ComponentProps } from "react";
import { getSlug } from "@/consts/slugs";
import { useMessages } from "@/hooks/reactive/use-messages";
import { Badge } from "./ui/badge";

type SkillI18n = {
  locale: string;
  messages: { title: string };
};

interface Props extends ComponentProps<typeof Badge> {
  i18n: SkillI18n[];
  slug: string;
}

export function SkillBadge({ i18n, slug, ...props }: Props) {
  const getMessages = useMessages();
  const title = getMessages(i18n)?.title ?? slug;

  return (
    <Badge variant="outline" {...props}>
      <div className="text-[0.625rem]">{getSlug(slug).icon}</div>
      {title}
    </Badge>
  );
}
