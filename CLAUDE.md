# CLAUDE.md: yagrrusso

> Context for AI agents working in this codebase. Keep it accurate; an agent will
> trust it.

## Maintaining this file

This is a living document. If you are an AI agent working in this repo and you
learn something worth knowing next time, update this file in the same session.
Things worth recording: a non-obvious architecture or wiring detail, a stated
user preference, a useful command, a gotcha, or a new folder, resource, or module
that isn't mapped here yet. Record only what a future session would be glad to
find already written down. Do not add generic or obvious facts, do not restate
what the code makes plain, and do not duplicate what's already here. Keep edits
small and put them in the section they belong to.

## Overview

This is the personal portfolio website of Yago Russo (a software engineer). It is
a Next.js 16 App Router app that is statically exported (`output: "export"`) and
deployed to GitHub Pages by the `nextjs.yml` workflow. The site is localized in
English and Portuguese. Its content (skills, projects, experiences, educations)
comes from a separate GraphQL API (the sibling `profile-info` repo), fetched and
prefetched at build time and hydrated on the client. There is no test suite in
this repo.

The site has two routes: the home page (`/[locale]`) and a skills page
(`/[locale]/skills`).

## Architecture & flow

Routing and locale:

- `src/app/page.tsx` and `src/app/layout.tsx` are the bare root. The real tree is
  under `src/app/[locale]`.
- `src/i18n/routing.ts` defines `locales: ["en", "pt"]` and `defaultLocale: "en"`.
  `generateStaticParams` in each page exports both locales, so export produces
  `/en` and `/pt`.
- `src/app/[locale]/layout.tsx` validates the locale with `hasLocale`, calls
  `setRequestLocale`, loads Google fonts (JetBrains Mono, Space Grotesk), injects
  the Umami analytics script, and wraps children in `NextIntlClientProvider` and
  `ClientLayout`. The `<html>` element is hardcoded to `className="dark ..."`.
- `next.config.ts` wraps the config with `createNextIntlPlugin("./src/i18n/request.ts")`.
  `src/i18n/request.ts` resolves the active locale and dynamically imports
  `messages/${locale}.json`.

Data flow (the important part):

1. A server page (for example `src/app/[locale]/page.tsx`) creates a `QueryClient`,
   awaits `prefetchFindMany*` calls, then renders `<HydrationBoundary state={dehydrate(queryClient)}>`
   wrapping the client page.
2. `prefetch*` and `use*` for each entity are produced by `defineQuery` /
   `defineInfiniteQuery` in `src/hooks/factories/query.ts`. These factories return
   `{ key, options, prefetch, use }` so the same query definition is reused for
   both server prefetch and client `useQuery`.
3. The actual network call is `execute` in `src/hooks/factories/execute.ts`. It
   POSTs the typed GraphQL document and variables to `NEXT_PUBLIC_API_URL` with a
   `Bearer ${NEXT_PUBLIC_API_TOKEN}` header. It throws if `NEXT_PUBLIC_API_URL`
   is unset.
4. `src/lib/dehydrate.ts` wraps TanStack's `dehydrate` and calls
   `queryClient.invalidateQueries()` first, so the client always refetches to get
   fresh data rather than trusting the build-time snapshot. This is deliberate:
   the static export is built once but the data behind it changes.
5. On the client, `ClientLayout` (`src/app/[locale]/layout-client.tsx`) provides a
   second `QueryClient` (configured with `staleTime` 10 min, `retry` 5, retryDelay
   30s, `refetchOnWindowFocus: false`) inside `QueryClientProvider`, plus the
   `ThemeProvider`. The client pages call the matching `use*` hooks and read from
   the hydrated cache.

Theme:

- `src/stores/theme.ts` is a persisted Zustand store holding `theme: "light" | "dark" | "system"` under the localStorage key `preference`.
- `src/contexts/theme.tsx` reads that preference in a `useLayoutEffect` and toggles the `dark` class on `document.documentElement`, exposing the resolved theme via `useTheme()`.

SEO:

- `src/lib/seo.ts` `generateSEO({ namespace, locale, path })` builds Next `Metadata`
  from the i18n `title`/`description` of the given namespace. It resolves OG images
  from `public/images/og/<namespace>-<locale>.png`, falling back to
  `default-<locale>.png` if the file does not exist (checked with `fs.existsSync`).
  Base URL is hardcoded to `https://yagrrusso.github.io`.

## Core technologies and where they live

- **Next.js 16, App Router, static export**: `src/app`, `next.config.ts`. `output: "export"`, `images.unoptimized: true`. A build-time env `NEXT_PUBLIC_BUILD_DATE` is injected via `next.config.ts` and rendered in the footer.
- **React 19**: function components throughout. React 19 idioms expected (ref as a prop, no `forwardRef`).
- **TypeScript**: `tsconfig.json`, `strict` and `strictNullChecks` on, `@/*` -> `src/*`. The `@0no-co/graphqlsp` TS plugin type-checks inline GraphQL against `schema.graphql`.
- **next-intl**: `src/i18n/*`, `messages/*.json`. Namespaces used so far: `layout`, `common`, `homePage`, `skillsPage`, `form.*`, `urls`. `Namespace` type in `routing.ts` is restricted to message keys that have both `title` and `description` (those are the SEO-able pages).
- **TanStack Query v5**: `src/hooks/factories/query.ts`, `src/hooks/queries/*`. Server prefetch + client hydration pattern (see flow above).
- **GraphQL Code Generator**: `codegen.ts`, output in `src/graphql` (client preset, `documentMode: "string"`) and the schema mirrored to `schema.graphql`. Documents are read from `src/hooks/queries/*.ts` and `src/hooks/mutations/*.ts`. `src/graphql` is generated; do not hand-edit `graphql.ts`, `gql.ts`, `fragment-masking.ts`.
- **Tailwind CSS v4**: `src/styles/globals.css`, `@tailwindcss/postcss` in `postcss.config.mjs`. shadcn config in `components.json` (new-york style, base color neutral, CSS variables, Phosphor icons). `tw-animate-css` for animations.
- **Radix UI / shadcn/ui**: `src/components/ui`. Extra animated components pulled from the `@magicui` and `@kibo-ui` registries declared in `components.json`.
- **Zustand v5**: `src/stores/theme.ts` with `persist` middleware.
- **TanStack Form + Zod v4 + validator**: `src/forms/contact.tsx`. Schema-validated on change and submit.
- **Biome v2 + Ultracite**: `biome.jsonc` extends `ultracite/biome/{core,next,react,remix}`.

## Module / directory breakdown

- `src/app/[locale]`: the two routes. Each route is split into a server `page.tsx` (prefetch + hydrate + `generateMetadata` + `generateStaticParams`) and a `"use client"` `page-client.tsx`. The home `page-client.tsx` is a thin **composition root**: it just orders the section components (with `<Separator />` between them) and holds no data hooks itself. `layout-client.tsx` is the shared chrome (header with logo and `LayoutMenu`, footer with build date, toaster, scroll progress).
- `src/app/[locale]/_components`: route-local components for the `[locale]` segment — the domain entity cards (`project-card`, `experience-card`, `education-card`, `course-card`), `status-badge` (maps `EducationStatus`/`CourseStatus` to a `Badge`, shared by the education/course cards), `skills-marquee` (the home skills marquee), and the site chrome consumed by `layout-client.tsx` (`layout-menu`, `layout-loading`). These are domain/route specific and deliberately NOT in `src/components`. `src/app/[locale]/skills/_components` exists for skills-route-local components by the same convention.
- `src/app/[locale]/_components/sections`: one self-contained component per home section (`hero`, `skills-marquee`, `about`, `portfolio`, `skills`, `experience`, `education`, `courses`, `contact`). Each section owns its own `useFindManyX` hook (reading from the cache hydrated by `page.tsx`), its own i18n, and any section-specific hardcoded values (the contact `mailto`, the about-page ages/`32` projects, social links). Add a new home section by creating a file here and mounting it in `page-client.tsx`.
- `src/app/[locale]/queries.ts`: the home page's **prefetch contract**, co-located with `page.tsx` because the page owns it. Holds the `HOME_*_VARS` query-variable constants imported by BOTH `page.tsx` (server `prefetch*`) and the section hooks (client `use*`, via `../../queries`) — they must stay identical or hydration silently breaks, so this single source of truth is intentional. It is a plain module (not imported FROM `page.tsx`'s exports) precisely so client sections can import it without pulling the server route module into the client bundle. If a new section fetches, add its vars here and a matching `prefetch*` call in `page.tsx`.
- `src/components` (top level, no `ui/`): only dumb, domain-agnostic, reusable pieces — `animate-on-scroll`, `counter`, `section-title`, `title-link`, `social-links`, `page-title`, `skill-card`, plus `skill-avatar` (`SkillAvatar`, the skill icon `Avatar`) and `skill-badge` (`SkillBadge`, the outline badge + avatar + name) which replaced the badge/avatar markup that was duplicated across the entity cards, the marquee, and the skills grid. `SkillAvatar`/`SkillBadge` take only `{ name, slug }` — `simpleIconsCdn` is their only coupling.
- `src/hooks/factories`: the reusable query plumbing. `query.ts` exposes `defineQuery` and `defineInfiniteQuery`. `execute.ts` is the single fetch entry point to the GraphQL API.
- `src/hooks/queries`: one module per entity (`skills`, `projects`, `experiences`, `courses`, `educations`, `organizations`, `auth`) plus `external.ts`. NOTE: the API split the old combined education endpoint into two — `findManyCourses` (certificates/courses, has `hours`, no `level`/`period` on the entity) and `findManyEducations` (academic degrees, has `level` + `period`). The landing page has two distinct sections: "Education" (degrees, `educations.ts` + `EducationCard`, anchor `#my-education`) and "Courses" (`courses.ts` + `CourseCard`, anchor `#my-courses`), rendered in that order between Experience and the skills marquee. `EducationCard` renders the `level` via the `common.level.<ENUM>` messages (keys match `EducationLevel`: HIGH_SCHOOL, TECHNICAL, BACHELOR, POSTGRAD, MASTER, DOCTORATE — distinct from the unrelated `common.grade` map). Each declares a `graphql(...)` document and exports `prefetchX` / `useX` (and sometimes the infinite variants) built from the factories. `external.ts` is different: it calls the public `github-contributions-api.jogruber.de` REST API directly with a plain `useQuery`, not the GraphQL `execute`.
- `src/hooks/reactive`: `use-messages.ts` returns a selector that picks the entry matching the current locale from an `i18n` array (the API returns localized content as `{ locale, messages }[]`); `use-debounce.ts` is a generic debounce hook.
- `src/graphql`: generated. `index.ts` re-exports `gql` and `fragment-masking`. `graphql.ts` holds `TypedDocumentString` and all generated types/enums (for example `SortEnum`).
- `src/forms`: `contact.tsx` (TanStack Form, `contactSchema` via Zod, phone validated with `validator.isMobilePhone`). On submit the home page opens a `mailto:` link rather than POSTing anywhere. `common.d.ts` defines `CommonFormProps`.
- `src/lib`: `seo.ts` (metadata), `dehydrate.ts` (invalidate-then-dehydrate), `cdn.ts` (`simpleIconsCdn`, `googleFaviconCdn` URL builders), `pagination.ts` (`getPagination` math), `utils.ts` (`cn`), `tc.ts` (try/catch wrapper returning `undefined` on error).
- `src/classes/query.ts`: `QueryHelper<T>`, a chainable in-memory `filter`/`query`/`sort`/`exec` over arrays, backed by lodash. Used for client-side filtering of already-fetched lists.
- `src/i18n`: `routing.ts` (locale config, `Locale`/`Messages`/`Namespace` types, the `locales` array with display names and flag emoji), `request.ts` (server message loading), `navigation.ts` (locale-aware `Link`, `redirect`, `useRouter`, `usePathname` from `createNavigation`).
- `messages/`: `en.json`, `pt.json`. The shape of `en.json` is the source of truth for the `Messages` type.
- `public/`: favicons (light/dark SVG pairs), `flags/`, `images/og/` social cards, portrait and sticker images.

## The patterns to follow when extending

Adding a new data-backed entity:

1. Create `src/hooks/queries/<entity>.ts`. Declare the document with `graphql(\`...\`)` imported from `@/graphql`.
2. Build the hooks with `defineQuery<TQuery, TVariables>("<key>", async (params) => execute(doc, params ?? {}).then(d => d.data!))`. Export the `prefetch` and `use` it returns under descriptive names (`prefetchFindManyX`, `useFindManyX`). Use `defineInfiniteQuery` when the list paginates; supply `getNextPageParam` keyed off page length vs `limit` (see `skills.ts`).
3. Run `npm run dev` (or codegen) so types regenerate into `src/graphql` before you reference `TQuery`/`TVariables`.
4. To render on a page: in the server `page.tsx` create a `QueryClient`, `await prefetchFindManyX(queryClient, vars)`, wrap the client page in `<HydrationBoundary state={dehydrate(queryClient)}>`. In `page-client.tsx` call `useFindManyX(vars)` with the SAME variables so the cache key matches and hydration is used.

Adding a new page/route:

- Create `src/app/[locale]/<route>/page.tsx` with `generateStaticParams` (map `routing.locales`), `generateMetadata` calling `generateSEO`, and a default server component that prefetches and hydrates. Put the UI in a sibling `"use client"` `page-client.tsx`.
- If the page should have its own SEO namespace, add a key with `title` and `description` to both `messages/en.json` and `messages/pt.json`; that key then becomes a valid `Namespace`.

Adding a UI primitive:

- shadcn components go in `src/components/ui` (new-york style, Phosphor icons). Compound components are exported as an object namespace (for example `Request.Root`, `Carousel.Content`, `ContributionGraph.Block`); follow that shape rather than exporting many flat names.
- Component placement follows a domain rule: `src/components` holds only **dumb, domain-agnostic** components reusable across routes (for example `AnimateOnScroll`, `Counter`, `SectionTitle`, `TitleLink`, `SocialLink`, `PageTitle`, `SkillAvatar`, `SkillBadge`, `SkillCard`). Anything tied to a route's content/domain (entity cards, status maps, site chrome, page-specific blocks) lives in that route's `_components` folder instead — see below.

## Conventions & standards

- Formatting/linting: Biome via Ultracite. `biome.jsonc` extends the ultracite presets and turns several rules off (notably `noExplicitAny`, `noConsole`, `noArrayIndexKey`, `noNonNullAssertion`, `useNamingConvention`, `noMagicNumbers`). `out`, `.next`, `node_modules`, and `*.graphql` are excluded. Import organizing is on. Run `npm run fix` (write) or `npm run check` (verify). `AGENTS.md` and `.github/copilot-instructions.md` describe the intended code style.
- Editor: `.vscode/settings.json` sets Biome as the formatter for JS/TS/JSON/CSS/etc., format on save, tab size 2, ruler at 120.
- Types: TS `strict` + `strictNullChecks`. `any` is allowed by lint config but avoid it where a real type exists; the `!` non-null assertion is used on `data!` after GraphQL fetches.
- Architecture style: layered by responsibility (app routes, hooks as the data layer, lib as utilities, components as the view). No domain/clean-architecture folders.
- Naming: files and folders are kebab-case (for example `layout-client.tsx`, `use-messages.ts`). React components are PascalCase. Query hooks follow `prefetchFindManyX` / `useFindManyX`.
- Commits: Husky `pre-commit` runs `npx lint-staged`, which runs `npx ultracite fix` on staged JS/TS/JSON/CSS/MD files. No commit-message convention is enforced.
- Testing: none in this repo.

## Directory map

```
.
├── next.config.ts            # Next config: static export, unoptimized images, build-date env, next-intl plugin.
├── codegen.ts                # GraphQL codegen: schema from NEXT_PUBLIC_API_URL, client preset -> src/graphql.
├── biome.jsonc               # Biome/Ultracite lint + format config.
├── components.json           # shadcn/ui config (new-york, phosphor, magicui/kibo-ui registries).
├── tsconfig.json             # strict TS, @/* alias, next + graphqlsp plugins.
├── schema.graphql            # Mirrored GraphQL schema (generated by codegen).
├── messages/                 # next-intl message catalogs.
│   ├── en.json               # Source of truth for the Messages type.
│   └── pt.json
├── public/                   # Static assets: favicons, flags, OG images, portrait, sticker.
├── .github/
│   ├── workflows/nextjs.yml  # CI: wake API, build, export, deploy to GitHub Pages.
│   └── copilot-instructions.md
├── .husky/pre-commit         # Runs npx lint-staged.
├── AGENTS.md                 # Ultracite code-standards reference.
└── src/                      # See "Module / directory breakdown" above.
```

## Environment variables

All are build-time and client-exposed (`NEXT_PUBLIC_` prefix). Declared in
`.env.example`; codegen reads `.env.development` (loaded via dotenv in `codegen.ts`).

- `NEXT_PUBLIC_API_URL` (required): the GraphQL endpoint. Read by `src/hooks/factories/execute.ts` (every data fetch) and by `codegen.ts` (as the schema source). `execute` throws if it is missing. Example value `http://localhost:8080/graphql`.
- `NEXT_PUBLIC_API_TOKEN` (required for authenticated queries): sent as `Bearer` in the `Authorization` header by `execute`. Example placeholder `000`.
- `NEXT_PUBLIC_BUILD_DATE` (auto): set by `next.config.ts` to the build timestamp, rendered in the footer. Not something you set by hand.

CI provides `API_URL` and `API_TOKEN` as GitHub secrets, mapped to the `NEXT_PUBLIC_*`
names during the build step in `nextjs.yml`.

## Scripts / commands

- `npm run dev`: runs `graphql-codegen --watch` and `next dev --turbopack` together. Codegen needs `NEXT_PUBLIC_API_URL` reachable to introspect the schema.
- `npm run build`: `next build --turbopack`. With `output: "export"` this writes the static site to `out/`.
- `npm start`: `next start` (a normal Next server; note the deploy path uses the static export, not this).
- `npm run serve`: `serve -s out -l 4000`, serves the exported `out/` locally on port 4000.
- `npm run check`: `ultracite check`, lint/format verification.
- `npm run fix`: `ultracite fix`, auto-fix and format.
- `npm run setup`: `bash setup.sh`, installs base tooling.
- `npm run back`: `cd ../profile-info && npm run api:dev`, starts the sibling GraphQL API this site reads from.
- `npm run prepare`: `husky || true`, installs git hooks.

## Gotchas & notes

- The site is a STATIC export deployed to GitHub Pages. `npm start` exists but is not the production path; the CI builds `out/` and uploads it as a Pages artifact.
- `dehydrate` deliberately invalidates queries before dehydrating so the client refetches live data. Do not "optimize" this away: the build-time snapshot would otherwise go stale.
- `npm run dev` will fail or stall in codegen if the GraphQL API is not running and reachable at `NEXT_PUBLIC_API_URL`. Start the API first (`npm run back`, which expects a sibling `profile-info` repo).
- `.env.development` is gitignored (only `*.example` is committed). Copy `.env.example` to `.env.development` locally.
- `src/graphql/*` is generated by codegen. Edit the GraphQL documents in `src/hooks/queries` (and `schema`), not the generated files.
- `src/app/[locale]/layout.tsx` hardcodes the `dark` class on `<html>`; the runtime light/dark toggle is then applied by `ThemeProvider` on `document.documentElement`.
- The contact form does not call any backend; it composes a `mailto:` link to `yagrrusso@gmail.com` (see `handleSendMail` in the home `page-client.tsx`).
- `.husky/pre-commit` runs `npx lint-staged`; the rest of that file is a large commented-out manual stash/format routine, kept for reference but inactive.
- The home `page-client.tsx` has several hardcoded personal values (birth date `2001-11-30` for age, career start `2020-01-01`, `32` projects completed). Update these in code, not from the API.
- `external.ts` depends on the third-party `github-contributions-api.jogruber.de` service for the contribution graph; it is outside the GraphQL API and can fail independently.
