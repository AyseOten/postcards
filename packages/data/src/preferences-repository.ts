import { isThemePreference, type ThemePreference } from '@postcards/core';
import { browserLocalStorage, type KeyValueStorage } from './storage';

/** localStorage key for user preferences. Bump the version if the stored shape changes. */
export const PREFERENCES_STORAGE_KEY = 'postcards.preferences.v1';

export const DEFAULT_THEME: ThemePreference = 'system';

/** The user's preferences. The UI only talks to this interface. */
export interface PreferencesRepository {
  getTheme(): Promise<ThemePreference>;
  setTheme(theme: ThemePreference): Promise<void>;
}

interface StoredPreferences {
  theme?: unknown;
}

/** Reads the stored theme from a raw localStorage value. Invalid or missing data → "system". */
export function parseStoredTheme(raw: string | null | undefined): ThemePreference {
  if (!raw) return DEFAULT_THEME;
  try {
    const parsed = JSON.parse(raw) as StoredPreferences | null;
    return isThemePreference(parsed?.theme) ? parsed.theme : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

/**
 * Preferences in localStorage (SPEC.md §5.7). Every storage access is wrapped in try/catch:
 * if storage is missing or blocked, the choice is kept in memory for the session.
 */
export class LocalPreferencesRepository implements PreferencesRepository {
  private sessionTheme: ThemePreference | undefined;

  constructor(
    private readonly getStorage: () => KeyValueStorage | undefined = browserLocalStorage,
  ) {}

  async getTheme(): Promise<ThemePreference> {
    if (this.sessionTheme !== undefined) return this.sessionTheme;
    try {
      return parseStoredTheme(this.getStorage()?.getItem(PREFERENCES_STORAGE_KEY));
    } catch {
      return DEFAULT_THEME;
    }
  }

  async setTheme(theme: ThemePreference): Promise<void> {
    if (!isThemePreference(theme)) throw new Error(`Unknown theme preference: ${String(theme)}`);
    this.sessionTheme = theme;
    try {
      this.getStorage()?.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify({ theme }));
    } catch {
      // Storage full or blocked: the session value above still applies.
    }
  }
}
