/**
 * Rules for UI apps (apps/web now, apps/mobile in v0.4). Import into the app's eslint.config.mjs.
 *
 * Markable places: the UI uses only getMarkable / listMarkable / getMarkableByContinent.
 * getCountry, listCountries and getCountriesByContinent return countries only and would leave
 * out Antarctica, which can be marked (ADR 0005, CLAUDE.md).
 */
const MARKABLE_ONLY =
  'UI uses getMarkable / listMarkable / getMarkableByContinent for markable places (CLAUDE.md, ADR 0005).';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@postcards/core',
              importNames: ['getCountry', 'listCountries', 'getCountriesByContinent'],
              message: MARKABLE_ONLY,
            },
          ],
        },
      ],
    },
  },
];
