/** Color helpers used to derive tokens and check WCAG contrast. Pure functions, no platform APIs. */

export type Hex = `#${string}`;

function channels(hex: Hex): [number, number, number] {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match?.[1]) throw new Error(`Expected a #RRGGBB color, got "${hex}"`);
  const value = parseInt(match[1], 16);
  return [(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
}

function toHex(rgb: readonly number[]): Hex {
  return `#${rgb
    .map((c) => Math.round(c).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
}

/**
 * The solid color of `foreground` drawn at `opacity` (0–1) over `background`.
 * Used for tinted chip backgrounds, so their contrast can be checked like any other color.
 */
export function mix(foreground: Hex, background: Hex, opacity: number): Hex {
  if (opacity < 0 || opacity > 1)
    throw new Error(`Opacity must be between 0 and 1, got ${opacity}`);
  const fg = channels(foreground);
  const bg = channels(background);
  return toHex(fg.map((c, i) => c * opacity + (bg[i] ?? 0) * (1 - opacity)));
}

/** WCAG 2.x relative luminance. */
export function relativeLuminance(hex: Hex): number {
  const [r, g, b] = channels(hex).map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio between two colors, from 1 to 21. Order does not matter. */
export function contrastRatio(a: Hex, b: Hex): number {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (light + 0.05) / (dark + 0.05);
}
