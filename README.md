# yagrrusso

Personal portfolio site for Yago Russo. A statically exported Next.js app deployed
to Cloudflare (Workers static assets), localized in English and Portuguese, that
renders profile content (skills, projects, experience, education, courses) fetched
from a GraphQL API at build time.

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
│   ├── page.tsx              # Root redirect to /en/ or /pt/ (static-export safe).
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

- Node.js 20+ (CI uses Node 24)
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

3. Create the local env file and set credentials:

```bash
cp .env.example .env.development
```

Set `NEXT_PUBLIC_API_KEY` to a dev token (`pi_<id>_<secret>`). After seeding
`profile-info`, tokens are printed to the console. The profile owner is resolved
via the `getMe` query (no separate user ID env var).

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

CI (`.github/workflows/nextjs.yml`) on push to `main`: wakes the hosted API with
`X-Api-Key`, builds with repository variables, and runs tests. It does not deploy.

Deploy locally (or from your Cloudflare pipeline) after a successful build:

```bash
npm run build
npm run deploy   # wrangler deploy — serves ./out via wrangler.jsonc
```

Requires Cloudflare auth (`npx wrangler login` or an API token).

## Environment variables

All of these are **build-time** (`NEXT_PUBLIC_*`). They are baked into the static
export. Cloudflare does not need them as Worker secrets — only the machine that
runs `npm run build` (local or CI) does.

| Variable | CI repository variable | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `API_URL` | Yes | GraphQL endpoint used at build to prefetch profile data into static HTML. |
| `NEXT_PUBLIC_API_KEY` | `API_KEY` | Yes | API token (`X-Api-Key`) for that GraphQL request during build/codegen. |
| `NEXT_PUBLIC_SITE_URL` | `SITE_URL` | Yes | Public site origin (no trailing slash). Used by sitemap, robots.txt, and SEO metadata. Example: `https://yago.example.com`. |
| `NEXT_PUBLIC_AVATAR_DEBUG` | `AVATAR_DEBUG` | No | `true` shows the leva tuning panel and orbit controls on the hero 3D avatar. Off when unset. |
| `NEXT_PUBLIC_BUILD_DATE` | — | No | Set automatically in `next.config.ts`. |

Local: copy `.env.example` to `.env.development` (and `.env.production` for local
production builds). GitHub Actions: set `API_URL`, `API_KEY`, and `SITE_URL` under
**Settings → Secrets and variables → Actions → Variables**.
