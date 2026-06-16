"use client";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import { type Locale, routing } from "@/i18n/routing";

const { locales, defaultLocale } = routing;

export default function RootPage() {
  const fallbackHref = `/${defaultLocale}/`;

  useEffect(() => {
    const browserLocale = navigator.language.split("-")[0] as Locale;
    const locale = locales.includes(browserLocale)
      ? browserLocale
      : defaultLocale;

    return () => window.location.replace(`/${locale}/`);
  }, []);

  return (
    <html lang="en">
      <meta content={`0;url=${fallbackHref}`} httpEquiv="refresh" />
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
          height: "100vh",
          margin: 0,
        }}
      >
        <a
          href={fallbackHref}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
            textDecoration: "none",
            gap: "0.5rem",
            padding: "1rem",
          }}
        >
          Continue to Site
          <ArrowRightIcon weight="bold" />
        </a>
      </body>
    </html>
  );
}
