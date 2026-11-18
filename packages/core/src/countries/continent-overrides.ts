import type { CountryCode } from '../types';
import type { Continent } from './continents';

/**
 * Every country gets exactly one continent, used for "continents visited" and the
 * all-continents collection. By default it is the primary continent in countries-list.
 *
 * This list makes the decision explicit for every country that spans two continents in
 * countries-list, plus corrections. A test fails if a multi-continent country is missing here,
 * so a dataset update cannot silently change these.
 *
 * Rule: the continent with the larger share of the population and the capital, unless noted.
 */
export const CONTINENT_DECISIONS: Readonly<
  Record<CountryCode, { continent: Continent; reason: string }>
> = {
  // Spans two continents in countries-list.
  AZ: { continent: 'AS', reason: 'Capital and most of the population south of the Caucasus.' },
  DK: { continent: 'EU', reason: 'Denmark proper; Greenland is listed separately (GL).' },
  EG: { continent: 'AF', reason: 'Sinai is the only part in Asia.' },
  GE: { continent: 'AS', reason: 'UN M49 Western Asia; capital south of the Greater Caucasus.' },
  KZ: { continent: 'AS', reason: 'About 90% of the territory and the capital are in Asia.' },
  RU: { continent: 'EU', reason: 'Capital and about 75% of the population are in Europe.' },
  TR: { continent: 'AS', reason: 'Capital and most of the population in Anatolia.' },

  // Corrections to a single-continent value in countries-list.
  TL: {
    continent: 'AS',
    reason: 'countries-list says Oceania; UN M49 South-eastern Asia and an ASEAN member.',
  },
};
