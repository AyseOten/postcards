# 0004 – Design tokens and contrast

- **Status:** accepted
- **Date:** 2026-11-18

## Context

`docs/design/design-system/DESIGN.md` ("Postcards Warm Pastel") defines two color sets: dark tones in its front matter and pastel tones in its prose. ADR 0003 assigned roles to them. SPEC.md §7 requires Lighthouse Accessibility ≥ 90 and light and dark mode. Measured against WCAG 2.2 AA, three parts of DESIGN.md fail:

- white text on the coral `#E07A5F` button: 2.95:1 (needs 4.5);
- the placeholder `#9C9186` on white: 3.08:1 (needs 4.5);
- the pastel map fills against land and ocean in light mode: 1.60–2.78:1 (needs 3 for meaningful graphics).

## Decision

1. **Two layers.** `palette.ts` holds the raw colors from DESIGN.md. `themes.ts` maps them to semantic tokens for `light` and `dark`. Components use only semantic tokens (CSS variables on the web).
2. **Roles.**
   - Dark tones are used for buttons (`primary` `#9A442D`, `secondary` `#116588`), accent text and focus rings.
   - Pastel tones are used for map fills and tinted chip backgrounds.
   - In dark mode, accent text and outlines switch to the light tints (`#FFB4A1`, `#8BCFF6`, `#FFB780`).
3. **Map status = pastel fill + dark outline.** The outline (`mapStroke`) carries the 3:1 non-text contrast against land and ocean (SC 1.4.11). The fill stays pastel and has no requirement. Status is also always shown as text in the legend, panel and lists (SC 1.4.1).
4. **Adjusted values.**
   - The placeholder changes to `#74695F` in light mode.
   - A new `controlBorder` color (`#8E8378` light, `#857A70` dark) outlines form controls; the existing border is too light for that.
   - Both are marked in `palette.ts`.
5. **Contrast is code.** `CONTRAST_PAIRS` lists every foreground/background pair the UI may use.
   - A test fails if a required pair drops below AA in either theme.
   - `docs/design/tokens-contrast.md` is generated from the same list, and the `test` script fails if it is out of date.
   - A component that needs a new combination adds the pair first.
6. **Font.** Plus Jakarta Sans is loaded with `next/font/google`. It is downloaded at build time and served by the app, so there is no runtime request to Google. It includes the `latin-ext` subset for Turkish letters. The CSS variable name and weights live in `@postcards/tokens`; a web test checks that `app/fonts.ts` matches them.
7. **Theme switching.**
   - The default follows `prefers-color-scheme`. The user can force light or dark, and the choice is remembered.
   - `data-theme` on `<html>` forces a theme (`THEME_ATTRIBUTE` in tokens).
   - The choice is stored through `PreferencesRepository` (`postcards.preferences.v1`, falling back to the session if storage is blocked).
   - A small inline script from `@postcards/data` applies a stored choice before first paint, so the page never flashes in the wrong theme.

## Consequences

- Changing a color is safe: the contrast test and report show the effect immediately.
- The pastel look is kept on the map and chips; the strongest colors go only where readability needs them.
- `next build` needs network access to fetch the font (CI has it). If that becomes a problem, the font files can be committed and loaded with `next/font/local`.
