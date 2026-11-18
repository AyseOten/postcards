import { isCountryCodeFormat } from '../types';
import { RAW_COUNTRIES } from './data.generated';
import {
  CONTINENT_DECISIONS,
  CONTINENTS,
  DISPLAY_NAME_OVERRIDES,
  getCountriesByContinent,
  getCountry,
  isContinent,
  isMarkableCountry,
  listCountries,
  MARKABLE_COUNTRY_CODES,
} from './index';

const countries = listCountries();
const rawByCode = new Map(RAW_COUNTRIES.map((raw) => [raw.code, raw]));

describe('generated source data', () => {
  it('contains every markable country', () => {
    for (const code of MARKABLE_COUNTRY_CODES) {
      expect(rawByCode.has(code)).toBe(true);
    }
  });

  it('has unique codes', () => {
    expect(rawByCode.size).toBe(RAW_COUNTRIES.length);
  });
});

describe('listCountries', () => {
  it('returns the 197 markable countries, ordered by code', () => {
    const codes = countries.map((country) => country.code);
    expect(codes).toEqual([...MARKABLE_COUNTRY_CODES]);
  });

  it.each(countries.map((c) => [c.code, c] as const))('%s is complete', (code, country) => {
    expect(isCountryCodeFormat(code)).toBe(true);
    expect(country.name.tr.trim()).not.toBe('');
    expect(country.name.en.trim()).not.toBe('');
    expect(isContinent(country.continent)).toBe(true);
  });

  it('uses short display names without commas or parentheses', () => {
    for (const country of countries) {
      expect(country.name.tr).not.toMatch(/[,()]/);
      expect(country.name.en).not.toMatch(/[,()]/);
    }
  });

  it('has a unique 3-digit numeric code for every country', () => {
    const numericCodes = countries.map((country) => country.numericCode);
    expect(new Set(numericCodes).size).toBe(countries.length);
    for (const numericCode of numericCodes) {
      expect(numericCode).toMatch(/^\d{3}$/);
    }
  });

  it('marks only Kosovo and Taiwan as outside the world total', () => {
    const outside = countries.filter((c) => !c.countsTowardWorldTotal).map((c) => c.code);
    expect(outside).toEqual(['TW', 'XK']);
  });
});

describe('getCountry', () => {
  it('returns Türkiye', () => {
    expect(getCountry('TR')).toMatchObject({
      code: 'TR',
      numericCode: '792',
      name: { tr: 'Türkiye', en: 'Türkiye' },
      continent: 'AS',
      countsTowardWorldTotal: true,
    });
    expect(getCountry('TR')?.aliases).toContain('Turkey');
  });

  it('returns Japonya with its Turkish name', () => {
    expect(getCountry('JP')?.name).toEqual({ tr: 'Japonya', en: 'Japan' });
  });

  it('returns Kosovo with its user-assigned numeric code', () => {
    const kosovo = getCountry('XK');
    expect(kosovo?.name.tr).toBe('Kosova');
    expect(kosovo?.numericCode).toBe('983');
    expect(kosovo?.countsTowardWorldTotal).toBe(false);
  });

  it.each(['GL', 'PR', 'AQ', 'tr', 'XX'])('returns undefined for %p', (code) => {
    expect(getCountry(code)).toBeUndefined();
  });
});

describe('display names and aliases', () => {
  it('applies overrides and keeps the source names as aliases', () => {
    const us = getCountry('US');
    expect(us?.name).toEqual({ tr: 'Amerika Birleşik Devletleri', en: 'United States' });
    expect(us?.aliases).toEqual(expect.arrayContaining(['ABD', 'Amerika', 'USA']));

    expect(getCountry('PS')?.name).toEqual({ tr: 'Filistin', en: 'Palestine' });
    expect(getCountry('PS')?.aliases).toContain('Filistin Bölgeleri');
  });

  it('never repeats a display name as an alias', () => {
    for (const country of countries) {
      expect(country.aliases).not.toContain(country.name.tr);
      expect(country.aliases).not.toContain(country.name.en);
    }
  });

  it('only overrides markable countries, and only with a different name', () => {
    for (const [code, override] of Object.entries(DISPLAY_NAME_OVERRIDES)) {
      expect(isMarkableCountry(code)).toBe(true);
      const raw = rawByCode.get(code);
      if (override.tr !== undefined) expect(override.tr).not.toBe(raw?.tr[0]);
      if (override.en !== undefined) expect(override.en).not.toBe(raw?.en[0]);
    }
  });
});

describe('continents', () => {
  it('has an explicit decision for every multi-continent country in the source', () => {
    const multi = RAW_COUNTRIES.filter(
      (raw) => isMarkableCountry(raw.code) && raw.continents.length > 1,
    ).map((raw) => raw.code);
    expect(multi.length).toBeGreaterThan(0);
    for (const code of multi) {
      expect(CONTINENT_DECISIONS).toHaveProperty(code);
    }
  });

  it('applies the decisions', () => {
    for (const [code, decision] of Object.entries(CONTINENT_DECISIONS)) {
      expect(isMarkableCountry(code)).toBe(true);
      expect(getCountry(code)?.continent).toBe(decision.continent);
      expect(decision.reason.trim()).not.toBe('');
    }
    expect(getCountry('RU')?.continent).toBe('EU');
    expect(getCountry('TL')?.continent).toBe('AS');
  });

  it('puts every country on exactly one continent', () => {
    const perContinent = CONTINENTS.map((continent) => getCountriesByContinent(continent));
    expect(perContinent.flat()).toHaveLength(countries.length);
  });

  it('has no markable country in Antarctica', () => {
    expect(getCountriesByContinent('AN')).toEqual([]);
  });

  it('rejects unknown continents', () => {
    expect(isContinent('XX')).toBe(false);
    expect(isContinent('eu')).toBe(false);
  });
});
