import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: "/", userAgent: "*" },
    sitemap: "https://yagrrusso.github.io/sitemap.xml",
  };
}
