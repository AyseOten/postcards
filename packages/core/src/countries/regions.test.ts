import { getCountriesByContinent, getCountry, isCountry } from './index';
import { REGION_IDS, REGIONS } from './regions';

const region = (id: string) => REGIONS.find((r) => r.id === id);

describe('REGIONS', () => {
  it('defines each region id once', () => {
    expect(REGIONS.map((r) => r.id)).toEqual([...REGION_IDS]);
  });

  it.each(REGIONS.map((r) => [r.id, r] as const))(
    '%s has a basis and unique, markable, sorted codes',
    (_id, r) => {
      expect(r.basis.trim()).not.toBe('');
      expect(new Set(r.countries).size).toBe(r.countries.length);
      expect([...r.countries].sort()).toEqual([...r.countries]);
      for (const code of r.countries) {
        expect(isCountry(code)).toBe(true);
      }
    },
  );

  it('South America matches the South American continent', () => {
    const continent = getCountriesByContinent('SA').map((c) => c.code);
    expect(region('south-america')?.countries).toEqual(continent);
  });

  it('Southeast Asia is entirely in Asia (including Timor-Leste)', () => {
    for (const code of region('southeast-asia')?.countries ?? []) {
      expect(getCountry(code)?.continent).toBe('AS');
    }
  });

  it('Scandinavia & Nordics has the five Nordic countries (ADR 0005)', () => {
    expect(region('nordic')?.countries).toEqual(['DK', 'FI', 'IS', 'NO', 'SE']);
  });

  it('the Mediterranean includes both Cyprus and Northern Cyprus', () => {
    expect(region('mediterranean')?.countries).toEqual(expect.arrayContaining(['CY', 'XN']));
  });

  it('Scandinavia & Nordics is entirely in Europe', () => {
    for (const code of region('nordic')?.countries ?? []) {
      expect(getCountry(code)?.continent).toBe('EU');
    }
  });
});
