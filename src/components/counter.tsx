import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { NumberTicker } from "./ui/number-ticker";

interface Props extends ComponentProps<"div"> {
  accent?: string;
  label: string;
  value: number;
}

export function Counter({ value, label, accent, className, ...props }: Props) {
  return (
    <div className={cn("flex items-center gap-x-2", className)} {...props}>
      <div className="flex items-center font-bold">
        <NumberTicker className="text-7xl" value={value} />
        <span className="text-6xl text-primary">{accent}</span>
      </div>
      <span className="max-w-32 font-bold text-xl">{label}</span>
    </div>
  );
}
