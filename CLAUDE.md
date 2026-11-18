# CLAUDE.md: Postcards

Context for AI coding agents working in this repo. Read this, `ARCHITECTURE.md` and `SPEC.md` before writing code.

## Project
Postcards is a personal travel world: visited countries, a wishlist and travel memories as digital postcards. Web first (Next.js), mobile later (Expo), one Supabase backend. Build only what the current `SPEC.md` describes.

## Stack
- Monorepo: pnpm workspaces + Turborepo
- `apps/web`: Next.js (App Router), TypeScript strict
- `packages/core`: pure TypeScript domain logic, country data, map geometry (d3-geo)
- `packages/data`: repository interfaces and implementations
- `packages/tokens`: design tokens; `packages/i18n`: TR and EN strings
- Tests: Jest (+ React Testing Library in apps)
- Backend from v0.2: Supabase (Postgres, Auth, Storage, Edge Functions)

## Commands
- `pnpm dev` – run the web app
- `pnpm lint` – lint all packages (must pass)
- `pnpm test` – run all tests (must pass)
- `pnpm build` – build all packages (must pass before a PR)

## Architecture rules
- `packages/core` must not import React, Next.js, browser or Node APIs. It has to run on web, mobile and server.
- The UI never accesses storage or Supabase directly; it goes through repositories in `packages/data`.
- Country identity is always the ISO 3166-1 alpha-2 code. Never match countries by name.
- The UI uses only `getMarkable` / `listMarkable` (and `getMarkableByContinent`) for markable places, never `getCountry` directly; country-only functions leave out Antarctica (ADR 0005). Enforced by `eslint.ui-rules.mjs`.
- Colors, spacing and fonts come from `packages/tokens`; no hard-coded values in components.
- All user-facing text comes from `packages/i18n` (Turkish default, English second).
- Every Supabase table has Row Level Security policies. Secrets only in environment variables.
- A new dependency needs a one-line reason in the PR description.
- Significant decisions get a short record in `docs/decisions/`.

## How to work
1. Before coding, write a short plan listing the files you will change. Wait for approval.
2. One spec section per branch and PR; keep PRs small.
3. Write or update tests for every change in `packages/core` and `packages/data`.
4. Run lint, tests and build before saying a task is done.
5. If the spec is unclear, ask instead of guessing.
