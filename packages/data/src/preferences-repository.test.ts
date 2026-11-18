import type { ThemePreference } from '@postcards/core';
import {
  DEFAULT_THEME,
  LocalPreferencesRepository,
  parseStoredTheme,
  PREFERENCES_STORAGE_KEY,
} from './preferences-repository';
import type { KeyValueStorage } from './storage';

function memoryStorage(initial: Record<string, string> = {}) {
  const items = new Map(Object.entries(initial));
  const storage: KeyValueStorage = {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => {
      items.set(key, value);
    },
  };
  return { storage, items };
}

const throwingStorage: KeyValueStorage = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('QuotaExceededError');
  },
};

describe('parseStoredTheme', () => {
  it.each<[string | null | undefined, ThemePreference]>([
    [null, 'system'],
    [undefined, 'system'],
    ['', 'system'],
    ['{"theme":"dark"}', 'dark'],
    ['{"theme":"light"}', 'light'],
    ['{"theme":"system"}', 'system'],
    ['{"theme":"blue"}', 'system'],
    ['{"theme":1}', 'system'],
    ['null', 'system'],
    ['not json', 'system'],
  ])('%p → %s', (raw, expected) => {
    expect(parseStoredTheme(raw)).toBe(expected);
  });
});

describe('LocalPreferencesRepository', () => {
  it('defaults to "system"', async () => {
    const { storage } = memoryStorage();
    expect(DEFAULT_THEME).toBe('system');
    await expect(new LocalPreferencesRepository(() => storage).getTheme()).resolves.toBe('system');
  });

  it('stores the choice under postcards.preferences.v1', async () => {
    const { storage, items } = memoryStorage();
    await new LocalPreferencesRepository(() => storage).setTheme('dark');
    expect(PREFERENCES_STORAGE_KEY).toBe('postcards.preferences.v1');
    expect(items.get(PREFERENCES_STORAGE_KEY)).toBe('{"theme":"dark"}');
  });

  it('remembers the choice across instances (page reloads)', async () => {
    const { storage } = memoryStorage();
    await new LocalPreferencesRepository(() => storage).setTheme('light');
    await expect(new LocalPreferencesRepository(() => storage).getTheme()).resolves.toBe('light');
  });

  it('ignores invalid stored data', async () => {
    const { storage } = memoryStorage({ [PREFERENCES_STORAGE_KEY]: '{broken' });
    await expect(new LocalPreferencesRepository(() => storage).getTheme()).resolves.toBe('system');
  });

  it('works for the session when storage is missing', async () => {
    const repository = new LocalPreferencesRepository(() => undefined);
    await expect(repository.getTheme()).resolves.toBe('system');
    await repository.setTheme('dark');
    await expect(repository.getTheme()).resolves.toBe('dark');
  });

  it('works for the session when storage throws', async () => {
    const repository = new LocalPreferencesRepository(() => throwingStorage);
    await expect(repository.getTheme()).resolves.toBe('system');
    await expect(repository.setTheme('light')).resolves.toBeUndefined();
    await expect(repository.getTheme()).resolves.toBe('light');
  });

  it('rejects unknown values', async () => {
    const repository = new LocalPreferencesRepository(() => undefined);
    await expect(repository.setTheme('blue' as ThemePreference)).rejects.toThrow();
  });
});
