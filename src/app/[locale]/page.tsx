import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { routing } from "@/i18n/routing";
import { generateSEO } from "@/lib/seo";
import { ClientPage } from "./page-client";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  return await generateSEO({
    namespace: "HomePage",
    locale,
  });
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <ClientPage locale={locale} />;
}
