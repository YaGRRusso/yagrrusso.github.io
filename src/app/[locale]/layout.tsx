import { QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { prefetchGetMe } from "@/hooks/queries/auth";
import { routing } from "@/i18n/routing";
import { dehydrate } from "@/lib/dehydrate";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ClientLayout } from "./layout-client";
import "@/styles/globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  } else {
    notFound();
  }

  const queryClient = new QueryClient();
  await prefetchGetMe(queryClient);

  return (
    <html
      className={cn("theme-original scroll-smooth", ...fontVariables)}
      data-scroll-behavior="smooth"
      lang={locale ?? routing.defaultLocale}
      suppressHydrationWarning
    >
      <Script
        data-website-id="73f73caf-1063-405d-9e17-ada211458cf9"
        defer
        src="https://cloud.umami.is/script.js"
      />
      <Script
        async
        crossOrigin="anonymous"
        src="https://tweakcn.com/live-preview.min.js"
      />
      <NextIntlClientProvider>
        <ClientLayout dehydratedState={dehydrate(queryClient)} locale={locale}>
          {children}
        </ClientLayout>
      </NextIntlClientProvider>
    </html>
  );
}
