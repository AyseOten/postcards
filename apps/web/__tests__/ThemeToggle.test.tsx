import { act, fireEvent, render, screen } from '@testing-library/react';
import type { ThemePreference } from '@postcards/core';
import type { PreferencesRepository } from '@postcards/data';
import { getMessages } from '@postcards/i18n';
import { THEME_ATTRIBUTE } from '@postcards/tokens';
import { applyTheme, ThemeToggle } from '../components/ThemeToggle';

const t = getMessages('tr').theme;

function fakeRepository(initial: ThemePreference = 'system') {
  let stored = initial;
  const repository: PreferencesRepository = {
    getTheme: jest.fn(async () => stored),
    setTheme: jest.fn(async (theme: ThemePreference) => {
      stored = theme;
    }),
  };
  return repository;
}

async function renderToggle(repository: PreferencesRepository) {
  render(<ThemeToggle repository={repository} />);
  await act(async () => {}); // let the stored theme load
}

afterEach(() => {
  document.documentElement.removeAttribute(THEME_ATTRIBUTE);
});

describe('ThemeToggle', () => {
  it('offers system, light and dark in a labelled group', async () => {
    await renderToggle(fakeRepository());
    expect(screen.getByRole('group', { name: t.label })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('defaults to the system setting', async () => {
    await renderToggle(fakeRepository());
    expect(screen.getByRole('radio', { name: t.system })).toBeChecked();
    expect(document.documentElement).not.toHaveAttribute(THEME_ATTRIBUTE);
  });

  it('shows the stored choice', async () => {
    await renderToggle(fakeRepository('dark'));
    expect(screen.getByRole('radio', { name: t.dark })).toBeChecked();
  });

  it('applies and stores a manual choice', async () => {
    const repository = fakeRepository();
    await renderToggle(repository);

    fireEvent.click(screen.getByRole('radio', { name: t.dark }));

    expect(document.documentElement).toHaveAttribute(THEME_ATTRIBUTE, 'dark');
    expect(repository.setTheme).toHaveBeenCalledWith('dark');
    expect(screen.getByRole('radio', { name: t.dark })).toBeChecked();
  });

  it('goes back to following the system', async () => {
    const repository = fakeRepository('light');
    await renderToggle(repository);
    applyTheme('light');

    fireEvent.click(screen.getByRole('radio', { name: t.system }));

    expect(document.documentElement).not.toHaveAttribute(THEME_ATTRIBUTE);
    expect(repository.setTheme).toHaveBeenCalledWith('system');
  });
});
