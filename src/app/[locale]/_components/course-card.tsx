import { ArrowUpRightIcon, DotIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { SkillBadge } from "@/components/skill-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { CourseStatus } from "@/graphql/graphql";
import { StatusBadge } from "./status-badge";

interface Props extends ComponentProps<"a"> {
  hours?: number;
  image?: string;
  organization: {
    name: string;
    website?: string;
    logo?: string;
  };
  skills?: {
    category: string;
    id: string;
    name: string;
    slug: string;
  }[];
  status: CourseStatus;
  title: string;
  url?: string;
}

export function CourseCard({
  className,
  title,
  organization,
  skills,
  status,
  hours,
  url,
  image,
  ...props
}: Props) {
  const tCommon = useTranslations("common");

  return (
    <a
      className="group/hover flex h-full flex-col justify-center gap-4 rounded border bg-card/40 px-8 py-12 text-card-foreground"
      href={url ?? image ?? organization.website}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      <div className="flex justify-between">
        <Avatar.Root className="size-12">
          <Avatar.Image alt={organization.name} src={organization.logo} />
          <Avatar.Fallback />
        </Avatar.Root>
        {(url || image || organization.website) && (
          <Button size="icon" variant="ghost">
            <ArrowUpRightIcon />
          </Button>
        )}
      </div>
      <h3 className="line-clamp-2 font-semibold text-3xl">{title}</h3>
      <div className="flex items-center gap-2">
        <StatusBadge status={status} />
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm">
        {hours && <div>{tCommon("time.hours", { count: hours })}</div>}
        <DotIcon />
        <div>@{organization.name}</div>
      </div>
      {/* <p className="text-muted-foreground">{description}</p> */}
      {skills && skills.length > 0 && (
        <div className="flex max-w-11/12 flex-wrap items-center gap-1 text-sm">
          {skills.map((skill) => (
            <SkillBadge key={skill.id} name={skill.name} slug={skill.slug} />
          ))}
        </div>
      )}
    </a>
  );
}
