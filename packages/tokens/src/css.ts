import { fontFamily, minTapSize, radii, spacing, textStyles } from './scale';
import { STATUS_KEYS, themes, type Theme } from './themes';

function kebab(name: string): string {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function declarations(prefix: string, values: Record<string, string>): string[] {
  return Object.entries(values).map(([key, value]) => `--${prefix}-${kebab(key)}:${value};`);
}

function themeDeclarations(theme: Theme): string[] {
  return [
    ...declarations('color', { ...theme.colors }),
    ...STATUS_KEYS.flatMap((status) =>
      declarations(`status-${status}`, { ...theme.status[status] }),
    ),
    ...declarations('elevation', theme.elevation),
  ];
}

function sharedDeclarations(): string[] {
  return [
    ...declarations('space', spacing),
    ...declarations('radius', radii),
    ...declarations('font', fontFamily),
    `--min-tap-size:${minTapSize};`,
    ...Object.entries(textStyles).flatMap(([style, values]) =>
      declarations(`text-${kebab(style)}`, { ...values }),
    ),
  ];
}

/**
 * Attribute on <html> that forces a theme: `data-theme="light"` or `data-theme="dark"`.
 * Without it the page follows the system setting (prefers-color-scheme).
 */
export const THEME_ATTRIBUTE = 'data-theme';

/**
 * CSS custom properties for the web app.
 * - :root has the light values and the shared scale.
 * - When the system prefers dark and no light theme is forced, the dark values apply.
 * - `[data-theme="dark"]` forces dark; `[data-theme="light"]` forces light.
 * Examples: colors.textMuted → --color-text-muted, status.visited.mapStroke →
 * --status-visited-map-stroke, textStyles.bodyMd.fontSize → --text-body-md-font-size.
 */
export function toCssVariables(): string {
  const light = [...themeDeclarations(themes.light), ...sharedDeclarations()].join('');
  const dark = themeDeclarations(themes.dark).join('');
  const attr = THEME_ATTRIBUTE;
  return [
    `:root{color-scheme:light dark;${light}}`,
    `@media (prefers-color-scheme: dark){:root:not([${attr}="light"]){color-scheme:dark;${dark}}}`,
    `:root[${attr}="dark"]{color-scheme:dark;${dark}}`,
    `:root[${attr}="light"]{color-scheme:light;}`,
  ].join('');
}
