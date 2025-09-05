import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { routing } from "@/i18n/routing";
import { ClientPage } from "./page-client";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <ClientPage locale={locale} />;
}
