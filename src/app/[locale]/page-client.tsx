"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Props = {
  locale: string;
};

export function ClientPage({ locale }: Props) {
  const t = useTranslations("HomePage");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/about" locale={locale}>
        About Us
      </Link>
    </div>
  );
}
