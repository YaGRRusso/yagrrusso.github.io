import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  ClockIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const variants = {
  COMPLETED: {
    color: "text-success",
    label: "status.completed",
    icon: <CheckCircleIcon />,
  },
  IN_PROGRESS: {
    color: "text-warning",
    label: "status.inProgress",
    icon: <ClockIcon />,
  },
  PAUSED: {
    color: "text-destructive",
    label: "status.paused",
    icon: <WarningCircleIcon />,
  },
} as const;

interface Props extends ComponentProps<"a"> {
  title: string;
  // description: string;
  skills?: {
    id: string;
    title: string;
    slug: string;
  }[];
  url?: string;
  school: {
    title: string;
    image: string;
  };
  status: "COMPLETED" | "IN_PROGRESS" | "PAUSED";
  hours?: number;
  date?: {
    from: Date;
    to?: Date;
  };
}

export function EducationCard({
  className,
  title,
  // description,
  skills,
  url,
  school,
  status,
  hours,
  date,
  ...props
}: Props) {
  const tCommon = useTranslations("common");

  return (
    <a
      className="group/hover flex h-full flex-col gap-4 rounded border bg-alternative px-8 py-12"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      <div className="flex justify-between">
        <Avatar.Root className="size-14">
          <Avatar.Image alt={school.title} src={school.image} />
          <Avatar.Fallback />
        </Avatar.Root>
        {url && (
          <Button size="icon" variant="ghost">
            <ArrowUpRightIcon />
          </Button>
        )}
      </div>
      <h3 className="font-semibold text-2xl">{title}</h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-semibold text-muted-foreground text-sm">
        {variants && (
          <div
            className={cn("flex items-center gap-1", variants[status].color)}
          >
            {variants[status].icon}
            {tCommon(variants[status].label)}
          </div>
        )}
        {hours && <div>{hours}h</div>}
        {date && (
          <div>
            {dayjs(date.from).format("MM/YYYY")}
            {" - "}
            {date.to ? dayjs(date.to).format("MM/YYYY") : tCommon("present")}
          </div>
        )}
        <div>@{school.title}</div>
      </div>
      {/* <p className="text-muted-foreground">{description}</p> */}
      {skills && skills.length > 0 && (
        <div className="scrollbar-hidden flex max-w-11/12 items-center gap-1 overflow-auto text-sm">
          {skills.map((skill) => (
            <Badge className="uppercase" key={skill.id} variant="secondary">
              {skill.title}
            </Badge>
          ))}
        </div>
      )}
    </a>
  );
}
