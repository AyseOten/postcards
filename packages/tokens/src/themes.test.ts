import { palette } from './palette';
import { STATUS_KEYS, THEMES, themes } from './themes';

const HEX = /^#[0-9A-F]{6}$/;

describe('palette', () => {
  it('uses uppercase #RRGGBB values', () => {
    for (const value of Object.values(palette)) expect(value).toMatch(HEX);
  });
});

describe('themes', () => {
  it('defines the same keys in every theme', () => {
    const shape = (name: (typeof THEMES)[number]) => ({
      colors: Object.keys(themes[name].colors).sort(),
      status: STATUS_KEYS.map((s) => Object.keys(themes[name].status[s]).sort()),
      elevation: Object.keys(themes[name].elevation).sort(),
    });
    expect(shape('dark')).toEqual(shape('light'));
  });

  it.each(THEMES)('%s uses valid hex colors', (name) => {
    const { colors, status } = themes[name];
    for (const value of Object.values(colors)) expect(value).toMatch(HEX);
    for (const key of STATUS_KEYS) {
      for (const value of Object.values(status[key])) expect(value).toMatch(HEX);
    }
  });

  it.each(THEMES)('%s gives each status its own fill and stroke', (name) => {
    const fills = STATUS_KEYS.map((s) => themes[name].status[s].mapFill);
    const strokes = STATUS_KEYS.map((s) => themes[name].status[s].mapStroke);
    expect(new Set(fills).size).toBe(STATUS_KEYS.length);
    expect(new Set(strokes).size).toBe(STATUS_KEYS.length);
  });

  it('keeps the pastel map fills from DESIGN.md in both themes (ADR 0003)', () => {
    for (const name of THEMES) {
      expect(themes[name].status.visited.mapFill).toBe(palette.terracotta);
      expect(themes[name].status.lived.mapFill).toBe(palette.mediterraneanSky);
      expect(themes[name].status.wishlist.mapFill).toBe(palette.warmOchre);
    }
  });

  it('uses the dark tones for buttons (ADR 0003)', () => {
    for (const name of THEMES) {
      expect(themes[name].colors.primary).toBe(palette.terracottaDeep);
      expect(themes[name].colors.secondary).toBe(palette.aegeanDeep);
    }
  });
});
