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
  success: <SealCheckIcon className="size-4" />,
  info: <SealWarningIcon className="size-4" />,
  warning: <SealQuestionIcon className="size-4" />,
  error: <SealWarningIcon className="size-4" />,
  loading: <CircleNotchIcon className="size-4 animate-spin" />,
};

const statusVariants = cva("flex items-center gap-1", {
  variants: {
    variant: {
      default: "text-foreground",
      success: "text-success",
      info: "text-info",
      warning: "text-warning",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
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
