import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  icon: ReactNode;
  title: string;
  description: string;
}

export function IntroInfo({
  className,
  icon,
  title,
  description,
  ...props
}: Props) {
  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <div className="flex items-center gap-2 font-jetbrains-mono font-medium text-primary">
        {icon}
        <span>{title}</span>
      </div>
      <span className="text-end text-muted-foreground">{description}</span>
    </div>
  );
}
