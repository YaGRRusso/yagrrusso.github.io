import type { MetadataRoute } from "next";

const SITE_URL = "https://yagrrusso.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = ["/en/", "/pt/", "/en/skills/", "/pt/skills/"];

  return urls.map((path) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: path.includes("skills") ? 0.5 : 1,
    url: `${SITE_URL}${path}`,
  }));
}
