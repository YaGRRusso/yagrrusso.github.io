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
