"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routing } from "@/i18n/routing";

const { locales, defaultLocale } = routing;
export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLocale = navigator.language.split("-")[0];

    if (locales.includes(browserLocale as any)) {
      router.replace(`/${browserLocale}`);
    } else {
      router.replace(`/${defaultLocale}`);
    }
  }, [router]);

  return (
    <html lang="en">
      <body />
    </html>
  );
}
