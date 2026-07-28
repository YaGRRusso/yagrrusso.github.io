import { MinusIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useLocale, useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  from?: string | Date;
  to?: string | Date;
}

function formatMonthYear(value: string | Date, locale: string) {
  return dayjs(value).toDate().toLocaleDateString(locale, {
    month: "2-digit",
    year: "numeric",
  });
}

export function Period({ children, className, from, to, ...props }: Props) {
  const locale = useLocale();
  const tCommon = useTranslations("common");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 text-muted-foreground text-sm",
        className
      )}
      {...props}
    >
      {from ? formatMonthYear(from, locale) : null}
      <MinusIcon />
      {to ? formatMonthYear(to, locale) : tCommon("time.present")}
    </div>
  );
}
