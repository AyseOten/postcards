import type { CountryCode } from '../types';
import { CONTINENT_DECISIONS } from './continent-overrides';
import type { Continent } from './continents';
import { RAW_COUNTRIES } from './data.generated';
import { DISPLAY_NAME_OVERRIDES, type NameLocale } from './names';
import type { RawCountry } from './raw';
import { countsTowardWorldTotal, isMarkableCountry } from './world';

export { CONTINENTS, isContinent, type Continent } from './continents';
export { CONTINENT_DECISIONS } from './continent-overrides';
export { DISPLAY_NAME_OVERRIDES, type NameLocale } from './names';
export { REGION_IDS, REGIONS, type Region, type RegionId } from './regions';
export {
  countsTowardWorldTotal,
  getWorldPercent,
  isMarkableCountry,
  MARKABLE_COUNTRY_CODES,
  OTHER_COUNTRY_CODES,
  UN_MEMBER_CODES,
  UN_OBSERVER_CODES,
  WORLD_COUNTRY_TOTAL,
} from './world';

export interface Country {
  /** ISO 3166-1 alpha-2 (XK for Kosovo). */
  code: CountryCode;
  /** ISO 3166-1 numeric, used to match map shapes. XK uses the user-assigned "983". */
  numericCode?: string;
  name: Readonly<Record<NameLocale, string>>;
  /** Other known names in Turkish and English (official forms, abbreviations), for search. */
  aliases: readonly string[];
  continent: Continent;
  /** Whether the country is one of the 195 in the world-percentage denominator. */
  countsTowardWorldTotal: boolean;
}

function toCountry(raw: RawCountry): Country {
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
    ...(raw.numeric ? { numericCode: raw.numeric } : {}),
    name,
    aliases,
    continent,
    countsTowardWorldTotal: countsTowardWorldTotal(raw.code),
  };
}

const countries: readonly Country[] = RAW_COUNTRIES.filter((raw) =>
  isMarkableCountry(raw.code),
).map(toCountry);

const byCode: ReadonlyMap<CountryCode, Country> = new Map(countries.map((c) => [c.code, c]));

/** All 197 markable countries (195 + Kosovo + Taiwan), ordered by code. */
export function listCountries(): readonly Country[] {
  return countries;
}

/** The country for a code, or undefined if the code is not a markable country. */
export function getCountry(code: CountryCode): Country | undefined {
  return byCode.get(code);
}

export function getCountriesByContinent(continent: Continent): readonly Country[] {
  return countries.filter((country) => country.continent === continent);
}
