"use client";

import { type ComponentProps, Fragment } from "react";
import type { SkillItem } from "@/components/skill-badge";
import { SkillIcon } from "@/components/skill-icon";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

interface Props extends Omit<ComponentProps<typeof Marquee>, "children"> {
  skills: SkillItem[];
}

export function SkillsMarquee({ skills, className, ...props }: Props) {
  return (
    <Marquee className={cn("w-full", className)} pauseOnHover {...props}>
      <div className="flex items-center gap-8 px-2 py-4 text-[0.625rem] uppercase tracking-wide opacity-75">
        {skills.map((skill) => (
          <Fragment key={skill.id}>
            <SkillIcon slug={skill.slug} />
            {skill.title}
          </Fragment>
        ))}
      </div>
    </Marquee>
  );
}
