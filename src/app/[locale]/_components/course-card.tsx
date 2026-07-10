import { ArrowUpRightIcon, DotIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { ExpandCharacters } from "@/components/expand-characters";
import { SkillBadge, type SkillItem } from "@/components/skill-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { CourseStatus } from "@/graphql/graphql";
import type { OrganizationProps } from "./card-props";
import { StatusBadge } from "./status-badge";

interface Props extends ComponentProps<"a"> {
  description: string;
  hours?: number;
  image?: string;
  organization: OrganizationProps;
  skills?: SkillItem[];
  status: CourseStatus;
  title: string;
  url?: string;
}

export function CourseCard({
  className,
  title,
  description,
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
      href={url || image || organization.website || undefined}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      <div className="flex justify-between">
        <Avatar.Root className="size-12">
          <Avatar.Image
            alt={organization.name}
            src={organization.logo || undefined}
          />
          <Avatar.Fallback />
        </Avatar.Root>
        {(url || image || organization.website) && (
          <Button size="icon" variant="ghost">
            <ArrowUpRightIcon />
          </Button>
        )}
      </div>
      <h3 className="line-clamp-2 font-semibold text-3xl">{title}</h3>
      <ExpandCharacters
        className="text-muted-foreground"
        text={description ?? ""}
      >
        {description}
      </ExpandCharacters>
      <div className="flex items-center gap-2">
        <StatusBadge status={status} />
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm">
        {hours && <div>{tCommon("time.hours", { count: hours })}</div>}
        <DotIcon />
        <div>@{organization.name}</div>
      </div>
      {skills && skills.length > 0 && (
        <div className="flex max-w-11/12 flex-wrap items-center gap-1 text-sm">
          {skills.map((skill) => (
            <SkillBadge key={skill.id} slug={skill.slug} title={skill.title} />
          ))}
        </div>
      )}
    </a>
  );
}
