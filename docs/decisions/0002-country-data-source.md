# 0002 – Country reference data

- **Status:** accepted, amended by [ADR 0005](0005-cyprus-and-de-facto-states.md)
- **Date:** 2026-11-18

## Context

Postcards needs, for each country, an ISO alpha-2 code, Turkish and English names, a continent and region membership (SPEC.md §4). It also needs a fixed denominator for "percentage of the world" (195). The data must be MIT-compatible: `world-countries` was rejected because it is ODbL (share-alike on the database).

## Decision

- **Sources:** `countries-list` (MIT) for continents; `i18n-iso-countries` (MIT) for TR/EN names and ISO numeric codes. A generator script writes a static `data.generated.ts`; the packages are dev dependencies only.
- **Hand-maintained decisions** live next to the generated file, each with a reason: display names (`names.ts`), one continent per country (`continent-overrides.ts`), regions (`regions.ts`), and the UN list (`world.ts`).
- **What is a country:** ~~193 UN members + Holy See + Palestine = 195 for the world percentage; Kosovo (XK) and Taiwan (TW) markable but outside the percentage.~~ **Amended by ADR 0005:** 198 countries (the 195 plus TW, XK and Northern Cyprus XN), and all of them count toward the world percentage. Antarctica (AQ) is a markable special region. The rule is defined once in `world.ts` and tested.
- **One continent per country.** Stats and the all-continents collection use a single continent. Countries that span two continents get an explicit decision (rule: where the capital and most of the population are).

## Consequences

- Updating a source is a reviewed diff of `data.generated.ts`; tests catch missing countries or undecided multi-continent countries.
- ~~No markable country is in Antarctica, so "every continent" (7) cannot be completed with countries alone.~~ Resolved by ADR 0005: Antarctica is a markable special region.
- If the product later wants Türkiye to count for both Europe and Asia, `continent` becomes a list; only `continent-overrides.ts` and the stats rules change.
