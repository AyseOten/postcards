# 0005 – Cyprus, de facto states and the world percentage

- **Status:** accepted
- **Date:** 2026-11-18
- **Amends:** [ADR 0002](0002-country-data-source.md)

## Context

ADR 0002 used the 195 UN members and observers as the world-percentage denominator. Kosovo (XK) and Taiwan (TW) were markable but outside the percentage.

Three questions were still open:

- **Cyprus.** `world-atlas` draws the island as two shapes: Cyprus (CY, the south) and a "N. Cyprus" shape with no code. The source Turkish name for CY is "Güney Kıbrıs Rum Kesimi".
- **Somaliland.** It also has a shape without a code.
- **Antarctica.** It is one of the seven continents but has no country, so "every continent" could not be completed.

Postcards is Turkish first (SPEC.md §3). Many of its users travel to Northern Cyprus.

## Decision

1. **Cyprus is two countries.**
   - **CY:** "Güney Kıbrıs Rum Kesimi" / "Cyprus" (source names), drawn with the southern shape.
   - **XN:** "Kuzey Kıbrıs Türk Cumhuriyeti" / "Northern Cyprus", drawn with the "N. Cyprus" shape. Search also finds it as "KKTC", "Kuzey Kıbrıs" and "TRNC".
   - Both are in Europe and in the Mediterranean collection.
2. **XN is a user-assigned code.** Northern Cyprus has no ISO 3166-1 code. ISO never assigns codes in the `XA`–`XZ` range, so `XN` cannot clash with a future official code. It follows the same practice as `XK` for Kosovo. The rule "a country is always identified by a two-letter code" still holds.
3. **Every markable country counts toward the world percentage.** The denominator is **198**: 193 UN members, 2 observers (VA, PS), and TW, XK and XN.
   - Reason: once Northern Cyprus counts, leaving out Kosovo and Taiwan would be inconsistent; both are recognized more widely. One rule is easier to explain to users and to keep correct: "if you can mark it as a country, it counts."
   - `WORLD_COUNTRY_TOTAL` is derived from the list, so it cannot drift.
4. **Palestine** stays in the list and counts (unchanged from ADR 0002).
5. **Somaliland is part of Somalia (SO).** Its shape is drawn as Somalia.
   - Reason: Northern Cyprus is separate for product reasons (Türkiye recognizes it, and Turkish users travel there often), and neither applies to Somaliland.
   - New de facto states are not added by default; each needs its own decision.
6. **Antarctica (AQ) is a markable special region.** It counts toward continents visited and the all-continents collection, so 7/7 is reachable. It does not count toward country totals, stamps for countries, or the world percentage.

## Also decided: the open points from PR #4 (2026-11-18)

| Topic | Decision |
| --- | --- |
| Countries on two continents | One continent each, as in `continent-overrides.ts` (RU Europe, TR Asia, TL Asia) |
| Balkans | 9 countries: AL BA BG GR HR ME MK RS XK |
| Scandinavia | Becomes **"İskandinavya ve Kuzey"** (id `nordic`): DK FI IS NO SE |
| Mediterranean, Southeast Asia, South America | Unchanged; XN added to the Mediterranean |
| Territories with their own shape (GL, PR, NC, FK, TF) | Drawn grey, not markable, labelled with the country they belong to. A markable "territories" concept is noted for v0.2 (ARCHITECTURE.md). |
| Western Sahara (EH) | Grey, not markable |
| 30 small countries without a shape at 110m (MT, SG, BH, VA, XK, …) | Shown as small dots on the map; also addable from search and lists |

The map-related items are implemented in the map-geometry PR (SPEC.md §4, item 5). That PR adds an explicit, tested table for the three `world-atlas` shapes without an id: "N. Cyprus" → XN, "Somaliland" → SO, "Kosovo" → XK. It is a fixed mapping for that one dataset, not name matching of user input.

## Consequences

- The world percentage is out of 198 (SPEC.md §5.4 updated). Earlier copies of the rule (ADR 0002, `packages/core/README.md`) now point here.
- `Country.kind` distinguishes `country` from `special-region`. `listCountries()` returns the 198 countries, and `listMarkable()` returns them plus AQ.
- Adding another de facto state later means one entry in `world.ts` and, if the sources lack it, one in `extra-countries.ts`. The tests then check names, continent and the new denominator.
