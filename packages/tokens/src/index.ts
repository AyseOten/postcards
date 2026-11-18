/**
 * Design tokens shared by web and mobile.
 * Placeholder palette for Phase 0; the final design is applied in Phase 1 (step 9).
 */

export const THEMES = ['light', 'dark'] as const;
export type ThemeName = (typeof THEMES)[number];

export interface ColorTokens {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  countryDefault: string;
  statusVisited: string;
  statusLived: string;
  statusWishlist: string;
}

export const colors: Record<ThemeName, ColorTokens> = {
  light: {
    background: '#FBF7F0',
    surface: '#FFFFFF',
    text: '#1F1B16',
    textMuted: '#655E55',
    border: '#E6DED2',
    accent: '#B4472A',
    countryDefault: '#E6DED2',
    statusVisited: '#2F7D6D',
    statusLived: '#B4472A',
    statusWishlist: '#D9962B',
  },
  dark: {
    background: '#17140F',
    surface: '#221E18',
    text: '#F4EFE7',
    textMuted: '#B3AA9D',
    border: '#3A342B',
    accent: '#E8805F',
    countryDefault: '#3A342B',
    statusVisited: '#5DB8A4',
    statusLived: '#E8805F',
    statusWishlist: '#F0BA5A',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

export const radii = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  full: '9999px',
} as const;

export const fontFamily = {
  body: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  display: 'Georgia, "Times New Roman", serif',
} as const;

export const fontSize = {
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '28px',
  xxl: '40px',
} as const;

function toKebab(name: string): string {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function declarations(prefix: string, values: Record<string, string>): string[] {
  return Object.entries(values).map(([key, value]) => `--${prefix}-${toKebab(key)}:${value};`);
}

/**
 * CSS custom properties for the web app: light values on :root,
 * dark values when the system prefers a dark color scheme.
 * Example: colors.light.textMuted → --color-text-muted.
 */
export function toCssVariables(): string {
  const shared = [
    ...declarations('space', spacing),
    ...declarations('radius', radii),
    ...declarations('font', fontFamily),
    ...declarations('font-size', fontSize),
  ];
  const light = [...declarations('color', { ...colors.light }), ...shared].join('');
  const dark = declarations('color', { ...colors.dark }).join('');
  return `:root{${light}}@media (prefers-color-scheme: dark){:root{${dark}}}`;
}
