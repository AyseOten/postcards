import { PREFERENCES_STORAGE_KEY } from './preferences-repository';

/**
 * Inline script for <head> that applies a stored light/dark choice before the first paint,
 * so the page does not flash in the wrong theme. "system" (or nothing stored) sets no
 * attribute and the CSS follows prefers-color-scheme.
 *
 * It lives here, next to the repository, so the storage key and format stay in one place.
 * It mirrors parseStoredTheme for the two forced values; a test checks they agree.
 *
 * @param attribute the attribute the CSS reads on <html>, e.g. "data-theme"
 */
export function themeBootstrapScript(attribute: string): string {
  if (!/^data-[a-z-]+$/.test(attribute)) throw new Error(`Invalid attribute name: ${attribute}`);
  const key = JSON.stringify(PREFERENCES_STORAGE_KEY);
  const attr = JSON.stringify(attribute);
  return `(function(){try{var t=JSON.parse(localStorage.getItem(${key})||"{}").theme;if(t==="light"||t==="dark"){document.documentElement.setAttribute(${attr},t);}}catch(e){}})();`;
}
