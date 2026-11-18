import { THEME_ATTRIBUTE, toCssVariables } from './css';
import { renderContrastReport } from './report';
import { BRAND_FONT_CSS_VAR, spacing, textStyles } from './scale';
import { themes } from './themes';

describe('toCssVariables', () => {
  const css = toCssVariables();
  const darkStart = css.indexOf('@media (prefers-color-scheme: dark)');
  const lightBlock = css.slice(0, darkStart);
  const darkBlock = css.slice(darkStart);

  it('puts light colors and the shared scale on :root', () => {
    expect(lightBlock).toContain(`--color-text-muted:${themes.light.colors.textMuted};`);
    expect(lightBlock).toContain(`--space-md:${spacing.md};`);
    expect(lightBlock).toContain(`--text-body-md-font-size:${textStyles.bodyMd.fontSize};`);
    expect(lightBlock).toContain('--radius-full:9999px;');
    expect(lightBlock).toContain('--min-tap-size:44px;');
  });

  it('exposes status colors per status', () => {
    expect(lightBlock).toContain(
      `--status-visited-map-stroke:${themes.light.status.visited.mapStroke};`,
    );
    expect(lightBlock).toContain(
      `--status-wishlist-chip-background:${themes.light.status.wishlist.chipBackground};`,
    );
  });

  it('puts only theme values in the dark media query', () => {
    expect(darkBlock).toContain(`--color-background:${themes.dark.colors.background};`);
    expect(darkBlock).toContain(`--status-lived-chip-text:${themes.dark.status.lived.chipText};`);
    expect(darkBlock).not.toContain('--space-');
  });

  it('uses the brand font variable with fallbacks', () => {
    expect(css).toContain(`--font-body:var(${BRAND_FONT_CSS_VAR}, "Plus Jakarta Sans"), system-ui`);
  });

  it('declares support for both color schemes', () => {
    expect(lightBlock).toContain('color-scheme:light dark;');
  });
});

describe('toCssVariables theme switching', () => {
  const css = toCssVariables();
  const block = (selector: string) => {
    const start = css.indexOf(`${selector}{`);
    expect(start).toBeGreaterThanOrEqual(0);
    return css.slice(start + selector.length + 1, css.indexOf('}', start));
  };

  it('uses the data-theme attribute', () => {
    expect(THEME_ATTRIBUTE).toBe('data-theme');
  });

  it('follows the system only when light is not forced', () => {
    expect(css).toContain(
      '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){color-scheme:dark;',
    );
  });

  it('forces dark with data-theme="dark", with every dark color', () => {
    const forced = block(':root[data-theme="dark"]');
    expect(forced).toContain('color-scheme:dark;');
    for (const [key, value] of Object.entries(themes.dark.colors)) {
      expect(forced).toContain(`:${value};`);
      expect(forced).toContain(`--color-${key.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)}:`);
    }
  });

  it('forces light with data-theme="light"', () => {
    expect(block(':root[data-theme="light"]')).toBe('color-scheme:light;');
  });

  it('declares the forced dark block after the media query so it wins', () => {
    expect(css.indexOf(':root[data-theme="dark"]')).toBeGreaterThan(
      css.indexOf('@media (prefers-color-scheme: dark)'),
    );
  });
});

describe('renderContrastReport', () => {
  const report = renderContrastReport();

  it('has a section for each kind of pair', () => {
    expect(report).toContain('## Text on backgrounds');
    expect(report).toContain('## Non-text: controls, focus and map outlines');
    expect(report).toContain('## Informative (not required)');
  });

  it('has no failing pair', () => {
    expect(report).not.toContain('❌');
  });

  it('is deterministic', () => {
    expect(renderContrastReport()).toBe(report);
  });
});
