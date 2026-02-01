import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { ClientLayout } from "./layout-client";
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

  return (
    <html
      className={cn(
        "dark scroll-smooth",
        jetbrainsMono.variable,
        spaceGrotesk.variable
      )}
      lang={locale ?? routing.defaultLocale}
    >
      <Script
        data-website-id="73f73caf-1063-405d-9e17-ada211458cf9"
        defer
        src="https://cloud.umami.is/script.js"
      />
      <NextIntlClientProvider>
        <ClientLayout locale={locale}>{children}</ClientLayout>
      </NextIntlClientProvider>
    </html>
  );
}
