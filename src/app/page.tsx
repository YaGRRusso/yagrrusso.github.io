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

    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <html lang="en">
      <meta content={`0;url=${fallbackHref}`} httpEquiv="refresh" />
      <body
        style={{
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          fontFamily: "monospace",
          gap: "1rem",
          height: "60vh",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            alignItems: "center",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            opacity: 0.8,
          }}
        >
          <svg
            aria-hidden
            fill="currentColor"
            height="1rem"
            viewBox="0 0 256 256"
            width="1rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>loading</title>
            <g>
              <animateTransform
                attributeName="transform"
                dur="1s"
                from="0 128 128"
                repeatCount="indefinite"
                to="360 128 128"
                type="rotate"
              />
              <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z" />
            </g>
          </svg>
          Checking your Language...
        </span>
        <div
          style={{
            backgroundColor: "white",
            height: "1px",
            opacity: 0.2,
            width: "16rem",
          }}
        />
        <a
          href={fallbackHref}
          style={{
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            opacity: 0.4,
            textDecoration: "none",
          }}
        >
          Continue in English
          <ArrowRightIcon weight="bold" />
        </a>
      </body>
    </html>
  );
}
