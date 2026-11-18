import type { CountryCode } from '../types';
import type { Continent } from './continents';

/** One entry of data.generated.ts, exactly as it comes from the source datasets. */
export interface RawCountry {
  code: CountryCode;
  /** ISO 3166-1 numeric code ("792"); "983" for XK is user-assigned, not ISO. Used to match map shapes. */
  numeric?: string;
  /** English names from i18n-iso-countries; the first is the official form. */
  en: readonly string[];
  /** Turkish names from i18n-iso-countries. */
  tr: readonly string[];
  /** Continents from countries-list; the first is the dataset's primary continent. */
  continents: readonly Continent[];
}
