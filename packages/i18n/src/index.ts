import { en } from './en';
import { tr } from './tr';
import type { Messages } from './types';

export type { Messages } from './types';

export const LOCALES = ['tr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'tr';

const messages: Record<Locale, Messages> = { tr, en };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function getMessages(locale: Locale = DEFAULT_LOCALE): Messages {
  return messages[locale];
}
