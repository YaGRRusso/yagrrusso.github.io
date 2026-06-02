# yagrrusso

Personal portfolio site for Yago Russo, a software engineer. It is a statically
exported Next.js app served from GitHub Pages, localized in English and
Portuguese, that renders skills, projects, experience, and education pulled from
a separate GraphQL API at build time.

## Tech stack

Core technologies the site is built on. One line each.

- **Next.js 16 (App Router)**: `src/app`, the framework. Configured for static export (`output: "export"` in `next.config.ts`) so the whole site builds to `out/`.
- **React 19**: every component under `src/components` and the page clients in `src/app/[locale]`.
- **TypeScript (strict)**: the entire `src` tree. Path alias `@/*` maps to `src/*`.
- **next-intl**: `src/i18n` plus `messages/en.json` and `messages/pt.json`, drives the `[locale]` route segment, translations, and per-locale SEO metadata.
- **TanStack Query**: `src/hooks`, fetches and caches data. Pages prefetch on the server and hydrate on the client via `HydrationBoundary`.
- **GraphQL Code Generator (client preset)**: `codegen.ts` and `src/graphql`, generates typed GraphQL documents from the API schema into `src/graphql`.
- **Tailwind CSS v4**: `src/styles/globals.css` and `postcss.config.mjs`, all styling. Utilities merged through `cn` in `src/lib/utils.ts`.
- **Radix UI + shadcn/ui**: `src/components/ui`, the primitive component layer (new-york style, Phosphor icon set).
- **Zustand**: `src/stores/theme.ts`, persists the light/dark/system theme preference to localStorage.
- **TanStack Form + Zod + validator**: `src/forms`, the contact form and its validation schema.
- **Biome + Ultracite**: `biome.jsonc`, linting and formatting.
- **Vitest + cheerio**: `tests/`, the test suite (`npm run test`); currently the post-build SEO/content smoke test.

## Project structure

```
src/
├── app/                      # Next.js App Router.
│   ├── layout.tsx            # Root layout: favicon metadata only.
│   ├── page.tsx              # Root entry, delegates to the localized tree.
│   └── [locale]/             # Locale-scoped routes (en, pt).
│       ├── layout.tsx        # Sets the request locale, fonts, intl provider, analytics.
│       ├── layout-client.tsx # Client shell: header, footer, query client, theme provider.
│       ├── page.tsx          # Home: server-prefetches skills/projects/experience/education.
│       ├── page-client.tsx   # Home composition root: orders the section components.
│       ├── queries.ts        # Home prefetch contract (HOME_*_VARS), shared with page.tsx.
│       ├── _components/      # Route-local: entity cards, status badge, site chrome, sections/.
│       └── skills/           # Skills route (server prefetch + client page).
├── components/               # Dumb, domain-agnostic reusable components (counter, skill-badge, etc.).
│   └── ui/                   # Radix/shadcn primitives and animated UI pieces.
├── hooks/
│   ├── factories/            # defineQuery/defineInfiniteQuery and the GraphQL execute helper.
│   ├── queries/              # One file per domain entity (skills, projects, etc.).
│   └── reactive/             # Small client hooks (useMessages, useDebounce).
├── graphql/                  # Generated typed documents (do not edit by hand).
├── forms/                    # Contact form + shared form types.
├── i18n/                     # next-intl routing, request config, navigation helpers.
├── lib/                      # SEO, dehydrate, CDN URLs, pagination, cn, tc.
├── classes/query.ts          # In-memory filter/search/sort helper over arrays.
├── stores/theme.ts           # Zustand theme-preference store.
├── contexts/theme.tsx        # ThemeProvider applying the preference to the DOM.
├── consts/urls.tsx           # URL kind to icon mapping.
└── styles/globals.css        # Tailwind v4 entry and design tokens.
```

## Requirements

Tools to install on your machine.

- Node.js 20
- npm

## Getting started

1. Install tooling (Node, npm, git, curl):

```bash
bash setup.sh
```

2. Install dependencies:

```bash
npm install
```

3. Create the local env file from the example and set your API URL and token:

```bash
cp .env.example .env.development
```

4. Start the GraphQL API the site reads from (lives in the sibling `profile-info` repo):

```bash
npm run back
```

5. Run the dev server (also runs GraphQL codegen in watch mode):

```bash
npm run dev
```

## Building for production

The site is a **static export**: `next build` writes a fully static `out/`
directory that GitHub Pages serves as-is (no Node server at runtime).

```bash
npm run build   # next build --turbopack → static export into out/
npm run serve   # serve -s out -l 4000 → preview the export at http://localhost:4000
```

Notes:

- The build prefetches data from the GraphQL API. If the API is **not**
  reachable, the build still succeeds (TanStack's `prefetchQuery` swallows the
  error and the sections render empty) — so a clean build does not by itself
  prove the data layer works, but it is enough to verify SEO.
- SEO metadata does **not** depend on the API. It is produced by `generateSEO`
  (`src/lib/seo.ts`) from the i18n messages and the OG images in `public/`, so
  it is baked into the HTML at build time regardless of API availability.
- The build reads `.env.production`. Codegen is **not** run by `build` (the
  generated `src/graphql` is committed), so the build does not need the schema.

## Verifying the build and SEO

The export writes one HTML file per locale/route. After `npm run build`:

```bash
find out -maxdepth 2 -name '*.html'
# out/en.html  out/pt.html  out/en/skills.html  out/pt/skills.html  ...
```

Each file's `<head>` carries the SEO metadata. Quick checks (run from the repo
root after building):

```bash
# Title (translated per locale) and description
grep -oE '<title[^>]*>[^<]+' out/en.html
grep -oE '<meta name="description"[^>]*>' out/en.html

# Canonical + per-locale hreflang alternates
grep -E 'rel="(canonical|alternate)"' out/en.html

# Open Graph + Twitter card
grep -E 'property="og:|name="twitter:' out/en.html

# <html lang> is set per locale
grep -oE 'lang="[a-z]+"' out/pt.html | head -1
```

What a correct build looks like:

- A non-empty, locale-specific `<title>` per page — e.g. `/en` →
  "Full-stack Software Engineer", `/pt` → "Engenheiro de Software Full-stack",
  `/en/skills` → "Skills", `/pt/skills` → "Habilidades".
- `<link rel="canonical">` pointing at the page's own URL, plus
  `<link rel="alternate" hreflang="…">` for **every** locale.
- `og:title` / `og:description` / `og:url` / `og:image` (1200×630) and
  `twitter:card=summary_large_image`.
- `<html lang="en">` / `<html lang="pt">` on the respective pages.

The `og:image` resolves to `public/images/og/<namespace>-<locale>.png` when that
file exists, otherwise it falls back to `default-<locale>.png`. Today only the
`default-*` images exist, so all pages use the fallback — drop in
`homepage-<locale>.png` / `skillspage-<locale>.png` to give a page a custom card.

For a richer look, paste a page URL into a preview tool (e.g. opengraph.xyz or
the LinkedIn Post Inspector) after deploy, or just open `out/<locale>.html` and
read the `<head>`.

## Automated SEO + content test

`tests/seo.test.ts` (Vitest + cheerio) automates the checks above so a
regression can't reach production. It parses the emitted HTML, so run it
**after a build**:

```bash
npm run build
npm run test   # vitest run — use npm run test:watch while iterating
```

It is parameterized per route (`describe.each`), so each route × assertion is a
separate pass/fail line. For each generated route it asserts:

- **SEO `<head>`**: a non-empty `<title>`, a meta `description`, a `canonical`
  matching the route's own URL, a `hreflang` alternate for every locale, the
  four `og:*` tags, a `twitter:card`, and the correct `<html lang>`.
- **Server-rendered content (the important part for a data-driven static site)**:
  it fails if any page is stuck in a loading state (`data-state="loading"`) or if
  an expected query (e.g. `findManySkills`) is **absent from the dehydrated React
  Query state** embedded in the HTML. That absence is exactly what happens when
  the build can't reach the GraphQL API — the prefetch is dropped and the body
  ships as an empty shell. The test turns that silent failure into a hard error.
  The skills route additionally asserts the grid rendered real `<li>` rows. (A
  query that succeeded but returned 0 rows still passes — the check proves the
  prefetch happened, not that the dataset is non-empty.)

This is why it works: with the App Router static export, the client components
are server-rendered at build time and read from the cache hydrated by each
route's server `page.tsx`, so the real data (and the serialized query cache) is
baked into the HTML — a crawler sees content, not a blank SPA. The test simply
proves that contract held for this build.

The step runs in CI (`.github/workflows/nextjs.yml`) right after the build and
before the Pages upload, so a build that loses its SEO or its data **fails the
job and never deploys**. If you ever need richer, JS-executing checks (layout,
visual, interactions), Playwright would be the next step up.
