import type { RawCountry } from './raw';

/**
 * Countries that are not in the source datasets, maintained by hand (ADR 0005).
 * Same shape as data.generated.ts, so they go through the same rules and tests.
 */
export const EXTRA_COUNTRIES: readonly RawCountry[] = [
  {
    code: 'XN',
    // No numeric code: the world-atlas shape ("N. Cyprus") has no id; the map maps it explicitly.
    en: ['Northern Cyprus', 'Turkish Republic of Northern Cyprus', 'TRNC'],
    tr: ['Kuzey Kıbrıs Türk Cumhuriyeti', 'KKTC', 'Kuzey Kıbrıs'],
    continents: ['EU'],
  },
];
