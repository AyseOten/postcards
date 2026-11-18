/** ISO 3166-1 alpha-2 code, e.g. "TR". Countries are always identified by this code, never by name. */
export type CountryCode = string;

export const MARK_STATUSES = ['visited', 'lived', 'wishlist'] as const;

export type MarkStatus = (typeof MARK_STATUSES)[number];

export interface CountryMark {
  countryCode: CountryCode;
  status: MarkStatus;
  firstVisitYear?: number;
  note?: string;
  /** ISO 8601 timestamp. */
  createdAt: string;
}

export function isMarkStatus(value: unknown): value is MarkStatus {
  return typeof value === 'string' && (MARK_STATUSES as readonly string[]).includes(value);
}

/** Checks the shape of an alpha-2 code (two uppercase letters). It does not check that the country exists. */
export function isCountryCodeFormat(value: unknown): value is CountryCode {
  return typeof value === 'string' && /^[A-Z]{2}$/.test(value);
}
