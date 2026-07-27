import fs from "node:fs";
import ph from "node:path";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale, Namespace } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getOrThrow } from "@/lib/get-or-throw";

type SEOOptions = {
  namespace: Namespace;
  locale: Locale;
  path?: string;
};

export async function generateSEO({
  namespace,
  locale,
  path = "",
}: SEOOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const title = t("title");
  const description = t("description");
  const siteUrl = getOrThrow(
    process.env.NEXT_PUBLIC_SITE_URL,
    "NEXT_PUBLIC_SITE_URL environment variable"
  );

  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  const finalUrl = `${siteUrl}/${locale}${formattedPath}`;

  const mainImagePath = ph.join(
    process.cwd(),
    "public",
    "images",
    "og",
    `${namespace.toLowerCase()}-${locale}.png`
  );
  const mainImageExists = fs.existsSync(mainImagePath);

  const mainImageUrl = `${siteUrl}/images/og/${namespace.toLowerCase()}-${locale}.png`;
  const fallbackImageUrl = `${siteUrl}/images/og/default-${locale}.png`;
  const imageUrl = mainImageExists ? mainImageUrl : fallbackImageUrl;

  return {
    alternates: {
      canonical: finalUrl,
      languages: Object.fromEntries(
        routing.locales.map((lang) => [
          lang,
          `${siteUrl}/${lang}${formattedPath}`,
        ])
      ),
    },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: title,
          height: 630,
          url: imageUrl,
          width: 1200,
        },
      ],
      locale,
      siteName: title,
      title,
      type: "website",
      url: finalUrl,
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
      },
      index: true,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [imageUrl],
      title,
    },
  };
}
