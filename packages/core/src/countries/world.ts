import type { CountryCode } from '../types';

/**
 * Which places can be marked, which of them are countries, and what counts toward
 * "percentage of the world". This file is the single place where these rules are defined
 * (ADR 0002, amended by ADR 0005).
 *
 * Rule: every country that can be marked counts toward the world percentage (198).
 *
 * Source for the UN lists: United Nations, Member States
 * (https://www.un.org/en/about-us/member-states) and Non-member States
 * (https://www.un.org/en/about-us/non-member-states).
 */

/** The 193 UN member states. */
// prettier-ignore
export const UN_MEMBER_CODES = [
  'AD', 'AE', 'AF', 'AG', 'AL', 'AM', 'AO', 'AR', 'AT', 'AU', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF',
  'BG', 'BH', 'BI', 'BJ', 'BN', 'BO', 'BR', 'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG',
  'CH', 'CI', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO',
  'DZ', 'EC', 'EE', 'EG', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FM', 'FR', 'GA', 'GB', 'GD', 'GE', 'GH',
  'GM', 'GN', 'GQ', 'GR', 'GT', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IN', 'IQ',
  'IR', 'IS', 'IT', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KZ',
  'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MG',
  'MH', 'MK', 'ML', 'MM', 'MN', 'MR', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NE', 'NG',
  'NI', 'NL', 'NO', 'NP', 'NR', 'NZ', 'OM', 'PA', 'PE', 'PG', 'PH', 'PK', 'PL', 'PT', 'PW', 'PY',
  'QA', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SI', 'SK', 'SL', 'SM', 'SN',
  'SO', 'SR', 'SS', 'ST', 'SV', 'SY', 'SZ', 'TD', 'TG', 'TH', 'TJ', 'TL', 'TM', 'TN', 'TO', 'TR',
  'TT', 'TV', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VC', 'VE', 'VN', 'VU', 'WS', 'YE', 'ZA', 'ZM',
  'ZW',
] as const satisfies readonly CountryCode[];

/** UN non-member observer states: Holy See (Vatican) and State of Palestine. */
export const UN_OBSERVER_CODES = ['PS', 'VA'] as const satisfies readonly CountryCode[];

/**
 * Countries outside the UN lists that are markable and counted like any other country
 * (country totals, stamps, collections and the world percentage). See ADR 0005.
 * - TW: Taiwan (ISO 3166-1).
 * - XK: Kosovo. User-assigned code, widely used; not part of ISO 3166-1.
 * - XN: Northern Cyprus (Kuzey Kıbrıs Türk Cumhuriyeti). User-assigned code chosen for
 *   Postcards; ISO never assigns codes in the X range, so it cannot clash with a future code.
 */
export const OTHER_COUNTRY_CODES = ['TW', 'XK', 'XN'] as const satisfies readonly CountryCode[];

/**
 * Places that can be marked but are not countries: they count toward continents and the
 * all-continents collection, not toward country totals or the world percentage (ADR 0005).
 */
export const SPECIAL_REGION_CODES = ['AQ'] as const satisfies readonly CountryCode[];

const countryCodes: ReadonlySet<CountryCode> = new Set<CountryCode>([
  ...UN_MEMBER_CODES,
  ...UN_OBSERVER_CODES,
  ...OTHER_COUNTRY_CODES,
]);

const specialRegionCodes: ReadonlySet<CountryCode> = new Set<CountryCode>(SPECIAL_REGION_CODES);

/** All 198 countries, sorted by code. */
export const COUNTRY_CODES: readonly CountryCode[] = [...countryCodes].sort();

/** Everything that can be marked as visited, lived or wishlist: the 198 countries and AQ. */
export const MARKABLE_CODES: readonly CountryCode[] = [
  ...countryCodes,
  ...specialRegionCodes,
].sort();

/** Denominator of the world percentage: every country (193 UN + 2 observers + TW, XK, XN). */
export const WORLD_COUNTRY_TOTAL = COUNTRY_CODES.length;

export function isCountry(code: CountryCode): boolean {
  return countryCodes.has(code);
}

export function isSpecialRegion(code: CountryCode): boolean {
  return specialRegionCodes.has(code);
}

export function isMarkable(code: CountryCode): boolean {
  return isCountry(code) || isSpecialRegion(code);
}

/** True for the 198 countries; false for AQ, territories and unknown codes. */
export function countsTowardWorldTotal(code: CountryCode): boolean {
  return isCountry(code);
}

/**
 * Percentage (0–100, not rounded) of the 198 countries among the given codes.
 * Duplicates, AQ, territories and unknown codes are ignored.
 */
export function getWorldPercent(codes: Iterable<CountryCode>): number {
  const counted = new Set<CountryCode>();
  for (const code of codes) {
    if (countsTowardWorldTotal(code)) counted.add(code);
  }
  return (counted.size / WORLD_COUNTRY_TOTAL) * 100;
}
