export type { MarksRepository } from './marks-repository';
export {
  DEFAULT_THEME,
  LocalPreferencesRepository,
  parseStoredTheme,
  PREFERENCES_STORAGE_KEY,
  type PreferencesRepository,
} from './preferences-repository';
export { browserLocalStorage, type KeyValueStorage } from './storage';
export { themeBootstrapScript } from './theme-bootstrap';
