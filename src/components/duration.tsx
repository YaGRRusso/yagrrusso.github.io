import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { getRoundedDuration } from "@/lib/duration";

interface Props extends ComponentProps<"span"> {
  from?: string | Date | null;
  to?: string | Date | null;
}

export function Duration({ from, to, ...props }: Props) {
  const tCommon = useTranslations("common");
  const { years, months } = getRoundedDuration(from, to);

  return <span {...props}>{tCommon("time.duration", { months, years })}</span>;
}
