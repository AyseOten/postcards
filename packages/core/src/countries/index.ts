import type { CountryCode } from '../types';
import { CONTINENT_DECISIONS } from './continent-overrides';
import type { Continent } from './continents';
import { RAW_COUNTRIES } from './data.generated';
import { EXTRA_COUNTRIES } from './extra-countries';
import { DISPLAY_NAME_OVERRIDES, type NameLocale } from './names';
import type { RawCountry } from './raw';
import { countsTowardWorldTotal, isCountry, isMarkable } from './world';

export { CONTINENTS, isContinent, type Continent } from './continents';
export { CONTINENT_DECISIONS } from './continent-overrides';
export { DISPLAY_NAME_OVERRIDES, type NameLocale } from './names';
export { REGION_IDS, REGIONS, type Region, type RegionId } from './regions';
export {
  COUNTRY_CODES,
  countsTowardWorldTotal,
  getWorldPercent,
  isCountry,
  isMarkable,
  isSpecialRegion,
  MARKABLE_CODES,
  OTHER_COUNTRY_CODES,
  SPECIAL_REGION_CODES,
  UN_MEMBER_CODES,
  UN_OBSERVER_CODES,
  WORLD_COUNTRY_TOTAL,
} from './world';

/** Something that can be marked: a country, or a special region (Antarctica). */
export interface Country {
  /** ISO 3166-1 alpha-2, or a user-assigned X code (XK Kosovo, XN Northern Cyprus). */
  code: CountryCode;
  kind: 'country' | 'special-region';
  /** ISO 3166-1 numeric, used to match map shapes. XK uses the user-assigned "983"; XN has none. */
  numericCode?: string;
  name: Readonly<Record<NameLocale, string>>;
  /** Other known names in Turkish and English (official forms, abbreviations), for search. */
  aliases: readonly string[];
  continent: Continent;
  /** True for the 198 countries; false for special regions. */
  countsTowardWorldTotal: boolean;
}

function toMarkable(raw: RawCountry): Country {
  const override = DISPLAY_NAME_OVERRIDES[raw.code];
  const name = {
    tr: override?.tr ?? raw.tr[0] ?? raw.code,
    en: override?.en ?? raw.en[0] ?? raw.code,
  };
  const displayNames = new Set<string>([name.tr, name.en]);
  const aliases = [...new Set([...raw.tr, ...raw.en])].filter((alias) => !displayNames.has(alias));
  const continent = CONTINENT_DECISIONS[raw.code]?.continent ?? raw.continents[0];
  if (!continent) throw new Error(`No continent for ${raw.code}`);

  return {
    code: raw.code,
    kind: isCountry(raw.code) ? 'country' : 'special-region',
    ...(raw.numeric ? { numericCode: raw.numeric } : {}),
    name,
    aliases,
    continent,
    countsTowardWorldTotal: countsTowardWorldTotal(raw.code),
  };
}

const markable: readonly Country[] = [...RAW_COUNTRIES, ...EXTRA_COUNTRIES]
  .filter((raw) => isMarkable(raw.code))
  .map(toMarkable)
  .sort((a, b) => a.code.localeCompare(b.code));

const countries: readonly Country[] = markable.filter((c) => c.kind === 'country');

const byCode: ReadonlyMap<CountryCode, Country> = new Map(markable.map((c) => [c.code, c]));

/** The 198 countries, ordered by code. */
export function listCountries(): readonly Country[] {
  return countries;
}

/** Everything that can be marked (the 198 countries and Antarctica), ordered by code. */
export function listMarkable(): readonly Country[] {
  return markable;
}

/** The country for a code, or undefined if the code is not one of the 198 countries. */
export function getCountry(code: CountryCode): Country | undefined {
  const found = byCode.get(code);
  return found?.kind === 'country' ? found : undefined;
}

/** A country or special region for a code, or undefined if it cannot be marked. */
export function getMarkable(code: CountryCode): Country | undefined {
  return byCode.get(code);
}

/** Everything markable on a continent; Antarctica is the special region AQ. */
export function getMarkableByContinent(continent: Continent): readonly Country[] {
  return markable.filter((item) => item.continent === continent);
}

/** Countries only (no special regions) on a continent. */
export function getCountriesByContinent(continent: Continent): readonly Country[] {
  return countries.filter((country) => country.continent === continent);
}
