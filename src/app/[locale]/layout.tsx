import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { ClientRootLayout } from "./layout-client";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  } else {
    notFound();
  }

  return (
    <html lang={locale ?? routing.defaultLocale}>
      <body>
        <NextIntlClientProvider>
          <ClientRootLayout locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
