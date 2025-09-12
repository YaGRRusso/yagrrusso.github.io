"use client";

import { redirect } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";

const { locales, defaultLocale } = routing;
export default function RootPage() {
  if (typeof window !== "undefined") {
    const browserLocale = navigator.language.split("-")[0] as Locale;
    if (locales.includes(browserLocale)) {
      redirect({ href: "/", locale: browserLocale });
    }
  }

  redirect({ href: "/", locale: defaultLocale });
}
