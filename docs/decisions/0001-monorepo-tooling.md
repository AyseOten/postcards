# 0001 – Monorepo tooling

- **Status:** accepted
- **Date:** 2026-11-18

## Context

Web (now) and mobile (v0.4) share domain logic, data access, design tokens and strings (`ARCHITECTURE.md` §3). The tooling has to keep shared packages simple and enforce the architecture rules in `CLAUDE.md`.

## Decision

| Area | Choice | Notes |
| --- | --- | --- |
| Package manager | pnpm 12 (`packageManager` field) | Strict `node_modules` catches undeclared dependencies. Build scripts allowed only for `@swc/core` and `@parcel/watcher` (`allowBuilds` in `pnpm-workspace.yaml`). |
| Task runner | Turborepo | `lint` (ESLint + `tsc --noEmit`), `test`, `build` with caching. |
| Shared packages | TypeScript source, no build step | `exports` points to `src/index.ts`; Next.js compiles them via `transpilePackages`. Expo's Metro can do the same in v0.4. |
| TypeScript | 6.0, `strict` + `noUncheckedIndexedAccess` | TypeScript 7 is not yet supported by typescript-eslint (`<6.1.0`). |
| Lint | ESLint 9 flat config, typescript-eslint `strict`, `eslint-config-next` in `apps/web` | ESLint 10 is not yet supported by `eslint-plugin-react` (used by `eslint-config-next`). |
| Tests | Jest 30; `@swc/jest` in packages, `next/jest` in the web app; React Testing Library | SWC only transpiles, so tests do not depend on the TypeScript compiler API. Types are checked by `tsc`. |

`packages/core` must not import React, Next.js, React Native or Node built-ins, or use browser/Node globals. An ESLint rule in `eslint.config.mjs` enforces this, and its tsconfig has no DOM or Node types.

## Consequences

- Upgrade TypeScript to 7 and ESLint to 10 once typescript-eslint and `eslint-config-next` support them.
- If a shared package ever needs a build step (e.g. for publishing), add a `build` script; Turborepo already runs `^build` first.
