import {
  CheckCircleIcon,
  ClockIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import type { ComponentProps, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { type CourseStatus, EducationStatus } from "@/graphql/graphql";
import { cn } from "@/lib/utils";

type StatusVariant = {
  color: string;
  label: "status.completed" | "status.inProgress" | "status.paused";
  icon: ReactNode;
};

const variants: Record<EducationStatus | CourseStatus, StatusVariant> = {
  [EducationStatus.Complete]: {
    color: "border-transparent bg-success/15 text-success-foreground",
    label: "status.completed",
    icon: <CheckCircleIcon />,
  },
  [EducationStatus.InProgress]: {
    color: "border-transparent bg-warning/15 text-warning-foreground",
    label: "status.inProgress",
    icon: <ClockIcon />,
  },
  [EducationStatus.Incomplete]: {
    color: "border-transparent bg-destructive/15 text-destructive-foreground",
    label: "status.paused",
    icon: <WarningCircleIcon />,
  },
};

interface Props extends ComponentProps<typeof Badge> {
  status: EducationStatus | CourseStatus;
}

export function StatusBadge({ status, className, ...props }: Props) {
  const tCommon = useTranslations("common");
  const variant = variants[status];

  return (
    <Badge
      className={cn(variant.color, className)}
      variant="outline"
      {...props}
    >
      {variant.icon}
      {tCommon(variant.label)}
    </Badge>
  );
}
