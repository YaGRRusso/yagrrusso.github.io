import fs from "node:fs";
import ph from "node:path";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale, Namespace } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

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

  const baseUrl = "https://yagrrusso.github.io";
  const formattedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const finalUrl = `${baseUrl}/${locale}${formattedPath}`;

  const mainImagePath = ph.join(
    process.cwd(),
    "public",
    "images",
    "og",
    `${namespace.toLowerCase()}-${locale}.png`
  );
  const mainImageExists = fs.existsSync(mainImagePath);

  const mainImageUrl = `${baseUrl}/images/og/${namespace.toLowerCase()}-${locale}.png`;
  const fallbackImageUrl = `${baseUrl}/images/og/default-${locale}.png`;
  const imageUrl = mainImageExists ? mainImageUrl : fallbackImageUrl;

  return {
    title,
    description,
    alternates: {
      canonical: finalUrl,
      languages: Object.fromEntries(
        routing.locales.map((lang) => [
          lang,
          `${baseUrl}/${lang}${formattedPath}`,
        ])
      ),
    },
    openGraph: {
      siteName: "Yago Russo",
      type: "website",
      title,
      description,
      url: finalUrl,
      locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
