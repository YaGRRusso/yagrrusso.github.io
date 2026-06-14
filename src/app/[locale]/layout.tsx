import { QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { prefetchFindOneUserById } from "@/hooks/queries/auth";
import { routing } from "@/i18n/routing";
import { dehydrate } from "@/lib/dehydrate";
import { ClientLayout } from "./layout-client";
import { PROFILE_USER_VARS } from "./queries";
import "@/styles/globals.css";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

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
  await prefetchFindOneUserById(queryClient, PROFILE_USER_VARS);

  return (
    <html
      className={cn(
        "dark scroll-smooth",
        jetbrainsMono.variable,
        spaceGrotesk.variable
      )}
      data-scroll-behavior="smooth"
      lang={locale ?? routing.defaultLocale}
    >
      <Script
        data-website-id="73f73caf-1063-405d-9e17-ada211458cf9"
        defer
        src="https://cloud.umami.is/script.js"
      />
      <NextIntlClientProvider>
        <ClientLayout dehydratedState={dehydrate(queryClient)} locale={locale}>
          {children}
        </ClientLayout>
      </NextIntlClientProvider>
    </html>
  );
}
