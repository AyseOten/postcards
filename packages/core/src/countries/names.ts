import type { CountryCode } from '../types';

export type NameLocale = 'tr' | 'en';

/**
 * Display names that differ from the first name in i18n-iso-countries.
 * Rule: use the short, common name people search for; the official or older forms
 * remain available as aliases.
 */
export const DISPLAY_NAME_OVERRIDES: Readonly<
  Record<CountryCode, Partial<Record<NameLocale, string>>>
> = {
  // Turkish: current or official short names (source has older or abbreviated forms).
  BY: { tr: 'Belarus' }, // source: "Beyaz Rusya"
  CD: { tr: 'Kongo Demokratik Cumhuriyeti', en: 'DR Congo' }, // "Kongo - Kinşasa"
  CG: { tr: 'Kongo Cumhuriyeti' }, // "Kongo - Brazavil"
  CV: { tr: 'Yeşil Burun Adaları' }, // "Cape Verde"
  CZ: { tr: 'Çekya', en: 'Czechia' }, // "Çek Cumhuriyeti", "Czech Republic"
  MM: { tr: 'Myanmar' }, // "Myanmar (Burma)"
  PS: { tr: 'Filistin', en: 'Palestine' }, // "Filistin Bölgeleri", "State of Palestine"
  SZ: { tr: 'Esvatini' }, // "Svaziland" (renamed in 2018)
  TL: { tr: 'Doğu Timor' }, // "Timor-Leste"
  US: { tr: 'Amerika Birleşik Devletleri', en: 'United States' }, // "ABD", "United States of America"

  // English: short forms instead of official or "Name, Republic of" forms.
  BN: { en: 'Brunei' },
  CI: { en: "Côte d'Ivoire" }, // source first form has no accent
  CN: { en: 'China' },
  FM: { en: 'Micronesia' },
  GM: { en: 'Gambia' },
  IR: { en: 'Iran' },
  LA: { en: 'Laos' },
  MD: { en: 'Moldova' },
  MK: { en: 'North Macedonia' },
  RU: { en: 'Russia' },
  SY: { en: 'Syria' },
  TW: { en: 'Taiwan' },
  TZ: { en: 'Tanzania' },
  VA: { en: 'Vatican City' },
};
