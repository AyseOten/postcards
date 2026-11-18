import { colors, spacing, THEMES, toCssVariables } from './index';

describe('colors', () => {
  it('defines the same keys for every theme', () => {
    const [first, ...rest] = THEMES.map((theme) => Object.keys(colors[theme]).sort());
    for (const keys of rest) {
      expect(keys).toEqual(first);
    }
  });

  it.each(THEMES)('uses hex values in the %s theme', (theme) => {
    for (const value of Object.values(colors[theme])) {
      expect(value).toMatch(/^#[0-9A-F]{6}$/);
    }
  });
});

describe('toCssVariables', () => {
  const css = toCssVariables();

  it('converts camelCase names to kebab-case custom properties', () => {
    expect(css).toContain(`--color-text-muted:${colors.light.textMuted};`);
    expect(css).toContain(`--color-status-visited:${colors.light.statusVisited};`);
    expect(css).toContain(`--space-md:${spacing.md};`);
    expect(css).toContain('--font-size-xl:');
  });

  it('puts dark colors inside a prefers-color-scheme media query', () => {
    const darkBlock = css.slice(css.indexOf('@media (prefers-color-scheme: dark)'));
    expect(darkBlock).toContain(`--color-background:${colors.dark.background};`);
    expect(darkBlock).not.toContain('--space-');
  });
});
