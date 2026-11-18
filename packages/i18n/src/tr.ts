/** Turkish strings. This is the default locale and the source of truth for message keys. */
export const tr = {
  app: {
    name: 'Postcards',
    tagline: 'Seyahat dünyan tek bir yerde',
  },
  home: {
    comingSoon: 'Haritan çok yakında burada.',
  },
  /** Passport collection regions; keys are the region ids in @postcards/core. */
  regions: {
    mediterranean: 'Akdeniz',
    balkans: 'Balkanlar',
    nordic: 'İskandinavya ve Kuzey',
    'southeast-asia': 'Güneydoğu Asya',
    'south-america': 'Güney Amerika',
  },
} as const;
