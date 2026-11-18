/** The seven continents, with the codes used by countries-list. */
export const CONTINENTS = ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA'] as const;

export type Continent = (typeof CONTINENTS)[number];

export function isContinent(value: unknown): value is Continent {
  return typeof value === 'string' && (CONTINENTS as readonly string[]).includes(value);
}
