"use client";

import { type ComponentProps, Fragment } from "react";
import { SkillIcon } from "@/components/skill-icon";
import { Marquee } from "@/components/ui/marquee";
import { useMessages } from "@/hooks/reactive/use-messages";
import { cn } from "@/lib/utils";

type SkillI18n = {
  locale: string;
  messages: { title: string };
};

interface Props extends Omit<ComponentProps<typeof Marquee>, "children"> {
  skills: { id: string; slug: string; i18n: SkillI18n[] }[];
}

export function SkillsMarquee({ skills, className, ...props }: Props) {
  const getMessages = useMessages();

  return (
    <Marquee className={cn("w-full", className)} pauseOnHover {...props}>
      <div className="flex items-center gap-8 px-2 py-4 text-[0.625rem] uppercase tracking-wide opacity-75">
        {skills.map((skill) => (
          <Fragment key={skill.id}>
            <SkillIcon slug={skill.slug} />
            {getMessages(skill.i18n)?.title ?? skill.slug}
          </Fragment>
        ))}
      </div>
    </Marquee>
  );
}
