import type { CountryCode } from '../types';

export const REGION_IDS = [
  'mediterranean',
  'balkans',
  'nordic',
  'southeast-asia',
  'south-america',
] as const;

export type RegionId = (typeof REGION_IDS)[number];

export interface Region {
  id: RegionId;
  /** The source or rule the membership is based on, in one sentence. */
  basis: string;
  countries: readonly CountryCode[];
}

/** Curated regions used by the passport collections (SPEC.md §5.5, ADR 0002 and 0005). Display names come from i18n. */
export const REGIONS: readonly Region[] = [
  {
    id: 'mediterranean',
    basis:
      'Countries with a coastline on the Mediterranean Sea or its arms (Adriatic, Aegean, Ionian, Levantine).',
    // prettier-ignore
    countries: [
      'AL', 'BA', 'CY', 'DZ', 'EG', 'ES', 'FR', 'GR', 'HR', 'IL', 'IT',
      'LB', 'LY', 'MA', 'MC', 'ME', 'MT', 'PS', 'SI', 'SY', 'TN', 'TR', 'XN',
    ],
  },
  {
    id: 'balkans',
    basis:
      'Countries mostly on the Balkan Peninsula (south of the Danube–Sava–Kupa line), as commonly used for Southeast Europe.',
    countries: ['AL', 'BA', 'BG', 'GR', 'HR', 'ME', 'MK', 'RS', 'XK'],
  },
  {
    id: 'nordic',
    basis:
      'The five Nordic countries (Nordic Council members): the Scandinavian kingdoms plus Finland and Iceland. Shown as "İskandinavya ve Kuzey".',
    countries: ['DK', 'FI', 'IS', 'NO', 'SE'],
  },
  {
    id: 'southeast-asia',
    basis:
      'The 11 ASEAN member states (Timor-Leste joined in 2025), identical to UN M49 South-eastern Asia.',
    countries: ['BN', 'ID', 'KH', 'LA', 'MM', 'MY', 'PH', 'SG', 'TH', 'TL', 'VN'],
  },
  {
    id: 'south-america',
    basis: 'The 12 sovereign states of the South American continent (UN M49 South America).',
    countries: ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'GY', 'PE', 'PY', 'SR', 'UY', 'VE'],
  },
];
