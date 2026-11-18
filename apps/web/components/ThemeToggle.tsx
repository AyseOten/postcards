'use client';

import { useEffect, useId, useState } from 'react';
import { THEME_PREFERENCES, type ThemePreference } from '@postcards/core';
import type { PreferencesRepository } from '@postcards/data';
import { getMessages } from '@postcards/i18n';
import { THEME_ATTRIBUTE } from '@postcards/tokens';
import { preferencesRepository } from '../lib/repositories';
import styles from './ThemeToggle.module.css';

/** Sets or clears the forced theme on <html>; "system" lets CSS follow prefers-color-scheme. */
export function applyTheme(theme: ThemePreference, root: HTMLElement = document.documentElement) {
  if (theme === 'system') root.removeAttribute(THEME_ATTRIBUTE);
  else root.setAttribute(THEME_ATTRIBUTE, theme);
}

interface ThemeToggleProps {
  repository?: PreferencesRepository;
}

/** System / light / dark switch. The choice is stored through the preferences repository. */
export function ThemeToggle({ repository = preferencesRepository }: ThemeToggleProps) {
  const messages = getMessages();
  const name = useId();
  const [theme, setTheme] = useState<ThemePreference>('system');

  useEffect(() => {
    let active = true;
    repository.getTheme().then((stored) => {
      if (active) setTheme(stored);
    });
    return () => {
      active = false;
    };
  }, [repository]);

  function choose(next: ThemePreference) {
    setTheme(next);
    applyTheme(next);
    void repository.setTheme(next);
  }

  return (
    <fieldset className={styles.toggle}>
      <legend className={styles.legend}>{messages.theme.label}</legend>
      {THEME_PREFERENCES.map((option) => (
        <label key={option} className={styles.option}>
          <input
            className={styles.input}
            type="radio"
            name={name}
            value={option}
            checked={theme === option}
            onChange={() => choose(option)}
          />
          <span>{messages.theme[option]}</span>
        </label>
      ))}
    </fieldset>
  );
}
