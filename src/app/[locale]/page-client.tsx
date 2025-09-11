"use client";

import { useTranslations } from "next-intl";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Link } from "@/i18n/navigation";

type Props = {
  locale: string;
};

export function ClientPage({ locale }: Props) {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <BackgroundBeams />
      <strong className="text-5xl">{t("title")}</strong>
      <p>{t("description")}</p>
      <Link className="underline" href="/about" locale={locale}>
        About Us
      </Link>
    </div>
  );
}
