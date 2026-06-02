import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  ClockIcon,
  DotIcon,
  MedalIcon,
  PackageIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { type EducationLevel, EducationStatus } from "@/graphql/graphql";
import { simpleIconsCdn } from "@/lib/cdn";
import { cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const variants = {
  [EducationStatus.Complete]: {
    color: "text-success",
    label: "status.completed",
    icon: <CheckCircleIcon />,
  },
  [EducationStatus.InProgress]: {
    color: "text-warning",
    label: "status.inProgress",
    icon: <ClockIcon />,
  },
  [EducationStatus.Incomplete]: {
    color: "text-destructive",
    label: "status.paused",
    icon: <WarningCircleIcon />,
  },
} as const;

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
        "group/hover flex h-full flex-col justify-center gap-4 rounded border px-8 py-12",
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
        <span className="text-muted-foreground">{description}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">
          {variants[status]?.icon}
          {tCommon(variants[status]?.label)}
        </Badge>
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
            <Badge key={skill.id} variant="outline">
              <Avatar.Root className="size-2.5 rounded-xs">
                <Avatar.Image
                  alt={skill.name}
                  src={simpleIconsCdn(skill.slug)}
                />
                <Avatar.Fallback className="bg-transparent">
                  <PackageIcon weight="fill" />
                </Avatar.Fallback>
              </Avatar.Root>
              {skill.name}
            </Badge>
          ))}
        </div>
      )}
    </a>
  );
}
