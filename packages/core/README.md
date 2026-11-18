# @postcards/core

Pure TypeScript domain logic shared by web, mobile and server: types, country reference data and (soon) map geometry and business rules. No React, Next.js, browser or Node APIs; an ESLint rule enforces this for `src/`.

## Country data

| File | What it is |
| --- | --- |
| `src/countries/data.generated.ts` | Raw data from the sources below. Generated; do not edit by hand. |
| `src/countries/world.ts` | Which codes are countries, and which count toward "percentage of the world". |
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

- **Countries (197):** the 193 UN members, the 2 observer states (VA, PS), Kosovo (XK) and Taiwan (TW). All can be marked; they count for country totals, stamps and collections.
- **World percentage:** only the 195 UN members and observers count (`countsTowardWorldTotal`, `getWorldPercent`). Kosovo and Taiwan do not.
- **Territories** (Greenland, Puerto Rico, …) are in the raw data but are not countries; how the map treats them is decided with the map geometry.
- **Display name:** the override in `names.ts`, otherwise the first source name. All other source names are kept as `aliases` for search.
- **Continent:** the decision in `continent-overrides.ts`, otherwise the primary continent in `countries-list`. Tests fail if a country spanning two continents has no explicit decision.
- **Codes:** ISO 3166-1 alpha-2 everywhere. XK is a user-assigned code; its numeric code `983` is user-assigned too.

### Regenerating

```bash
pnpm --filter @postcards/core generate:countries
```

After updating either source package: regenerate, run `pnpm test`, and review the diff of `data.generated.ts`. The tests check that every country is still present, names and continents are set, and overrides still differ from the source.
