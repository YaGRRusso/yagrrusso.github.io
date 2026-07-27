# Agent context

> AI agents: read `agents/` for full project context. This file is a router only.

## What this repo is

Personal portfolio site for Yago Russo. A statically exported Next.js app deployed to
Cloudflare (Workers static assets), localized in English and Portuguese, with profile
content fetched from a GraphQL API at build time.

## Where to find context

- **Repo-wide:** `agents/overview.md` (start here)

## Human onboarding

`README.md`.

## Maintaining documentation

Update `agents/*.md`. Follow **Maintaining project documentation** in
`agents/overview.md`. Change this router only when agent files are added or renamed.
Cursor users: keep local `.cursor/rules/` routers in sync when paths or globs change
(`.cursor/` is gitignored).
