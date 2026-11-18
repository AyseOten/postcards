import { contrastRatio, type Hex } from './color';
import { STATUS_KEYS, THEMES, themes, type Theme, type ThemeName } from './themes';

/** WCAG 2.2 AA minimums. */
export const AA = {
  /** 1.4.3 Contrast (Minimum), normal text. */
  text: 4.5,
  /** 1.4.11 Non-text Contrast: UI component boundaries, focus indicators, meaningful graphics. */
  nonText: 3,
} as const;

export type PairKind = 'text' | 'non-text' | 'informative';

export interface ContrastPair {
  /** Readable name, e.g. "text / surface". */
  name: string;
  kind: PairKind;
  /** Required ratio; undefined for informative pairs (reported, not enforced). */
  minimum?: number;
  foreground: (theme: Theme) => Hex;
  background: (theme: Theme) => Hex;
}

const text = (
  name: string,
  foreground: ContrastPair['foreground'],
  background: ContrastPair['background'],
): ContrastPair => ({ name, kind: 'text', minimum: AA.text, foreground, background });

const nonText = (
  name: string,
  foreground: ContrastPair['foreground'],
  background: ContrastPair['background'],
): ContrastPair => ({ name, kind: 'non-text', minimum: AA.nonText, foreground, background });

const statusPairs: ContrastPair[] = STATUS_KEYS.flatMap((status) => [
  text(
    `${status}: chipText / chipBackground`,
    (t) => t.status[status].chipText,
    (t) => t.status[status].chipBackground,
  ),
  nonText(
    `${status}: mapStroke / mapLand`,
    (t) => t.status[status].mapStroke,
    (t) => t.colors.mapLand,
  ),
  nonText(
    `${status}: mapStroke / mapOcean`,
    (t) => t.status[status].mapStroke,
    (t) => t.colors.mapOcean,
  ),
  {
    name: `${status}: mapFill / mapLand`,
    kind: 'informative',
    foreground: (t) => t.status[status].mapFill,
    background: (t) => t.colors.mapLand,
  },
]);

/**
 * Every foreground/background combination the UI is allowed to use.
 * A component that needs a new combination adds it here first, so it is checked.
 */
export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  text(
    'text / background',
    (t) => t.colors.text,
    (t) => t.colors.background,
  ),
  text(
    'text / surface',
    (t) => t.colors.text,
    (t) => t.colors.surface,
  ),
  text(
    'text / surfaceMuted',
    (t) => t.colors.text,
    (t) => t.colors.surfaceMuted,
  ),
  text(
    'textMuted / background',
    (t) => t.colors.textMuted,
    (t) => t.colors.background,
  ),
  text(
    'textMuted / surface',
    (t) => t.colors.textMuted,
    (t) => t.colors.surface,
  ),
  text(
    'textMuted / surfaceMuted',
    (t) => t.colors.textMuted,
    (t) => t.colors.surfaceMuted,
  ),
  text(
    'textPlaceholder / surface',
    (t) => t.colors.textPlaceholder,
    (t) => t.colors.surface,
  ),
  text(
    'textPlaceholder / surfaceMuted',
    (t) => t.colors.textPlaceholder,
    (t) => t.colors.surfaceMuted,
  ),
  text(
    'accentText / background',
    (t) => t.colors.accentText,
    (t) => t.colors.background,
  ),
  text(
    'accentText / surface',
    (t) => t.colors.accentText,
    (t) => t.colors.surface,
  ),
  text(
    'secondaryText / background',
    (t) => t.colors.secondaryText,
    (t) => t.colors.background,
  ),
  text(
    'secondaryText / surface',
    (t) => t.colors.secondaryText,
    (t) => t.colors.surface,
  ),
  text(
    'onPrimary / primary',
    (t) => t.colors.onPrimary,
    (t) => t.colors.primary,
  ),
  text(
    'onSecondary / secondary',
    (t) => t.colors.onSecondary,
    (t) => t.colors.secondary,
  ),
  nonText(
    'controlBorder / surface',
    (t) => t.colors.controlBorder,
    (t) => t.colors.surface,
  ),
  nonText(
    'controlBorder / surfaceMuted',
    (t) => t.colors.controlBorder,
    (t) => t.colors.surfaceMuted,
  ),
  nonText(
    'controlBorder / background',
    (t) => t.colors.controlBorder,
    (t) => t.colors.background,
  ),
  nonText(
    'focusRing / background',
    (t) => t.colors.focusRing,
    (t) => t.colors.background,
  ),
  nonText(
    'focusRing / surface',
    (t) => t.colors.focusRing,
    (t) => t.colors.surface,
  ),
  nonText(
    'focusRing / mapLand',
    (t) => t.colors.focusRing,
    (t) => t.colors.mapLand,
  ),
  ...statusPairs,
  {
    name: 'mapLand / mapOcean',
    kind: 'informative',
    foreground: (t) => t.colors.mapLand,
    background: (t) => t.colors.mapOcean,
  },
];

export interface ContrastResult {
  pair: ContrastPair;
  theme: ThemeName;
  foreground: Hex;
  background: Hex;
  ratio: number;
  /** True when the pair meets its minimum (always true for informative pairs). */
  passes: boolean;
}

export function checkContrast(pairs: readonly ContrastPair[] = CONTRAST_PAIRS): ContrastResult[] {
  return THEMES.flatMap((theme) =>
    pairs.map((pair) => {
      const foreground = pair.foreground(themes[theme]);
      const background = pair.background(themes[theme]);
      const ratio = contrastRatio(foreground, background);
      const passes = pair.minimum === undefined || ratio >= pair.minimum;
      return { pair, theme, foreground, background, ratio, passes };
    }),
  );
}
