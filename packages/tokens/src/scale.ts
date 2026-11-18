/** Typography, spacing and shape scales from docs/design/design-system/DESIGN.md. */

/**
 * Name of the CSS custom property that holds the loaded brand font.
 * The web app passes the same name to next/font (`variable`), checked by a test there.
 */
export const BRAND_FONT_CSS_VAR = '--font-brand';

export const fontFamily = {
  /** Plus Jakarta Sans when loaded, then system fonts. */
  body: `var(${BRAND_FONT_CSS_VAR}, "Plus Jakarta Sans"), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`,
} as const;

/** Font weights to load for the brand font (DESIGN.md uses 400–800). */
export const FONT_WEIGHTS = ['400', '500', '600', '700', '800'] as const;

export interface TextStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
}

export const textStyles = {
  displayLg: { fontSize: '40px', lineHeight: '48px', fontWeight: '800', letterSpacing: '-0.02em' },
  displayLgMobile: {
    fontSize: '30px',
    lineHeight: '38px',
    fontWeight: '800',
    letterSpacing: '-0.02em',
  },
  headlineLg: {
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: '700',
    letterSpacing: '-0.015em',
  },
  headlineSm: { fontSize: '20px', lineHeight: '28px', fontWeight: '700', letterSpacing: '0' },
  titleMd: { fontSize: '17px', lineHeight: '24px', fontWeight: '600', letterSpacing: '0' },
  bodyLg: { fontSize: '16px', lineHeight: '24px', fontWeight: '400', letterSpacing: '0' },
  bodyMd: { fontSize: '14px', lineHeight: '20px', fontWeight: '400', letterSpacing: '0' },
  labelMd: { fontSize: '12px', lineHeight: '16px', fontWeight: '600', letterSpacing: '0.02em' },
  labelSm: { fontSize: '11px', lineHeight: '14px', fontWeight: '700', letterSpacing: '0.04em' },
} as const satisfies Record<string, TextStyle>;

/** 4px/8px rhythm. */
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '36px',
  gutter: '20px',
  gutterMobile: '12px',
  margin: '32px',
  marginMobile: '16px',
} as const;

export const radii = {
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

/** Minimum touch target (DESIGN.md: 44px). */
export const minTapSize = '44px';
