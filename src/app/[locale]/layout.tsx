import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { ClientLayout } from "./layout-client";
import "@/styles/globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      className={cn(jetbrainsMono.variable, inter.variable)}
      lang={locale ?? routing.defaultLocale}
    >
      <NextIntlClientProvider>
        <ClientLayout locale={locale}>{children}</ClientLayout>
      </NextIntlClientProvider>
    </html>
  );
}
