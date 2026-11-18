import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { DEFAULT_LOCALE, getMessages } from '@postcards/i18n';
import { themes, toCssVariables } from '@postcards/tokens';
import { brandFont } from './fonts';
import './globals.css';

const messages = getMessages(DEFAULT_LOCALE);
const tokenStyles = toCssVariables();

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
    <html lang={DEFAULT_LOCALE} className={brandFont.variable}>
      <head>
        {/* Static design tokens from @postcards/tokens, no user input. */}
        <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
