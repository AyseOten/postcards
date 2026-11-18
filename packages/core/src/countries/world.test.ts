import {
  countsTowardWorldTotal,
  getWorldPercent,
  isMarkableCountry,
  MARKABLE_COUNTRY_CODES,
  OTHER_COUNTRY_CODES,
  UN_MEMBER_CODES,
  UN_OBSERVER_CODES,
  WORLD_COUNTRY_TOTAL,
} from './world';

const worldTotal = [...UN_MEMBER_CODES, ...UN_OBSERVER_CODES];

describe('country lists', () => {
  it('has 193 unique UN members', () => {
    expect(new Set(UN_MEMBER_CODES).size).toBe(193);
    expect(UN_MEMBER_CODES).toHaveLength(193);
  });

  it('has the Holy See and Palestine as observers', () => {
    expect([...UN_OBSERVER_CODES].sort()).toEqual(['PS', 'VA']);
  });

  it('uses 193 + 2 = 195 as the world total', () => {
    expect(WORLD_COUNTRY_TOTAL).toBe(195);
    expect(new Set(worldTotal).size).toBe(WORLD_COUNTRY_TOTAL);
  });

  it('keeps Kosovo and Taiwan outside the UN lists', () => {
    expect([...OTHER_COUNTRY_CODES].sort()).toEqual(['TW', 'XK']);
    for (const code of OTHER_COUNTRY_CODES) {
      expect(worldTotal).not.toContain(code);
    }
  });

  it('makes 197 countries markable', () => {
    expect(MARKABLE_COUNTRY_CODES).toHaveLength(197);
    expect(new Set(MARKABLE_COUNTRY_CODES).size).toBe(197);
  });
});

describe('isMarkableCountry', () => {
  it.each(['TR', 'PS', 'VA', 'XK', 'TW'])('accepts %s', (code) => {
    expect(isMarkableCountry(code)).toBe(true);
  });

  it.each(['GL', 'PR', 'HK', 'AQ', 'tr', ''])('rejects %p', (code) => {
    expect(isMarkableCountry(code)).toBe(false);
  });
});

describe('countsTowardWorldTotal', () => {
  it.each(['TR', 'JP', 'PS', 'VA'])('counts %s', (code) => {
    expect(countsTowardWorldTotal(code)).toBe(true);
  });

  it.each(['XK', 'TW', 'GL', 'PR'])('does not count %s', (code) => {
    expect(countsTowardWorldTotal(code)).toBe(false);
  });
});

describe('getWorldPercent', () => {
  it('is 0 for no countries', () => {
    expect(getWorldPercent([])).toBe(0);
  });

  it('is 100 for all 195 countries', () => {
    expect(getWorldPercent(worldTotal)).toBe(100);
  });

  it('is still 100 for all 197 markable countries', () => {
    expect(getWorldPercent(MARKABLE_COUNTRY_CODES)).toBe(100);
  });

  it('ignores Kosovo, Taiwan and territories', () => {
    expect(getWorldPercent(['TR', 'XK', 'TW', 'GL'])).toBeCloseTo(100 / 195);
  });

  it('counts each country once', () => {
    expect(getWorldPercent(['TR', 'TR', 'JP'])).toBeCloseTo(200 / 195);
  });

  it('accepts any iterable', () => {
    expect(getWorldPercent(new Set(['TR']))).toBeCloseTo(100 / 195);
  });
});
