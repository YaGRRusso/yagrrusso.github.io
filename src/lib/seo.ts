import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

type SEOOptions = {
  namespace: string;
  locale: string;
  path?: string;
};

export async function generateSEO({ namespace, locale, path = "" }: SEOOptions) {
  const t = await getTranslations({ locale, namespace });

  const title = t("title");
  const description = t("description");

  const baseUrl = "https://yagrrusso.github.io";
  const finalUrl = `${baseUrl}${path ? `/${locale}/${path}` : `/${locale}`}`;

  const mainImage = `/images/og/${namespace.toLowerCase()}-${locale}.png`;
  const fallbackImage = `/images/og/default-${locale}.png`;

  const imageUrl = `${baseUrl}${mainImage}`;
  const imageFallbackUrl = `${baseUrl}${fallbackImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: finalUrl,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${baseUrl}/${l}${path ? `/${path}` : ""}`])),
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
        {
          url: imageFallbackUrl,
          width: 1200,
          height: 630,
          alt: `${title} fallback`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl, imageFallbackUrl],
    },
  };
}
