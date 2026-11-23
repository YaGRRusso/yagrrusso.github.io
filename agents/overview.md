# yagrrusso

> Context for AI agents working in this codebase. Keep it accurate; an agent will trust it.

## Maintaining project documentation

When you learn something relevant and specific (a non-obvious architecture detail,
a user preference, a useful command, or a pitfall), **proactively update project
docs in the same session**. Be selective: only record what would be valuable in a
future session. Do not note generic or obvious things, do not restate what the code
already makes plain, and do not duplicate content across files.

**Where to update:**

- Repo-wide → `agents/overview.md`
- Human onboarding → `README.md` (when setup/run changes; keep the brief AI context
  section accurate)
- `AGENTS.md` → only when agent files are added or renamed
- Local IDE adapter (Cursor: `.cursor/rules/*.mdc`, gitignored) → when router paths or globs change

Keep edits small and section-local. Update `agents/overview.md` and `README.md`
when setup, run, or extension changes. Agent files go deeper; README stays concise.

## Overview

Personal portfolio site for Yago Russo. Static Next.js 16 app deployed to
Cloudflare Workers static assets via `wrangler.jsonc` (`assets.directory`: `./out`).
Profile content is fetched from an external GraphQL API at **build time** and
embedded into static HTML via server prefetch and React Query dehydration.
Localized in English and Portuguese through `next-intl`.

The GraphQL API lives in the sibling `../profile-info` repo. Local dev starts it
with `npm run back`. Production CI wakes the hosted API before building (see
`.github/workflows/nextjs.yml`).

There is no Node server at runtime. `next.config.ts` sets `output: "export"`, so
`npm run build` writes static files to `out/`. Deploy with `npm run deploy`
(`wrangler deploy`) after building.

## Architecture & flow

### Build-time data flow

1. **Codegen** (`codegen.ts`): introspects schema from `NEXT_PUBLIC_API_URL` (via
   `.env.development`) with `X-Api-Key` header and generates typed documents into
   `src/graphql/`. Also writes `schema.graphql` for the `@0no-co/graphqlsp`
   TypeScript plugin.
2. **Query modules** (`src/hooks/queries/*.ts`): GraphQL operations with the
   `graphql()` tag, wrapped by `defineQuery` from
   `src/hooks/factories/query.ts`, exporting `prefetch*` and `use*` pairs.
   Select only fields the UI reads.
3. **Execute** (`src/hooks/factories/execute.ts`): POSTs to `NEXT_PUBLIC_API_URL`
   with `X-Api-Key` from `NEXT_PUBLIC_API_KEY`.
4. **Server pages** (`src/app/[locale]/**/page.tsx`): create a `QueryClient`, call
   prefetch functions, wrap the client page in `HydrationBoundary` with state from
   `dehydrate()` in `src/lib/dehydrate.ts`.
5. **Dehydrate quirk** (`src/lib/dehydrate.ts`): calls
   `queryClient.invalidateQueries()` after prefetch so the client refetches on
   hydration instead of treating prefetched data as fresh forever.
6. **Client pages** (`page-client.tsx`): compose sections; `use*` hooks read the
   hydrated cache first, then refetch.

### Routing and i18n

- Root `src/app/page.tsx` redirects to `/{locale}/` via meta refresh and
  `window.location.replace` (static-export safe). Preview the site at `/en/` or
  `/pt/`; `/` only redirects.
- All pages live under `src/app/[locale]/`. `generateStaticParams` emits both
  locales for static export.
- `src/i18n/routing.ts` defines locales and the `Namespace` type (message keys
  with `title` and `description`, used by SEO).
- `src/i18n/request.ts` loads `messages/{locale}.json` per request.
- `src/i18n/navigation.ts` exports locale-aware `Link`, `redirect`, `useRouter`.
  Use these instead of Next.js navigation directly.
- `src/lib/seo.ts` builds per-page metadata from translation namespaces and OG
  images in `public/images/og/`.
- `src/app/sitemap.ts` and `src/app/robots.ts` emit crawl files into the static
  export. Home pages include a static JSON-LD `Person` script.

### Layout composition

- `src/app/layout.tsx`: favicon metadata only.
- `src/app/[locale]/layout.tsx`: server layout. Fonts (JetBrains Mono, Space
  Grotesk), Umami analytics, `NextIntlClientProvider`, `ClientLayout`.
- `src/app/[locale]/layout-client.tsx`: client shell with header, footer, scroll
  progress, toast (`sonner`), `QueryClientProvider` (via `getQueryClient()` in
  `src/lib/get-query-client.ts` — one client per SSR request, singleton in the
  browser), `ThemeProvider`. Header height is `--layout-header-height` in
  `src/styles/base.css`: `max(10vh, 64px)` mobile, `max(8vh, 56px)` from `sm`
  (640px) up. Header menu (`layout-menu.tsx`): hamburger below `3xl` (1440px)
  with section links; theme/locale controls move into that menu only below `sm`.
  At `3xl+`, a fixed left rail (`layout-sidebar.tsx`) lists `HOME_SECTIONS`.
  Custom breakpoint `--breakpoint-3xl` is in `src/styles/tailwind/configs.css`.

### Theme

- `next-themes` with `attribute="class"`: its inline script sets the `dark` class
  before the first paint, so there is no theme flash. Read and set the theme with
  its `useTheme()`.

### Images

- Every image has `alt=""`: its name is the visible text next to it, or the
  `aria-label` of the control around it.

### Client-side-only data

- `src/hooks/queries/external.ts`: GitHub contribution data from a third-party
  REST API. Uses TanStack Query directly, not the `defineQuery` factory.

## Core technologies and where they live

- **Next.js 16 (App Router, static export)**: `next.config.ts`, `src/app/`.
  Turbopack in dev and build. Images unoptimized (required for static export).
- **React 19**: Server Components for page shells; `"use client"` for interactive UI.
- **TypeScript (strict)**: `tsconfig.json`, path alias `@/*` to `src/*`.
- **next-intl 4**: `src/i18n/`, `messages/`. Plugin wired in `next.config.ts`.
- **TanStack Query 5**: prefetch/dehydrate in page files; defaults in
  `layout-client.tsx` (10 min stale time, 5 retries, 30s delay).
- **GraphQL Code Generator (client preset)**: `codegen.ts`, `src/graphql/`. Do not
  edit generated files. Biome excludes `src/graphql/`.
- **@0no-co/graphqlsp**: TypeScript plugin, schema at `./schema.graphql`.
- **Tailwind CSS v4**: `src/styles/globals.css` (entry), `postcss.config.mjs`. Structure:
  `tailwind/configs.css` (official shadcn token bridge), `tailwind/animations.css`,
  `tailwind/utilities.css`, `theme/` (palette values + per-theme bridges), `base.css`.
  tweakcn exports → `theme/default.css`. Status tokens → `theme/status.css`. Fonts →
  `src/lib/fonts.ts` (swap families); `theme/fonts.css` locks `--font-*` last.
  Extra palettes → `theme/index.css`.
- **shadcn/ui (new-york) + Radix UI**: `src/components/ui/`, `components.json`.
  Use Tailwind `font-sans` / `font-mono` / `font-serif`.
  Magic UI and Kibo UI registries for animated components.
- **Zustand**: small client stores in `src/stores/`.
- **next-themes**: light, dark and system theme.
- **TanStack Form + Zod + validator**: contact form in `src/forms/contact.tsx`.
- **Biome + Ultracite**: `biome.jsonc`. Pre-commit runs lint-staged (Ultracite on staged files).
  SVG assets under `public/` are ignored — Biome attribute sorting can break XML
  declarations (`version` must be first).
- **Vitest + cheerio**: `tests/seo.test.ts`, post-build smoke test on `out/`.

## Module / directory breakdown

### `scripts/`

- `setup.sh`: idempotent Ubuntu/WSL bootstrap for Node 20 and npm 11.
### `.cursor/rules/` (local, gitignored)

Optional thin Cursor routers (`overview.mdc` with `alwaysApply`) that instruct the
IDE to read `AGENTS.md` and `agents/overview.md`. Not shared in git.

### `src/app/[locale]/`

Each route follows the same split:

- `page.tsx`: server component, metadata, prefetch, `HydrationBoundary`.
- `page-client.tsx`: client composition root.
- `queries.ts` (where present): typed variable constants for prefetch.

**Home** (`page-client.tsx`): Hero, SkillsMarquee (from `getMe.skills`), About,
Experience, Portfolio, Skills, Education, Courses, Network, SkillsMarquee
(repeat), Contact.

**Skills** (`skills/`): paginated listing via `defineQuery` in
`hooks/queries/skills.ts` (`found` + `nodes`; client page controls `skip`/`limit`).

**`_components/`**: route-local UI (entity cards, layout chrome, `sections/`).

### `src/components/avatar/` and `src/components/three/`

3D avatar (react-three-fiber, lazy-loaded with `next/dynamic`), shared across pages.
`avatar-config.ts` holds primitive registries keyed by id (`MODEL_ASSETS`,
`ANIMATION_ASSETS`, `HDRI_ASSETS`, ids = file names), `SCENES` composing one
model, one HDRI, its animations, a camera and its head/torso look settings, and
`getSnapshotPath(sceneId)` (one snapshot per scene, `snapshots/[scene].webp`).
`PortfolioAvatar` and `AvatarPoster` take a required `sceneId`; a scene loads only
its own clips. Each scene picks its `idle` from `ANIMATION_ASSETS`; it loads in the
same suspend step as the model (no T-pose), other clips load in the background.
Clips are requested through the avatar store (`playClip` interrupts,
`playClipWhenIdle` only plays from the idle) and fade back to the idle when done.
`PortfolioAvatar` triggers them with a greeting when its clip loads, from user
clicks (a random variation per body part, from the clicked vertex's skin weights)
and from random idle breaks while on screen. An error
boundary in the hero keeps the poster if the 3D fails.
The head follows the pointer; before the first mouse move or touch it aims at the
scene's `restGaze`.
Animations embedded in model files are ignored, so static and animated models work
the same and a model file can be swapped without config changes. Every clip file
holds exactly one clip, and every track must target a node of the model: both are
asserted on load, so a bad clip fails loudly (the hero keeps the poster) instead of
T-posing. The config mirrors `public/` (`models/`, `animations/`,
`hdri/`, `snapshots/`); uncompressed originals use the same layout under
`public/_dev/originals/`. `public/_dev/` is development-only: `public/.assetsignore`
excludes it from the Cloudflare upload.
`three/` and `src/hooks/three/` hold generic pieces. Workflow:
`docs/3d-avatar.md`.

### `src/components/`

Domain-agnostic reusable components. Must stay free of portfolio entity logic.
Examples: `counter`, `section-title`, `social-links`, `skill-badge`,
`skill-badge-list`, `skill-icon`.

- `SkillItem` (`skill-badge.tsx`): `{ id, slug?, title }`. `slug` is optional
  (GraphQL `SkillEntity.slug` is nullable).
- `SkillBadgeList`: renders badges only (no layout wrapper; parents own flex/gap
  containers). Shows up to `MAX_VISIBLE` badges, then a toggle to expand or
  collapse. Pass `slug ?? id` into `SkillBadge` / `SkillIcon` so icon cache keys
  and fallbacks stay stable when `slug` is missing.
- `SkillIcon`: resolves icons by slug (Simple Icons, AWS, overrides). Empty or
  unknown slug uses a package fallback icon. Cache key is the normalized slug
  string passed in (callers should pass `slug ?? id`).

### `src/hooks/factories/`

- `query.ts`: `defineQuery` factory.
- `execute.ts`: typed GraphQL fetch wrapper (`X-Api-Key` auth).

### `src/hooks/queries/`

One file per used backend entity: `auth`, `skills`, `projects`, `experiences`,
`educations`, `courses`, plus `external.ts` for GitHub REST. Organizations are
nested under courses/educations/experiences — there is no standalone organizations
query. `codegen.ts` watches `src/hooks/mutations/*.ts`, but no mutation files exist yet.

### `src/lib/`

- `dehydrate.ts`: prefetch invalidation wrapper.
- `seo.ts`: metadata from i18n namespaces.
- `cdn.ts`: Simple Icons and Google favicon URL builders.
- `pagination.ts` (`paginationInput`, `getPagination`), `query-vars.ts` (`filterInput` — omits `undefined`, `null`, `""`), `tc.ts`, `utils.ts` (`cn()`).

## The patterns to follow when extending

### Adding a GraphQL query

1. Add the operation in `src/hooks/queries/` using the `graphql()` tag.
2. Run codegen (`npm run dev` watches, or `graphql-codegen --config codegen.ts`).
3. Wrap with `defineQuery`, export `prefetch*` and `use*`. Request only fields
   consumers read (including nested org/skill shapes).
4. Prefetch in the route's `page.tsx`; consume via `use*` in client components.
5. Keep the hook result as the query name (e.g. `getMe`). Read payload via
   `getMe.data?.getMe` — do not alias `data` into a shorter variable (`user`,
   `projects`, etc.). Pages with many queries need `isLoading`, `isFetching`,
   `refetch`, etc. on each hook without name clashes.

### Adding a localized page

1. Create `src/app/[locale]/<route>/page.tsx`, `page-client.tsx`, optionally
   `queries.ts`.
2. Add `generateStaticParams` returning locales from `routing.locales`.
3. Call `generateSEO` with a namespace that has `title` and `description` in both
   `messages/en.json` and `messages/pt.json`.
4. Add OG images at `public/images/og/<namespace>-<locale>.png` or use the
   `default-<locale>.png` fallback.
5. Extend `ROUTES` in `tests/seo.test.ts` for smoke-test coverage.

### Adding a home section

1. Create a component in `src/app/[locale]/_components/sections/`.
2. Place it in `page-client.tsx`.
3. If it needs server data, add prefetch to `page.tsx` and vars to `queries.ts`.
4. Keep `SectionTitle` (the hash `id`) outside `AnimateOnScroll`. Same-page
   `#` links use a native `<a>` via `TitleLink` / `SectionTitle` — not
   next-intl `Link`.
5. Section nav lists live in `src/consts/home-sections.ts`
   (`HOME_SECTIONS` for the header menu, `HOME_HERO_SECTIONS` for hero chips).

### Shared vs route-local components

Entity-specific cards stay in `_components/`. Generic reusables go in
`src/components/`.

## Conventions & standards

- Formatting and linting: Ultracite (Biome) via `biome.jsonc`. Run `npm run fix`
  before committing (`npx ultracite fix` / `npx ultracite check`). Generated GraphQL
  output excluded from lint.
- TypeScript: strict mode. Prefer `unknown` over `any`; use type narrowing over
  assertions. GraphQL types from codegen; `@0no-co/graphqlsp` for editor validation.
- React: function components only; hooks at top level with correct dependency
  arrays; locale navigation through `@/i18n/navigation`. Use semantic HTML and
  ARIA (labels, heading hierarchy, alt text, keyboard handlers). Do not define
  components inside other components. React 19: use `ref` as a prop instead of
  `forwardRef`.
- Async: `await` promises in async functions; prefer async/await over promise chains;
  handle errors with meaningful try/catch.
- Security: `rel="noopener"` on `target="_blank"` links; avoid `dangerouslySetInnerHTML`.
- Performance: prefer specific imports over barrel files; use Next.js patterns
  appropriate for static export (unoptimized images are required here).
- Testing: Vitest defaults. Assertions inside `it()` / `test()`; no `.only` or
  `.skip` in committed code. SEO test requires prior `npm run build`.
- Commits: Husky `pre-commit` runs `npx lint-staged` (Ultracite). Older stash-based
  formatter block in `.husky/pre-commit` is commented out.
- Code artifacts (names, comments, files) are written in English.

## Directory map

```
.
├── wrangler.jsonc              # Cloudflare Workers static assets (./out).
├── codegen.ts                  # GraphQL Code Generator config.
├── next.config.ts              # Static export, next-intl plugin, build date env.
├── biome.jsonc                 # Ultracite/Biome config.
├── components.json             # shadcn/ui CLI config.
├── schema.graphql              # Generated schema snapshot for graphqlsp.
├── scripts/
│   └── setup.sh                # Ubuntu/WSL bootstrap (Node 20, npm 11).
├── messages/                   # en.json, pt.json translations.
├── public/images/og/           # Per-page Open Graph images.
├── src/                        # Application source (see README tree).
└── tests/seo.test.ts           # Post-build SEO and hydration smoke test.
```

## Environment variables

All `NEXT_PUBLIC_*` vars are embedded at build time (no server-side secrets at
runtime). App code reads them only through `env` in `src/lib/env.ts`
(`@t3-oss/env-nextjs` + Zod), imported by `next.config.ts` so a missing or invalid
var fails `next dev` / `next build` at startup.

Public site origin is `NEXT_PUBLIC_SITE_URL`. Embedded into static HTML at
**build time**. Production: `https://yagorusso.com`. Local: `http://localhost:3000`.

- `NEXT_PUBLIC_SITE_URL` (required): Public site origin, no trailing slash.
- `NEXT_PUBLIC_API_URL` (required): GraphQL endpoint. Local:
  `http://localhost:8080/graphql`. Production: `https://api.yagorusso.com/graphql`.
- `NEXT_PUBLIC_API_KEY` (required): API token for the GraphQL API. Sent as
  `X-Api-Key: pi_<id>_<secret>`. Read by `execute.ts`, `codegen.ts`, and CI.
  Requires `QUERY` permission for read-only portfolio queries. Declared in
  `.env.example`, which defaults to the fixed `joao` QUERY seed token
  (`SEED_API_TOKENS` in `profile-info/apps/api/seed/constants.ts`). Other seed
  tokens are printed to the console after `npm run seed`. Profile owner is
  resolved via `getMe` (token owner).
- `NEXT_PUBLIC_DEBUG` (optional, boolean): `true` enables debug tools. Shows the
  leva panel (mounted in
  `layout-client.tsx`) and, on the hero avatar (`src/components/avatar/`),
  orbit controls plus gaze/pivot markers. Off when unset. Frame by dragging,
  click `log camera` and paste into the scene's `camera` in `SCENES`; tune the look sliders,
  click `log look` and paste into the scene's `look` in `SCENES` (head and torso).
- `NEXT_PUBLIC_DISABLE_3D` (optional, boolean): `true` renders only the hero
  avatar poster; `PortfolioAvatar` is not rendered, so its lazy 3D chunk is never
  downloaded. Off when unset.
- `NEXT_PUBLIC_BUILD_DATE` (automatic): ISO timestamp from `next.config.ts`. Shown
  in the footer "updated at" line. Not in the `env` schema: `next.config.ts` sets it,
  so it doesn't exist yet when the config validates.

Local: `.env.development` (copy from `.env.example`). Production build reads
`.env.production` or CI env. CI repository variables: `API_URL` (GraphQL
endpoint), `API_KEY`, `SITE_URL` (production site origin).

## Scripts / commands

- `npm run setup`: runs `bash scripts/setup.sh`.
- `npm run dev`: GraphQL codegen watch + `next dev --turbopack`.
- `npm run build`: `next build --turbopack`, static export to `out/`.
- `npm run serve`: serves `out/` on port 4000 (no SPA fallback — static HTML
  per route).
- `npm run preview`: `build` then `serve`. Use it to judge performance; dev mode
  on :3000 adds React dev instrumentation and is much slower.
- `npm run deploy`: `wrangler deploy` (upload `./out` per `wrangler.jsonc`).
- `npm run back`: `cd ../profile-info && npm run api:dev`.
- `npm run check` / `npm run fix`: Ultracite check/fix.
- `npm run test`: `vitest run` (requires prior build for SEO test).
- `npm run test:watch`: Vitest watch mode.
- `npm run prepare`: Husky git hooks.

## Build, deploy, and tests

Static export: `npm run build` writes `out/`. Preview with `npm run serve`.

CI (`.github/workflows/nextjs.yml`) on push to `main`: wake hosted API, `npm ci`,
build with secrets, run `npm run test`. Does not deploy — production hosting is
Cloudflare via `wrangler.jsonc` / `npm run deploy`. Node 24 in CI.

`wrangler.jsonc`: assets-only Worker, `./out`, `force-trailing-slash` (matches
`trailingSlash: true` in `next.config.ts`), `404-page` for missing routes.

`tests/seo.test.ts` parses built HTML from `out/`. Throws at import if `out/` is
missing. Per route (`describe.each`): title, meta description, canonical and
hreflang, Open Graph and Twitter tags, `<html lang>`, no stuck loading states,
expected dehydrated query keys. On `/skills`, asserts each grid `li` has a
non-empty `id` and text (skills use `skill.id` for the DOM id, not slug).

Workflow: `npm run build` then `npm run test`.

No unit tests yet: the SEO smoke test is the only suite.

## Gotchas & notes

- Edit `agents/*.md` for all context changes. `.cursor/` is gitignored: Cursor users
  maintain thin local routers; other devs do the same for their IDE if needed.
- API must be reachable at build time. CI wakes the hosted API; locally run
  `npm run back` before building or when codegen needs a fresh schema.
- Codegen reads `.env.development` and sends `X-Api-Key` during introspection.
  `codegen.ts` and `tests/seo.test.ts` run outside Next.js, so they keep reading
  `process.env` with `getOrThrow()` instead of the `env` schema (`codegen.ts` loads
  dotenv after imports run; Vitest doesn't load `.env` files).
- Read queries require an API token with `QUERY` permission. Session-only
  operations (`dashboard`, AI mutations, API token management) reject API tokens.
  `getMe` works with API tokens and returns the token owner profile.
- `SkillEntity` no longer has `name` or `relevance`. Use `i18n { locale messages
  { title } }` and resolve with `useMessages()`. `category` is a free-form
  `String` (no `SkillCategory` enum). `slug` is optional (`string | null`). Prefer
  `title ?? slug ?? id` for display labels, and `slug ?? id` for icon lookup or
  DOM/cache keys. Do not coerce missing slugs to `""`. `SortSkillInput` accepts
  only `createdAt`, `slug`, `updatedAt`.
- `ExperienceEntity` is one role per record (no nested `roles` array). Title and
  description live on `i18n`; date range on `period`; skills on `skills` /
  `skillIds` at the experience root. Home uses `findManyGroupedExperiences`
  (paginates by organization group; each node has `organization` + `experiences`).
  Do not filter out missing `organization` — `mapOrganization` falls back to
  `"Unknown"`.
- Do not edit `src/graphql/`. Regenerate after query changes.
- `dehydrate()` invalidates on purpose. Client refetches after hydration.
- `npm run back` assumes `profile-info` is a sibling directory. Hardcoded in
  `package.json`.
- Node 24 is the CI target; `scripts/setup.sh` still bootstraps Node 20+ locally.
- SEO test fails without `out/`. Build first.
- OG images optional per namespace. Falls back to `default-{locale}.png`.
- Root redirect uses `navigator.language`. Static export still generates
  `/en` and `/pt` entry HTML.
- Umami analytics loaded from `cloud.umami.is` in locale layout (website ID
  hardcoded in `layout.tsx`).
