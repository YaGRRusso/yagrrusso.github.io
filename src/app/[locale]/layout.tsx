import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { ClientLocaleLayout } from "./layout-client";
import "@/styles/globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  } else {
    notFound();
  }

  return (
    <html lang={locale ?? routing.defaultLocale}>
      <NextIntlClientProvider>
        <ClientLocaleLayout locale={locale}>{children}</ClientLocaleLayout>
      </NextIntlClientProvider>
    </html>
  );
}
