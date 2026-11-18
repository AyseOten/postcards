import { isCountryCodeFormat } from '../types';
import { RAW_COUNTRIES } from './data.generated';
import { EXTRA_COUNTRIES } from './extra-countries';
import {
  CONTINENT_DECISIONS,
  CONTINENTS,
  COUNTRY_CODES,
  DISPLAY_NAME_OVERRIDES,
  getCountriesByContinent,
  getCountry,
  getMarkable,
  getMarkableByContinent,
  isContinent,
  isCountry,
  isMarkable,
  listCountries,
  listMarkable,
  MARKABLE_CODES,
} from './index';

const countries = listCountries();
const allRaw = [...RAW_COUNTRIES, ...EXTRA_COUNTRIES];
const rawByCode = new Map(allRaw.map((raw) => [raw.code, raw]));

describe('source data', () => {
  it('contains everything that can be marked', () => {
    for (const code of MARKABLE_CODES) {
      expect(rawByCode.has(code)).toBe(true);
    }
  });

  it('has unique codes across generated and hand-maintained entries', () => {
    expect(rawByCode.size).toBe(allRaw.length);
  });

  it('only adds hand-maintained entries the sources do not have', () => {
    const generated = new Set(RAW_COUNTRIES.map((raw) => raw.code));
    for (const extra of EXTRA_COUNTRIES) {
      expect(generated.has(extra.code)).toBe(false);
    }
  });
});

describe('listCountries', () => {
  it('returns the 198 countries, ordered by code', () => {
    const codes = countries.map((country) => country.code);
    expect(codes).toEqual([...COUNTRY_CODES]);
    expect(countries.every((c) => c.kind === 'country')).toBe(true);
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

  it('has a unique 3-digit numeric code for every country except Northern Cyprus', () => {
    const withCode = countries.filter((country) => country.code !== 'XN');
    const numericCodes = withCode.map((country) => country.numericCode);
    expect(new Set(numericCodes).size).toBe(withCode.length);
    for (const numericCode of numericCodes) {
      expect(numericCode).toMatch(/^\d{3}$/);
    }
    expect(getCountry('XN')?.numericCode).toBeUndefined();
  });

  it('counts every country toward the world total (ADR 0005)', () => {
    expect(countries.every((c) => c.countsTowardWorldTotal)).toBe(true);
  });
});

describe('listMarkable', () => {
  it('returns the 198 countries and Antarctica', () => {
    expect(listMarkable().map((item) => item.code)).toEqual([...MARKABLE_CODES]);
  });

  it('marks Antarctica as a special region outside the world total', () => {
    expect(getMarkable('AQ')).toMatchObject({
      code: 'AQ',
      kind: 'special-region',
      name: { tr: 'Antarktika', en: 'Antarctica' },
      continent: 'AN',
      countsTowardWorldTotal: false,
    });
  });

  it.each(['GL', 'PR', 'EH', 'XX'])('cannot mark %p', (code) => {
    expect(getMarkable(code)).toBeUndefined();
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
    expect(kosovo?.countsTowardWorldTotal).toBe(true);
  });

  it('returns Cyprus and Northern Cyprus as two countries (ADR 0005)', () => {
    expect(getCountry('CY')).toMatchObject({
      name: { tr: 'Güney Kıbrıs Rum Kesimi', en: 'Cyprus' },
      continent: 'EU',
    });
    expect(getCountry('XN')).toMatchObject({
      kind: 'country',
      name: { tr: 'Kuzey Kıbrıs Türk Cumhuriyeti', en: 'Northern Cyprus' },
      continent: 'EU',
      countsTowardWorldTotal: true,
    });
  });

  it('finds Northern Cyprus by its search aliases', () => {
    expect(getCountry('XN')?.aliases).toEqual(
      expect.arrayContaining(['KKTC', 'Kuzey Kıbrıs', 'TRNC']),
    );
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
      expect(isCountry(code)).toBe(true);
      const raw = rawByCode.get(code);
      if (override.tr !== undefined) expect(override.tr).not.toBe(raw?.tr[0]);
      if (override.en !== undefined) expect(override.en).not.toBe(raw?.en[0]);
    }
  });
});

describe('continents', () => {
  it('has an explicit decision for every multi-continent country in the source', () => {
    const multi = RAW_COUNTRIES.filter(
      (raw) => isMarkable(raw.code) && raw.continents.length > 1,
    ).map((raw) => raw.code);
    expect(multi.length).toBeGreaterThan(0);
    for (const code of multi) {
      expect(CONTINENT_DECISIONS).toHaveProperty(code);
    }
  });

  it('applies the decisions', () => {
    for (const [code, decision] of Object.entries(CONTINENT_DECISIONS)) {
      expect(isCountry(code)).toBe(true);
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

  it('has no country in Antarctica, only the special region AQ', () => {
    expect(getCountriesByContinent('AN')).toEqual([]);
    expect(getMarkableByContinent('AN').map((item) => item.code)).toEqual(['AQ']);
  });

  it('makes all seven continents reachable', () => {
    for (const continent of CONTINENTS) {
      expect(getMarkableByContinent(continent).length).toBeGreaterThan(0);
    }
  });

  it('rejects unknown continents', () => {
    expect(isContinent('XX')).toBe(false);
    expect(isContinent('eu')).toBe(false);
  });
});
