// Post-build smoke test for the static export in `out/`.
// Requires a build first (`npm run build`); reads the emitted HTML from `out/`.

import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";

const OUT_DIR = resolve("out");
const BASE_URL = "https://yagrrusso.github.io";
const LOCALES = ["en", "pt"] as const;
const OG_PROPS = ["og:title", "og:description", "og:url", "og:image"] as const;

const HOME_QUERIES = [
  "getMe",
  "findManySkills",
  "findManyProjects",
  "findManyGroupedExperiences",
  "findManyEducations",
  "findManyCourses",
];

type Route = {
  file: string;
  locale: string;
  url: string;
  expectQueries: string[];
  expectListItems?: boolean;
};

const ROUTES: Route[] = [
  {
    expectQueries: HOME_QUERIES,
    file: "en/index.html",
    locale: "en",
    url: `${BASE_URL}/en/`,
  },
  {
    expectQueries: HOME_QUERIES,
    file: "pt/index.html",
    locale: "pt",
    url: `${BASE_URL}/pt/`,
  },
  {
    expectListItems: true,
    expectQueries: ["getMe", "findManySkills"],
    file: "en/skills/index.html",
    locale: "en",
    url: `${BASE_URL}/en/skills/`,
  },
  {
    expectListItems: true,
    expectQueries: ["getMe", "findManySkills"],
    file: "pt/skills/index.html",
    locale: "pt",
    url: `${BASE_URL}/pt/skills/`,
  },
];

if (!existsSync(OUT_DIR)) {
  throw new Error(
    `No "out/" directory at ${OUT_DIR}. Run "npm run build" first.`
  );
}

/** React Query embeds dehydrated query payloads (quotes escaped) in the flight stream. */
function hasDehydratedQuery(html: string, key: string) {
  const field = key.startsWith("findMany") ? "found" : "id";
  return html.includes(`${key}\\":{\\"${field}\\":`);
}

describe.each(ROUTES)("$file", (route) => {
  const html = readFileSync(join(OUT_DIR, route.file), "utf8");
  const $ = load(html);

  it("has a non-empty <title>", () => {
    expect($("title").first().text().trim()).not.toBe("");
  });

  it("has a meta description", () => {
    expect($('meta[name="description"]').attr("content")?.trim()).toBeTruthy();
  });

  it("has the correct canonical URL", () => {
    expect($('link[rel="canonical"]').attr("href")).toBe(route.url);
  });

  it.each(LOCALES)("has a hreflang alternate for %s", (locale) => {
    expect($(`link[hreflang="${locale}"]`).length).toBeGreaterThan(0);
  });

  it.each(OG_PROPS)("has the %s tag", (prop) => {
    expect($(`meta[property="${prop}"]`).attr("content")?.trim()).toBeTruthy();
  });

  it("has a twitter:card", () => {
    expect($('meta[name="twitter:card"]').attr("content")?.trim()).toBeTruthy();
  });

  it("has the correct <html lang>", () => {
    expect($("html").attr("lang")).toBe(route.locale);
  });

  if (route.file.endsWith("index.html") && !route.file.includes("skills")) {
    it("has Person structured data", () => {
      const jsonLd = $('script[type="application/ld+json"]').html();
      expect(jsonLd).toBeTruthy();

      const data = JSON.parse(jsonLd ?? "{}");
      expect(data["@type"]).toBe("Person");
      expect(data.name).toBe("Yago Russo");
      expect(data.url).toBe(route.url);
    });
  }

  it("is not stuck in a loading state", () => {
    expect($('[data-state="loading"]')).toHaveLength(0);
  });

  it.each(route.expectQueries)(
    "server-rendered %s into the dehydrated state",
    (key) => {
      expect(hasDehydratedQuery(html, key)).toBe(true);
    }
  );

  if (route.expectListItems) {
    it("rendered skill items into the grid with stable ids", () => {
      const items = $("ul li[id]");

      expect(items.length).toBeGreaterThan(0);

      items.each((_, el) => {
        expect($(el).attr("id")?.trim()).toBeTruthy();
        expect($(el).text().trim()).toBeTruthy();
      });
    });
  }
});

describe("crawl files", () => {
  it("emits robots.txt with a sitemap reference", () => {
    const robots = readFileSync(join(OUT_DIR, "robots.txt"), "utf8");

    expect(robots).toContain("User-Agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${BASE_URL}/sitemap.xml`);
  });

  it("emits sitemap.xml with all localized routes", () => {
    const sitemap = readFileSync(join(OUT_DIR, "sitemap.xml"), "utf8");

    for (const path of ["/en/", "/pt/", "/en/skills/", "/pt/skills/"]) {
      expect(sitemap).toContain(`${BASE_URL}${path}`);
    }
  });
});
