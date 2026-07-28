import { MinusIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  from?: string | Date;
  to?: string | Date;
}

export function Period({ children, className, from, to, ...props }: Props) {
  const tCommon = useTranslations("common");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 text-muted-foreground text-sm",
        className
      )}
      {...props}
    >
      {dayjs(from).format("MM/YYYY")}
      <MinusIcon />
      {to ? dayjs(to).format("MM/YYYY") : tCommon("time.present")}
    </div>
  );
}
