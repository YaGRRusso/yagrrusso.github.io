import { DiamondIcon } from "@phosphor-icons/react";
import { type ComponentProps, Fragment } from "react";
import { SkillAvatar } from "@/components/skill-avatar";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

interface Props extends Omit<ComponentProps<typeof Marquee>, "children"> {
  skills: { id: string; name: string; slug: string }[];
}

export function SkillsMarquee({ skills, className, ...props }: Props) {
  return (
    <Marquee className={cn("w-full", className)} pauseOnHover {...props}>
      <div className="flex items-center gap-8 p-4 opacity-75">
        {skills.map((skill) => (
          <Fragment key={skill.id}>
            <SkillAvatar
              className="size-2.5"
              fallback={<DiamondIcon weight="fill" />}
              fallbackClassName="bg-transparent"
              name={skill.name}
              slug={skill.slug}
            />
            <span className="text-[0.625rem] uppercase tracking-wide">
              {skill.name}
            </span>
          </Fragment>
        ))}
      </div>
    </Marquee>
  );
}
