"use client";

import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const { locales, defaultLocale } = routing;
export default function RootPage() {
  const browserLocale = navigator.language.split("-")[0];

  if (locales.includes(browserLocale as any)) {
    redirect({ href: "/", locale: browserLocale });
  } else {
    redirect({ href: "/", locale: defaultLocale });
  }
}
