import type { MetadataRoute } from "next";
import { getOrThrow } from "@/lib/get-or-throw";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getOrThrow(
    process.env.NEXT_PUBLIC_SITE_URL,
    "NEXT_PUBLIC_SITE_URL environment variable"
  );

  return {
    rules: { allow: "/", userAgent: "*" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
