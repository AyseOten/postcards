import { Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Brand font, self-hosted by Next.js at build time (no request to Google at runtime).
 * `latin-ext` covers Turkish letters (ş, ğ, İ, ı). The values must be literals for next/font;
 * a test checks they match BRAND_FONT_CSS_VAR and FONT_WEIGHTS in @postcards/tokens.
 */
export const brandFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-brand',
  display: 'swap',
});
