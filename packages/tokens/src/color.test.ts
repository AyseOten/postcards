import { contrastRatio, mix, relativeLuminance } from './color';

describe('relativeLuminance', () => {
  it('is 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBe(0);
    expect(relativeLuminance('#FFFFFF')).toBe(1);
  });

  it('accepts lowercase hex', () => {
    expect(relativeLuminance('#ffffff')).toBe(1);
  });

  it.each(['#FFF', 'FFFFFF', '#GGGGGG', '#FFFFFF00'])('rejects %p', (value) => {
    expect(() => relativeLuminance(value as `#${string}`)).toThrow();
  });
});

describe('contrastRatio', () => {
  it('is 21 for black on white and 1 for equal colors', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21);
    expect(contrastRatio('#9A442D', '#9A442D')).toBe(1);
  });

  it('does not depend on the order', () => {
    expect(contrastRatio('#FFFFFF', '#9A442D')).toBe(contrastRatio('#9A442D', '#FFFFFF'));
  });

  it('matches known WCAG values', () => {
    // #767676 is the lightest gray that passes 4.5:1 on white.
    expect(contrastRatio('#767676', '#FFFFFF')).toBeCloseTo(4.54, 2);
    // The DESIGN.md coral button with white text fails AA (ADR 0004).
    expect(contrastRatio('#FFFFFF', '#E07A5F')).toBeLessThan(4.5);
  });
});

describe('mix', () => {
  it('returns the background at 0 and the foreground at 1', () => {
    expect(mix('#E07A5F', '#FFFFFF', 0)).toBe('#FFFFFF');
    expect(mix('#E07A5F', '#FFFFFF', 1)).toBe('#E07A5F');
  });

  it('blends channels', () => {
    expect(mix('#000000', '#FFFFFF', 0.5)).toBe('#808080');
  });

  it.each([-0.1, 1.1])('rejects opacity %p', (opacity) => {
    expect(() => mix('#000000', '#FFFFFF', opacity)).toThrow();
  });
});
