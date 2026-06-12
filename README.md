# yagrrusso

Personal portfolio site for Yago Russo. A statically exported Next.js app deployed
to GitHub Pages, localized in English and Portuguese, that renders profile content
(skills, projects, experience, education, courses) fetched from a GraphQL API at
build time.

## Tech stack

- **Next.js 16 (App Router, static export)**: `src/app`, `next.config.ts`. Builds to `out/` via `output: "export"`.
- **React 19**: components under `src/components` and client pages in `src/app/[locale]`.
- **TypeScript (strict)**: entire `src/` tree. Path alias `@/*` maps to `src/*`.
- **next-intl**: `src/i18n`, `messages/en.json`, `messages/pt.json`. Drives the `[locale]` routes and SEO metadata.
- **TanStack Query**: `src/hooks`. Server prefetch + client hydration via `HydrationBoundary`.
- **GraphQL Code Generator (client preset)**: `codegen.ts`, `src/graphql/`. Typed operations from the API schema.
- **Tailwind CSS v4**: `src/styles/globals.css`. Utilities merged through `cn()` in `src/lib/utils.ts`.
- **Radix UI + shadcn/ui**: `src/components/ui` (new-york style, Phosphor icons).
- **Biome + Ultracite**: `biome.jsonc`, lint and format via `npm run fix` / `npm run check`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout: favicon metadata only.
│   ├── page.tsx              # Client redirect to /en or /pt by browser language.
│   └── [locale]/             # Locale-scoped routes (en, pt).
│       ├── layout.tsx        # Server layout: fonts, intl provider, analytics.
│       ├── layout-client.tsx # Client shell: header, footer, QueryClient, theme.
│       ├── page.tsx          # Home: server prefetch for all home queries.
│       ├── page-client.tsx   # Home section composition root.
│       ├── queries.ts        # HOME_*_VARS prefetch constants.
│       ├── _components/      # Route-local cards, chrome, sections/.
│       └── skills/           # Skills listing route.
├── components/               # Domain-agnostic reusable components.
│   └── ui/                   # shadcn/Radix/Magic UI primitives.
├── hooks/
│   ├── factories/            # defineQuery, defineInfiniteQuery, execute.
│   ├── queries/              # One GraphQL module per entity.
│   └── reactive/             # useDebounce, useMessages.
├── graphql/                  # Generated (do not edit).
├── forms/                    # Contact form + Zod schema.
├── i18n/                     # next-intl routing, request, navigation.
├── lib/                      # SEO, dehydrate, cdn, pagination, utils.
├── classes/query.ts          # Client-side array filter/sort helper.
├── stores/theme.ts           # Zustand theme preference.
├── contexts/theme.tsx        # DOM theme application.
├── consts/                   # Static icon/slug/network mappings.
└── styles/globals.css        # Tailwind v4 entry and design tokens.
```

## AI context

This repo ships machine-readable documentation for AI coding assistants (`AGENTS.md`
and the `agents/` folder). You do not need to maintain it by hand: those files
describe how the project works and instruct assistants to update the context
in-session when they learn something worth keeping. If you use Cursor, thin routers
in `.cursor/rules/` (local, gitignored) point the IDE at these files; other tools
use their own local adapter the same way. Start from `AGENTS.md` if you want an
overview.

## Requirements

- Node.js 20
- npm >= 11

## Getting started

1. Install tooling (idempotent, installs only what is missing):

```bash
bash scripts/setup.sh
```

2. Install dependencies:

```bash
npm install
```

3. Create the local env file:

```bash
cp .env.example .env.development
```

4. Start the GraphQL API (sibling `profile-info` repo):

```bash
npm run back
```

5. Run the dev server (GraphQL codegen in watch mode plus Next.js):

```bash
npm run dev
```

## Build and test

```bash
npm run build    # static export to out/
npm run serve    # preview out/ on port 4000
npm run test     # Vitest (requires a prior build for the SEO smoke test)
```

CI (`.github/workflows/nextjs.yml`) on push to `main`: wakes the hosted API,
builds with secrets, runs tests, and deploys `out/` to GitHub Pages.
