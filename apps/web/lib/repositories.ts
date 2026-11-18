import { LocalPreferencesRepository, type PreferencesRepository } from '@postcards/data';

/**
 * The repositories the web app uses. Components get them from here (or as props in tests)
 * and never touch storage directly (CLAUDE.md). v0.2 swaps in Supabase implementations.
 */
export const preferencesRepository: PreferencesRepository = new LocalPreferencesRepository();
