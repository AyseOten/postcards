import {
  isCountryCodeFormat,
  isMarkStatus,
  isThemePreference,
  MARK_STATUSES,
  THEME_PREFERENCES,
} from './types';

describe('isMarkStatus', () => {
  it.each(MARK_STATUSES)('accepts %s', (status) => {
    expect(isMarkStatus(status)).toBe(true);
  });

  it.each(['', 'Visited', 'want', null, undefined, 1])('rejects %p', (value) => {
    expect(isMarkStatus(value)).toBe(false);
  });
});

describe('isCountryCodeFormat', () => {
  it.each(['TR', 'JP', 'XK'])('accepts %s', (code) => {
    expect(isCountryCodeFormat(code)).toBe(true);
  });

  it.each(['tr', 'TUR', 'T', '', 'T1', null, 792])('rejects %p', (value) => {
    expect(isCountryCodeFormat(value)).toBe(false);
  });
});

describe('isThemePreference', () => {
  it.each(THEME_PREFERENCES)('accepts %s', (value) => {
    expect(isThemePreference(value)).toBe(true);
  });

  it.each(['auto', 'Dark', '', null, 1])('rejects %p', (value) => {
    expect(isThemePreference(value)).toBe(false);
  });
});
