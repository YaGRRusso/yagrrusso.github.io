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
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
          height: "60vh",
          fontFamily: "monospace",
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
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
            height: "1px",
            width: "16rem",
            backgroundColor: "white",
            opacity: 0.2,
          }}
        />
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
            opacity: 0.4,
          }}
        >
          Continue in English
          <ArrowRightIcon weight="bold" />
        </a>
      </body>
    </html>
  );
}
