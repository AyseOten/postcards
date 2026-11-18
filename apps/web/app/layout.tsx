import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { themeBootstrapScript } from '@postcards/data';
import { DEFAULT_LOCALE, getMessages } from '@postcards/i18n';
import { THEME_ATTRIBUTE, themes, toCssVariables } from '@postcards/tokens';
import { brandFont } from './fonts';
import './globals.css';

const messages = getMessages(DEFAULT_LOCALE);
const tokenStyles = toCssVariables();
const themeScript = themeBootstrapScript(THEME_ATTRIBUTE);

export const metadata: Metadata = {
  title: messages.app.name,
  description: messages.app.tagline,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: themes.light.colors.background },
    { media: '(prefers-color-scheme: dark)', color: themes.dark.colors.background },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The theme script may set data-theme before React hydrates, hence suppressHydrationWarning.
    <html lang={DEFAULT_LOCALE} className={brandFont.variable} suppressHydrationWarning>
      <head>
        {/* Applies a stored light/dark choice before first paint (from @postcards/data). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Static design tokens from @postcards/tokens, no user input. */}
        <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
