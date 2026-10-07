<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ShipScore: agent rules

ShipScore shows DORA metrics and security posture for a public GitHub repo.
Stack: Next.js App Router, TypeScript strict, Tailwind, pnpm, Vitest, zod. Hosted on Vercel.

## Architecture

- `src/app/`: routes and UI only. Server components by default; add `"use client"` only for interactivity.
- `src/lib/`: domain logic, pure TypeScript, no React imports.
- `src/lib/github/`: the only place that calls the GitHub API. No `fetch` in components.
- Validate every external input (API responses, query params, forms) with zod.
- Record architecture decisions as ADRs in `docs/adr/NNN-title.md`.

## Rules

- Every new function in `src/lib/` gets a Vitest test next to it (`*.test.ts`).
- No new dependency without a one-line reason in the PR description.
- Never read, create, print or commit `.env*` files, tokens or keys. Use `.env.example` for names only.
- Keep PRs small: one concern each.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `ci:`.
- Never add `Co-authored-by` or `Generated with` lines for Claude or any other AI agent to commits or PR descriptions. A hook and CI reject them.
- `*.md` files are git-ignored by default. Only allow-listed files (currently `AGENTS.md`) are tracked; add new ones to `.gitignore` explicitly.

## Environments

- Development: local `pnpm dev`, variables from `vercel env pull .env.local`.
- Staging: the `staging` branch on Vercel.
- Production: the `main` branch on Vercel.
- Flow: feature branch → PR (preview URL) → `staging` → PR to `main` → production.

## Definition of done

`pnpm lint && pnpm format:check && pnpm typecheck && pnpm test && pnpm build` all pass.
