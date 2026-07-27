import type { MetadataRoute } from "next";
import { getOrThrow } from "@/lib/get-or-throw";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getOrThrow(
    process.env.NEXT_PUBLIC_SITE_URL,
    "NEXT_PUBLIC_SITE_URL environment variable"
  );
  const urls = ["/en/", "/pt/", "/en/skills/", "/pt/skills/"];

  return urls.map((path) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: path.includes("skills") ? 0.5 : 1,
    url: `${siteUrl}${path}`,
  }));
}
