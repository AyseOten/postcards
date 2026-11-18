import type { Hex } from './color';

/**
 * Raw colors from docs/design/design-system/DESIGN.md ("Postcards Warm Pastel").
 * Components never use these directly; they use the semantic theme tokens in themes.ts.
 *
 * Roles (ADR 0003, ADR 0004):
 * - dark tones: buttons, text and accents
 * - pastel tones: map status fills and tinted surfaces
 * Values marked "adjusted" differ from DESIGN.md to meet WCAG AA.
 */
export const palette = {
  // Dark tones (DESIGN.md front matter).
  terracottaDeep: '#9A442D', // primary
  aegeanDeep: '#116588', // secondary
  ochreDeep: '#8E4E14', // tertiary

  // Pastel tones (DESIGN.md prose: travel states).
  terracotta: '#E07A5F', // visited
  mediterraneanSky: '#3D84A8', // lived
  warmOchre: '#F4A261', // wishlist

  // Light tints for dark mode (DESIGN.md front matter: inverse / fixed-dim).
  terracottaLight: '#FFB4A1', // inverse-primary
  aegeanLight: '#8BCFF6', // secondary-fixed-dim
  ochreLight: '#FFB780', // tertiary-fixed-dim

  // Light neutrals (DESIGN.md prose).
  creamPaper: '#FAF8F5',
  white: '#FFFFFF',
  creamMuted: '#F5F1EB',
  stoneBorder: '#ECE7DF',
  stoneLand: '#E8E2D9',
  stoneControl: '#8E8378', // added: form control outline, 3:1
  warmCharcoal: '#2D2621',
  inkTaupe: '#70655B',
  inkPlaceholder: '#74695F', // adjusted from #9C9186 (3.08:1 on white)

  // Dark neutrals (DESIGN.md prose).
  midnightKraft: '#181614',
  sepiaCard: '#221F1C',
  sepiaMuted: '#2B2723',
  weatheredBorder: '#342F2A',
  weatheredLand: '#3A342D',
  weatheredControl: '#857A70', // added: form control outline, 3:1
  creamIvory: '#F3EEE8',
  softHaze: '#A3988F',
  hazePlaceholder: '#9C9186',
} as const satisfies Record<string, Hex>;
