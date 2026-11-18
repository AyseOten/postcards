import { DEFAULT_LOCALE, getMessages, isLocale, LOCALES } from './index';

function keyPaths(value: object, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === 'object' && child !== null
      ? keyPaths(child, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

describe('messages', () => {
  const trKeys = keyPaths(getMessages('tr')).sort();

  it.each(LOCALES)('%s has exactly the Turkish keys', (locale) => {
    expect(keyPaths(getMessages(locale)).sort()).toEqual(trKeys);
  });

  it.each(LOCALES)('%s has no empty strings', (locale) => {
    const flat = JSON.stringify(getMessages(locale));
    expect(flat).not.toContain('""');
  });
});

describe('getMessages', () => {
  it('defaults to Turkish', () => {
    expect(DEFAULT_LOCALE).toBe('tr');
    expect(getMessages()).toBe(getMessages('tr'));
  });
});

describe('isLocale', () => {
  it.each(LOCALES)('accepts %s', (locale) => {
    expect(isLocale(locale)).toBe(true);
  });

  it.each(['de', 'TR', '', null])('rejects %p', (value) => {
    expect(isLocale(value)).toBe(false);
  });
});
