import type { tr } from './tr';

type Widen<T> = { -readonly [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

/** Shape of every locale's messages, derived from the Turkish strings. */
export type Messages = Widen<typeof tr>;
