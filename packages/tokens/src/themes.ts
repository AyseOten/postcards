import { mix, type Hex } from './color';
import { palette as p } from './palette';

export const THEMES = ['light', 'dark'] as const;
export type ThemeName = (typeof THEMES)[number];

export const STATUS_KEYS = ['visited', 'lived', 'wishlist'] as const;
export type StatusKey = (typeof STATUS_KEYS)[number];

export interface StatusColors {
  /** Pastel fill of a marked country on the map. No contrast requirement (decorative). */
  mapFill: Hex;
  /** Outline of a marked country; carries the 3:1 non-text contrast against land and ocean. */
  mapStroke: Hex;
  /** Background of the status chip / legend swatch (pastel tinted surface). */
  chipBackground: Hex;
  /** Text and icon on the status chip. */
  chipText: Hex;
}

export interface ThemeColors {
  background: Hex;
  surface: Hex;
  surfaceMuted: Hex;
  border: Hex;
  controlBorder: Hex;
  text: Hex;
  textMuted: Hex;
  textPlaceholder: Hex;
  accentText: Hex;
  secondaryText: Hex;
  primary: Hex;
  onPrimary: Hex;
  secondary: Hex;
  onSecondary: Hex;
  focusRing: Hex;
  mapOcean: Hex;
  mapLand: Hex;
  mapLandBorder: Hex;
}

export interface Theme {
  colors: ThemeColors;
  status: Record<StatusKey, StatusColors>;
  /** CSS box-shadow values for the three elevation levels in DESIGN.md. */
  elevation: { level1: string; level2: string; level3: string };
}

const light: Theme = {
  colors: {
    background: p.creamPaper,
    surface: p.white,
    surfaceMuted: p.creamMuted,
    border: p.stoneBorder,
    controlBorder: p.stoneControl,
    text: p.warmCharcoal,
    textMuted: p.inkTaupe,
    textPlaceholder: p.inkPlaceholder,
    accentText: p.terracottaDeep,
    secondaryText: p.aegeanDeep,
    primary: p.terracottaDeep,
    onPrimary: p.white,
    secondary: p.aegeanDeep,
    onSecondary: p.white,
    focusRing: p.terracottaDeep,
    mapOcean: p.creamPaper,
    mapLand: p.stoneLand,
    mapLandBorder: p.white,
  },
  status: {
    visited: {
      mapFill: p.terracotta,
      mapStroke: p.terracottaDeep,
      chipBackground: mix(p.terracotta, p.white, 0.14),
      chipText: p.terracottaDeep,
    },
    lived: {
      mapFill: p.mediterraneanSky,
      mapStroke: p.aegeanDeep,
      chipBackground: mix(p.mediterraneanSky, p.white, 0.14),
      chipText: p.aegeanDeep,
    },
    wishlist: {
      mapFill: p.warmOchre,
      mapStroke: p.ochreDeep,
      chipBackground: mix(p.warmOchre, p.white, 0.14),
      chipText: p.ochreDeep,
    },
  },
  elevation: {
    level1: '0 4px 20px -2px rgba(90, 70, 50, 0.05), 0 1px 3px rgba(90, 70, 50, 0.03)',
    level2: '0 12px 28px -4px rgba(90, 70, 50, 0.09), 0 4px 8px -2px rgba(90, 70, 50, 0.04)',
    level3: '0 24px 48px -8px rgba(90, 70, 50, 0.14), 0 8px 16px -4px rgba(90, 70, 50, 0.06)',
  },
};

const dark: Theme = {
  colors: {
    background: p.midnightKraft,
    surface: p.sepiaCard,
    surfaceMuted: p.sepiaMuted,
    border: p.weatheredBorder,
    controlBorder: p.weatheredControl,
    text: p.creamIvory,
    textMuted: p.softHaze,
    textPlaceholder: p.hazePlaceholder,
    accentText: p.terracottaLight,
    secondaryText: p.aegeanLight,
    primary: p.terracottaDeep,
    onPrimary: p.white,
    secondary: p.aegeanDeep,
    onSecondary: p.white,
    focusRing: p.terracottaLight,
    mapOcean: p.midnightKraft,
    mapLand: p.weatheredLand,
    mapLandBorder: p.midnightKraft,
  },
  status: {
    visited: {
      mapFill: p.terracotta,
      mapStroke: p.terracottaLight,
      chipBackground: mix(p.terracotta, p.sepiaCard, 0.22),
      chipText: p.terracottaLight,
    },
    lived: {
      mapFill: p.mediterraneanSky,
      mapStroke: p.aegeanLight,
      chipBackground: mix(p.mediterraneanSky, p.sepiaCard, 0.22),
      chipText: p.aegeanLight,
    },
    wishlist: {
      mapFill: p.warmOchre,
      mapStroke: p.ochreLight,
      chipBackground: mix(p.warmOchre, p.sepiaCard, 0.22),
      chipText: p.ochreLight,
    },
  },
  elevation: {
    level1: '0 4px 24px -2px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(255, 255, 255, 0.02)',
    level2: '0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 4px 8px -2px rgba(0, 0, 0, 0.3)',
    level3: '0 24px 56px -8px rgba(0, 0, 0, 0.6), 0 8px 16px -4px rgba(0, 0, 0, 0.35)',
  },
};

export const themes: Record<ThemeName, Theme> = { light, dark };
