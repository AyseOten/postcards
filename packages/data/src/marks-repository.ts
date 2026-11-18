import type { CountryCode, CountryMark } from '@postcards/core';

/**
 * Access to the user's country marks. The UI only talks to this interface.
 * v0.1: LocalMarksRepository (localStorage). v0.2: Supabase implementation.
 */
export interface MarksRepository {
  list(): Promise<CountryMark[]>;
  /** Inserts the mark, or replaces the existing mark with the same country code. */
  upsert(mark: CountryMark): Promise<void>;
  remove(code: CountryCode): Promise<void>;
}
