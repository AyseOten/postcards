import { toCssVariables } from './css';
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
