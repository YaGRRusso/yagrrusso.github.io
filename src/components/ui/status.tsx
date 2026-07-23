import {
  CircleNotchIcon,
  SealCheckIcon,
  SealQuestionIcon,
  SealWarningIcon,
} from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const icons = {
  error: <SealWarningIcon className="size-4" />,
  info: <SealWarningIcon className="size-4" />,
  loading: <CircleNotchIcon className="size-4 animate-spin" />,
  success: <SealCheckIcon className="size-4" />,
  warning: <SealQuestionIcon className="size-4" />,
};

const statusVariants = cva("flex items-center gap-1", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "text-foreground",
      error: "text-destructive",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
    },
  },
});

function Status({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn(statusVariants, className)} {...props}>
      {icons[children as keyof typeof icons]}
      {children}
    </div>
  );
}

export { Status };
