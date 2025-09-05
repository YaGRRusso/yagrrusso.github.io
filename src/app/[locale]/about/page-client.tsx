"use client";

import { useTranslations } from "next-intl";
import { redirect } from "@/i18n/navigation";

type Props = {
  locale: string;
};

export function ClientPage({ locale }: Props) {
  const t = useTranslations("AboutPage");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <button onClick={() => redirect({ href: "/", locale })} type="button">
        Go home
      </button>
    </div>
  );
}
