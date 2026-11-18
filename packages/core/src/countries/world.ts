import type { CountryCode } from '../types';

/**
 * Which places count as countries, and which of them count toward "percentage of the world".
 * This file is the single place where that rule is defined.
 *
 * Source: United Nations, Member States (https://www.un.org/en/about-us/member-states)
 * and Non-member States with observer status (https://www.un.org/en/about-us/non-member-states).
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
 * Countries outside the UN list that can still be marked. They count for country totals,
 * stamps and collections, but not for the world percentage.
 * XK (Kosovo) is a user-assigned code, widely used for Kosovo but not part of ISO 3166-1.
 */
export const OTHER_COUNTRY_CODES = ['TW', 'XK'] as const satisfies readonly CountryCode[];

/** Denominator of the world percentage: 193 UN members + 2 observer states. */
export const WORLD_COUNTRY_TOTAL = 195;

const worldTotalCodes: ReadonlySet<CountryCode> = new Set<CountryCode>([
  ...UN_MEMBER_CODES,
  ...UN_OBSERVER_CODES,
]);

const markableCodes: ReadonlySet<CountryCode> = new Set<CountryCode>([
  ...worldTotalCodes,
  ...OTHER_COUNTRY_CODES,
]);

/** All codes that can be marked as visited, lived or wishlist (197). */
export const MARKABLE_COUNTRY_CODES: readonly CountryCode[] = [...markableCodes].sort();

export function isMarkableCountry(code: CountryCode): boolean {
  return markableCodes.has(code);
}

/** True only for the 195 countries in the world-percentage denominator. */
export function countsTowardWorldTotal(code: CountryCode): boolean {
  return worldTotalCodes.has(code);
}

/**
 * Percentage (0–100, not rounded) of the 195 countries among the given codes.
 * Duplicates and codes outside the 195 (e.g. XK, TW, territories) are ignored.
 */
export function getWorldPercent(codes: Iterable<CountryCode>): number {
  const counted = new Set<CountryCode>();
  for (const code of codes) {
    if (countsTowardWorldTotal(code)) counted.add(code);
  }
  return (counted.size / WORLD_COUNTRY_TOTAL) * 100;
}
