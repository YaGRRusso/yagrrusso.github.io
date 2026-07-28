import { ArrowUpRightIcon, AtIcon, MedalIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { DottedList } from "@/components/dotted-list";
import { ExpandCharacters } from "@/components/expand-characters";
import { Period } from "@/components/period";
import type { SkillItem } from "@/components/skill-badge";
import { SkillBadgeList } from "@/components/skill-badge-list";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EducationLevel, EducationStatus } from "@/graphql/graphql";
import { cn } from "@/lib/utils";
import type { OrganizationProps, PeriodProps } from "./card-props";
import { StatusBadge } from "./status-badge";

interface Props extends ComponentProps<"a"> {
  description?: string;
  image?: string;
  level: EducationLevel;
  organization: OrganizationProps;
  period?: PeriodProps;
  skills?: SkillItem[];
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
  const duration = dayjs(period?.to).diff(dayjs(period?.from), "month");

  return (
    <a
      className={cn(
        "group/hover flex h-full flex-col justify-center gap-4 rounded border bg-card/40 px-8 py-12 text-card-foreground",
        className
      )}
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
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-3xl">{title}</h3>
        <ExpandCharacters
          className="text-muted-foreground"
          text={description ?? ""}
        />
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={status} />
        <Badge variant="secondary">
          <MedalIcon />
          {tCommon(`level.${level}`)}
        </Badge>
      </div>
      <DottedList>
        <div className="inline-block gap-8">
          <AtIcon className="inline-block" /> <span>{organization.name}</span>
        </div>
        <Period from={period?.from} to={period?.to} />
        <span>{tCommon("time.months", { count: duration })}</span>
      </DottedList>
      {skills && skills.length > 0 && (
        <div className="flex max-w-11/12 flex-wrap items-center gap-1 text-sm">
          <SkillBadgeList skills={skills} />
        </div>
      )}
    </a>
  );
}
