import type { MetadataRoute } from "next";

const SITE_URL = "https://yagrrusso.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = ["/en/", "/pt/", "/en/skills/", "/pt/skills/"];

  return urls.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path.includes("skills") ? 0.5 : 1,
  }));
}
