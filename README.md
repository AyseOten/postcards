# Postcards

Your travel world in one place: where you've been, where you lived, where you want to go, and your trips as digital postcards.

**Live demo:** [add your Vercel link]
**Status:** v0.1 in progress
**Instagram:** [@postcards.fromworld](https://www.instagram.com/postcards.fromworld)

<!-- Add a screenshot or GIF here: ![Postcards](docs/screenshot.png) -->

## The problem

Travelers want a fun way to see where they have been and where they want to go, and to share it. Most travel-map apps ask you to sign up first and stop at coloring a map, so people use them once and forget them.

## What v0.1 does

- Mark countries on a world map as **visited**, **lived** or **want to go**
- Add a first visit year and a short note to each country
- Fun travel stats: countries, continents, most visited continent, first trip
- A digital passport: a stamp for every country and collections to complete
- A 1080×1350 card ready for Instagram
- No sign-up: data stays in your browser

## What I left out on purpose

v0.1 tests one question: **do people enjoy building their map and come back to complete collections?** Everything else waits until that is answered.

| Postponed | Phase | Reason |
| --- | --- | --- |
| Sign-in, sync, trips, postcards with photos | v0.2 | Ask for an account only after the user has seen the value |
| Day plans, "on this day" memories, yearly recap | v0.3 | Retention features need real usage data first |
| Mobile app | v0.4 | The architecture is ready for it; the web proves the idea first |
| Community and following | v0.5 | Needs accounts and enough public content |

The full plan is in [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Architecture in short

- **Monorepo**: Next.js web app now, Expo mobile app later, shared TypeScript packages for domain logic, data access, design tokens and translations.
- **Repository pattern**: v0.1 stores data locally; v0.2 switches to Supabase without changing the UI.
- **Supabase** from v0.2: PostgreSQL with Row Level Security, Auth, Storage, Edge Functions.

## How I built it

I build Postcards with an AI-native, spec-driven workflow, the same way I work in my day job:

1. **Spec first.** [`SPEC.md`](SPEC.md) defines the problem, scope, out of scope and acceptance criteria for the current phase.
2. **Rules for the agent.** [`CLAUDE.md`](CLAUDE.md) gives the AI coding agent the architecture rules, commands and way of working (plan first, small PRs, tests before done).
3. **Build with Claude Code.** For each spec section, the agent proposes a plan, I review and correct it, then it implements the code and tests.
4. **Review and verify.** I review every diff, CI runs lint, tests and build, and I check the app on mobile before merging.

Real examples of this process are in [`docs/ai-workflow.md`](docs/ai-workflow.md).

<!-- Add 1–2 real examples here after you build. -->

## Tech stack

Next.js · TypeScript · pnpm + Turborepo · d3-geo · Jest · GitHub Actions · Vercel · Supabase (v0.2) · Expo (v0.4)

## Run locally

```bash
pnpm install
pnpm dev
```
