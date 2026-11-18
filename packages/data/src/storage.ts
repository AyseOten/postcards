/** The part of the Web Storage API the local repositories need. */
export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * Returns window.localStorage, or undefined when it does not exist (server, tests)
 * or when the browser blocks it (private mode, disabled cookies: accessing it throws).
 */
export function browserLocalStorage(): KeyValueStorage | undefined {
  try {
    return (globalThis as { localStorage?: KeyValueStorage }).localStorage;
  } catch {
    return undefined;
  }
}
