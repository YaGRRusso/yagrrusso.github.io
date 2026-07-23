import {
  CheckCircleIcon,
  ClockIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import type { ComponentProps, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { type CourseStatus, EducationStatus } from "@/graphql/graphql";

type StatusVariant = {
  color: string;
  label: "status.completed" | "status.inProgress" | "status.paused";
  icon: ReactNode;
};

const variants: Record<EducationStatus | CourseStatus, StatusVariant> = {
  [EducationStatus.Complete]: {
    color: "border-transparent bg-success/80 text-success-foreground",
    icon: <CheckCircleIcon />,
    label: "status.completed",
  },
  [EducationStatus.InProgress]: {
    color: "border-transparent bg-warning/80 text-warning-foreground",
    icon: <ClockIcon />,
    label: "status.inProgress",
  },
  [EducationStatus.Incomplete]: {
    color: "border-transparent bg-destructive/80 text-destructive-foreground",
    icon: <WarningCircleIcon />,
    label: "status.paused",
  },
};

interface Props extends ComponentProps<typeof Badge> {
  status: EducationStatus | CourseStatus;
}

export function StatusBadge({ status, ...props }: Props) {
  const tCommon = useTranslations("common");
  const variant = variants[status];

  return (
    <Badge variant="secondary" {...props}>
      {variant.icon}
      {tCommon(variant.label)}
    </Badge>
  );
}
