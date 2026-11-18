import { parseStoredTheme, PREFERENCES_STORAGE_KEY } from './preferences-repository';
import { themeBootstrapScript } from './theme-bootstrap';

/** Runs the inline script against a fake localStorage and <html> element. */
function run(stored: string | null | (() => never)) {
  const attributes = new Map<string, string>();
  const localStorage = {
    getItem: (key: string) => {
      if (typeof stored === 'function') return stored();
      return key === PREFERENCES_STORAGE_KEY ? stored : null;
    },
  };
  const document = {
    documentElement: { setAttribute: (name: string, value: string) => attributes.set(name, value) },
  };
  new Function('localStorage', 'document', themeBootstrapScript('data-theme'))(
    localStorage,
    document,
  );
  return attributes.get('data-theme');
}

describe('themeBootstrapScript', () => {
  it.each(['light', 'dark'])('applies a stored "%s" choice', (theme) => {
    expect(run(JSON.stringify({ theme }))).toBe(theme);
  });

  it.each([null, '{"theme":"system"}', '{"theme":"blue"}', 'not json', 'null'])(
    'sets nothing for %p, so CSS follows the system',
    (stored) => {
      expect(run(stored)).toBeUndefined();
    },
  );

  it('does not throw when storage is blocked', () => {
    expect(
      run(() => {
        throw new Error('SecurityError');
      }),
    ).toBeUndefined();
  });

  it('agrees with parseStoredTheme', () => {
    const samples = [null, '', '{"theme":"light"}', '{"theme":"dark"}', '{"theme":"system"}', 'x'];
    for (const stored of samples) {
      const parsed = parseStoredTheme(stored);
      expect(run(stored)).toBe(parsed === 'system' ? undefined : parsed);
    }
  });

  it('rejects attribute names that are not data-*', () => {
    expect(() => themeBootstrapScript('onload')).toThrow();
    expect(() => themeBootstrapScript('data-theme"><script>')).toThrow();
  });
});
