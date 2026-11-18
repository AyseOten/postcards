# @postcards/core

Pure TypeScript domain logic shared by web, mobile and server: types, country reference data and (soon) map geometry and business rules. No React, Next.js, browser or Node APIs; an ESLint rule enforces this for `src/`.

## Country data

| File | What it is |
| --- | --- |
| `src/countries/data.generated.ts` | Raw data from the sources below. Generated; do not edit by hand. |
| `src/countries/world.ts` | Which codes are countries or special regions, and the world-percentage rule. |
| `src/countries/extra-countries.ts` | Countries the sources do not have (XN), maintained by hand. |
| `src/countries/names.ts` | Display names that differ from the source. |
| `src/countries/continent-overrides.ts` | The single continent of each country that spans two, plus corrections. |
| `src/countries/regions.ts` | Curated regions for passport collections, each with its basis. |
| `src/countries/index.ts` | Public API: `listCountries`, `getCountry`, `getCountriesByContinent`, … |

### Sources and licenses

| Data | Source | Version | License |
| --- | --- | --- | --- |
| Continents (7, codes `AF AN AS EU NA OC SA`) | [`countries-list`](https://github.com/annexare/Countries) | 3.4.1 | MIT |
| Turkish and English names, ISO 3166-1 numeric codes | [`i18n-iso-countries`](https://github.com/michaelwittig/node-i18n-iso-countries) | 7.14.0 | MIT |
| UN member and observer states | [United Nations: Member States](https://www.un.org/en/about-us/member-states), [Non-member States](https://www.un.org/en/about-us/non-member-states) | checked 2026-11-18 | Public information, list maintained by hand in `world.ts` |

Both packages are dev dependencies: they are only read by the generator, so the app does not ship them.

### Rules

- **Countries (198):** the 193 UN members, the 2 observer states (VA, PS), Taiwan (TW), Kosovo (XK) and Northern Cyprus (XN). All can be marked and count for country totals, stamps, collections and the world percentage (ADR 0005).
- **World percentage:** the number of distinct countries out of 198 (`WORLD_COUNTRY_TOTAL`, `getWorldPercent`).
- **Special region:** Antarctica (AQ) can be marked. It counts toward continents and the all-continents collection, but not as a country (`kind: 'special-region'`, `listMarkable()`).
- **Territories** (Greenland, Puerto Rico, …) are in the raw data but cannot be marked in v0.1; the map draws them grey.
- **Display name:** the override in `names.ts`, otherwise the first source name. All other source names are kept as `aliases` for search.
- **Continent:** the decision in `continent-overrides.ts`, otherwise the primary continent in `countries-list`. Tests fail if a country spanning two continents has no explicit decision.
- **Codes:** ISO 3166-1 alpha-2 everywhere, plus two user-assigned X codes: XK (Kosovo, numeric `983`, also user-assigned) and XN (Northern Cyprus, no numeric code).

### Regenerating

```bash
pnpm --filter @postcards/core generate:countries
```

After updating either source package: regenerate, run `pnpm test`, and review the diff of `data.generated.ts`. The tests check that every country is still present, names and continents are set, and overrides still differ from the source.
