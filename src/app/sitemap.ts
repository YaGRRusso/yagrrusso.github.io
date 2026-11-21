import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const urls = ["/en/", "/pt/", "/en/skills/", "/pt/skills/"];

  return urls.map((path) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: path.includes("skills") ? 0.5 : 1,
    url: `${siteUrl}${path}`,
  }));
}
