import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  ClockIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { CourseStatus } from "@/graphql/graphql";
import { cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const variants = {
  [CourseStatus.Complete]: {
    color: "text-success",
    label: "status.completed",
    icon: <CheckCircleIcon />,
  },
  [CourseStatus.InProgress]: {
    color: "text-warning",
    label: "status.inProgress",
    icon: <ClockIcon />,
  },
  [CourseStatus.Incomplete]: {
    color: "text-destructive",
    label: "status.paused",
    icon: <WarningCircleIcon />,
  },
} as const;

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
      className="group/hover flex h-full flex-col justify-center gap-4 rounded border bg-alternative px-8 py-12"
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
      <h3 className="font-semibold text-2xl">{title}</h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-semibold text-muted-foreground text-sm">
        {variants && (
          <div
            className={cn("flex items-center gap-1", variants[status]?.color)}
          >
            {variants[status]?.icon}
            {tCommon(variants[status]?.label)}
          </div>
        )}
        {hours && <div>{hours}h</div>}
        <div>@{organization.name}</div>
      </div>
      {/* <p className="text-muted-foreground">{description}</p> */}
      {skills && skills.length > 0 && (
        <div className="scrollbar-hidden flex max-w-11/12 items-center gap-1 overflow-auto text-sm">
          {skills.map((skill) => (
            <Badge className="uppercase" key={skill.id} variant="secondary">
              {skill.name}
            </Badge>
          ))}
        </div>
      )}
    </a>
  );
}
