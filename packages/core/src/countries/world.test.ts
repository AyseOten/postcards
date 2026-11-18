import {
  COUNTRY_CODES,
  countsTowardWorldTotal,
  getWorldPercent,
  isCountry,
  isMarkable,
  isSpecialRegion,
  MARKABLE_CODES,
  OTHER_COUNTRY_CODES,
  SPECIAL_REGION_CODES,
  UN_MEMBER_CODES,
  UN_OBSERVER_CODES,
  WORLD_COUNTRY_TOTAL,
} from './world';

describe('country lists', () => {
  it('has 193 unique UN members', () => {
    expect(new Set(UN_MEMBER_CODES).size).toBe(193);
    expect(UN_MEMBER_CODES).toHaveLength(193);
  });

  it('has the Holy See and Palestine as observers', () => {
    expect([...UN_OBSERVER_CODES].sort()).toEqual(['PS', 'VA']);
  });

  it('adds Taiwan, Kosovo and Northern Cyprus outside the UN lists (ADR 0005)', () => {
    expect([...OTHER_COUNTRY_CODES].sort()).toEqual(['TW', 'XK', 'XN']);
    for (const code of OTHER_COUNTRY_CODES) {
      expect(UN_MEMBER_CODES).not.toContain(code);
      expect(UN_OBSERVER_CODES).not.toContain(code);
    }
  });

  it('has 198 unique countries, sorted', () => {
    expect(COUNTRY_CODES).toHaveLength(198);
    expect(new Set(COUNTRY_CODES).size).toBe(198);
    expect([...COUNTRY_CODES].sort()).toEqual(COUNTRY_CODES);
  });

  it('makes Antarctica the only special region', () => {
    expect(SPECIAL_REGION_CODES).toEqual(['AQ']);
    expect(COUNTRY_CODES).not.toContain('AQ');
  });

  it('makes the 198 countries and Antarctica markable', () => {
    expect(MARKABLE_CODES).toHaveLength(199);
    expect(MARKABLE_CODES).toEqual([...COUNTRY_CODES, 'AQ'].sort());
  });
});

describe('isCountry / isSpecialRegion / isMarkable', () => {
  it.each(['TR', 'CY', 'PS', 'VA', 'TW', 'XK', 'XN'])('%s is a markable country', (code) => {
    expect(isCountry(code)).toBe(true);
    expect(isSpecialRegion(code)).toBe(false);
    expect(isMarkable(code)).toBe(true);
  });

  it('AQ is a markable special region, not a country', () => {
    expect(isCountry('AQ')).toBe(false);
    expect(isSpecialRegion('AQ')).toBe(true);
    expect(isMarkable('AQ')).toBe(true);
  });

  it.each(['GL', 'PR', 'EH', 'HK', 'tr', ''])('%p cannot be marked', (code) => {
    expect(isMarkable(code)).toBe(false);
  });
});

describe('countsTowardWorldTotal', () => {
  it('uses every country as the denominator (ADR 0005)', () => {
    expect(WORLD_COUNTRY_TOTAL).toBe(198);
  });

  it.each(['TR', 'PS', 'VA', 'TW', 'XK', 'XN', 'CY'])('counts %s', (code) => {
    expect(countsTowardWorldTotal(code)).toBe(true);
  });

  it.each(['AQ', 'GL', 'PR'])('does not count %s', (code) => {
    expect(countsTowardWorldTotal(code)).toBe(false);
  });
});

describe('getWorldPercent', () => {
  it('is 0 for no countries', () => {
    expect(getWorldPercent([])).toBe(0);
  });

  it('is 100 for all 198 countries', () => {
    expect(getWorldPercent(COUNTRY_CODES)).toBe(100);
  });

  it('is still 100 when Antarctica is added', () => {
    expect(getWorldPercent(MARKABLE_CODES)).toBe(100);
  });

  it('counts Northern Cyprus, Kosovo and Taiwan', () => {
    expect(getWorldPercent(['XN', 'XK', 'TW'])).toBeCloseTo(300 / 198);
  });

  it('ignores Antarctica and territories', () => {
    expect(getWorldPercent(['TR', 'AQ', 'GL'])).toBeCloseTo(100 / 198);
  });

  it('counts each country once', () => {
    expect(getWorldPercent(['TR', 'TR', 'JP'])).toBeCloseTo(200 / 198);
  });

  it('accepts any iterable', () => {
    expect(getWorldPercent(new Set(['TR']))).toBeCloseTo(100 / 198);
  });
});
