import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { type Locale, routing } from "@/i18n/routing";
import { ClientLayout } from "./layout-client";
import "@/styles/globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  } else {
    notFound();
  }

  return (
    <html lang={locale ?? routing.defaultLocale}>
      <NextIntlClientProvider>
        <ClientLayout locale={locale}>{children}</ClientLayout>
      </NextIntlClientProvider>
    </html>
  );
}
