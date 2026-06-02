import { type ComponentProps, Fragment } from "react";
import { Marquee } from "@/components/ui/marquee";
import { getSlug } from "@/consts/slugs";
import { cn } from "@/lib/utils";

interface Props extends Omit<ComponentProps<typeof Marquee>, "children"> {
  skills: { id: string; name: string; slug: string }[];
}

export function SkillsMarquee({ skills, className, ...props }: Props) {
  return (
    <Marquee className={cn("w-full", className)} pauseOnHover {...props}>
      <div className="flex items-center gap-8 px-2 py-4 text-[0.625rem] uppercase tracking-wide opacity-75">
        {skills.map((skill) => (
          <Fragment key={skill.id}>
            {getSlug(skill.slug).icon}
            {skill.name}
          </Fragment>
        ))}
      </div>
    </Marquee>
  );
}
