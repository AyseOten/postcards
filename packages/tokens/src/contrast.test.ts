import { AA, checkContrast, CONTRAST_PAIRS } from './contrast';
import { STATUS_KEYS, THEMES } from './themes';

const results = checkContrast();

describe('CONTRAST_PAIRS', () => {
  it('has unique names', () => {
    const names = CONTRAST_PAIRS.map((pair) => pair.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('uses the AA minimum for each kind', () => {
    for (const pair of CONTRAST_PAIRS) {
      if (pair.kind === 'text') expect(pair.minimum).toBe(AA.text);
      if (pair.kind === 'non-text') expect(pair.minimum).toBe(AA.nonText);
      if (pair.kind === 'informative') expect(pair.minimum).toBeUndefined();
    }
  });

  it('checks the chip text and both map outlines for every status', () => {
    const names = CONTRAST_PAIRS.map((pair) => pair.name);
    for (const status of STATUS_KEYS) {
      expect(names).toContain(`${status}: chipText / chipBackground`);
      expect(names).toContain(`${status}: mapStroke / mapLand`);
      expect(names).toContain(`${status}: mapStroke / mapOcean`);
    }
  });
});

describe('WCAG AA', () => {
  const required = results.filter((r) => r.pair.minimum !== undefined);

  it('checks every pair in both themes', () => {
    expect(results).toHaveLength(CONTRAST_PAIRS.length * THEMES.length);
  });

  it.each(required.map((r) => [r.theme, r.pair.name, r] as const))(
    '%s: %s meets its minimum',
    (_theme, _name, result) => {
      expect(result.ratio).toBeGreaterThanOrEqual(result.pair.minimum ?? 0);
      expect(result.passes).toBe(true);
    },
  );
});

describe('checkContrast', () => {
  it('reports a failing pair', () => {
    const [result] = checkContrast([
      {
        name: 'too light',
        kind: 'text',
        minimum: AA.text,
        foreground: () => '#FFFFFF',
        background: () => '#E07A5F',
      },
    ]);
    expect(result?.passes).toBe(false);
  });

  it('never fails informative pairs', () => {
    const [result] = checkContrast([
      {
        name: 'decorative',
        kind: 'informative',
        foreground: () => '#FFFFFF',
        background: () => '#FFFFFF',
      },
    ]);
    expect(result?.ratio).toBe(1);
    expect(result?.passes).toBe(true);
  });
});
