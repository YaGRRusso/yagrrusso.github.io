import { ArrowUpRightIcon, DotIcon, MedalIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { ExpandCharacters } from "@/components/expand-characters";
import { SkillBadge } from "@/components/skill-badge";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EducationLevel, EducationStatus } from "@/graphql/graphql";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./status-badge";

interface Props extends ComponentProps<"a"> {
  description?: string;
  image?: string;
  level: EducationLevel;
  organization: {
    name: string;
    website?: string;
    logo?: string;
  };
  period?: {
    from?: Date | null;
    to?: Date | null;
  };
  skills?: {
    category: string;
    id: string;
    name: string;
    slug: string;
  }[];
  status: EducationStatus;
  title: string;
  url?: string;
}

export function EducationCard({
  className,
  title,
  organization,
  period,
  skills,
  status,
  description,
  level,
  url,
  image,
  ...props
}: Props) {
  const tCommon = useTranslations("common");

  return (
    <a
      className={cn(
        "group/hover flex h-full flex-col justify-center gap-4 rounded border bg-card/40 px-8 py-12 text-card-foreground",
        className
      )}
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
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-3xl">{title}</h3>
        <ExpandCharacters
          className="text-muted-foreground"
          text={description ?? ""}
        >
          {description}
        </ExpandCharacters>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={status} />
        <Badge variant="secondary">
          <MedalIcon />
          {tCommon(`level.${level}`)}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm">
        {period && (
          <div>
            {dayjs(period.from).format("MM/YYYY")}
            {" - "}
            {period.to
              ? dayjs(period.to).format("MM/YYYY")
              : tCommon("present")}
          </div>
        )}
        <DotIcon />
        <div>@{organization.name}</div>
      </div>

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
