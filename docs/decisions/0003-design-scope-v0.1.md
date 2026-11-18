# 0003 – Design scope for v0.1

- **Status:** accepted
- **Date:** 2026-11-18

## Context

The Stitch designs in `docs/design/` show more than SPEC.md v0.1 covers, and differ from it in a few places: color sets, the wishlist label, traveler titles and levels, a merged "Amerika" continent, sample collection counts and a landing page. These had to be settled before the `packages/tokens` proposal and Phase 1.

## Decision

1. **Colors:** the dark tones from `DESIGN.md`'s front matter are used for buttons, text and accents. The pastel tones from its prose are used for map status colors (visited, lived, wishlist) and background surfaces. The token proposal lists WCAG AA contrast for every text/background pair.
2. **Wishlist label:** "Gitmek istiyorum" is the main label, and "İstiyorum" is the short form for narrow places (chips, legend). Both are keys in `packages/i18n` (TR and EN). They are added with the map work (SPEC.md §5.1), where they are first used.
3. **Traveler titles:** v0.1 uses only the six titles in SPEC.md §5.4. Levels and badge titles ("Tutkulu Kaşif", "Seviye 4: …") move to v0.3, as gamification.
4. **Continents:** seven continents, with North and South America separate and Antarctica included. The designs' "Amerika" grouping is not used.
5. **Collections:** region membership comes from `packages/core`; the counts in the designs are sample data.
6. **Landing page:** not in v0.1. The app opens directly on the map to meet the 30-second goal (SPEC.md §2). A landing page is considered in v0.2 for SEO and sharing.
7. **Assets:** design files stay in Git without LFS for now.

## Consequences

- Designs are references; v0.1 screens leave out the parts marked v0.2+ in `docs/design/README.md`.
- Because Antarctica is one of the seven continents but has no markable country, the "every continent" collection needs a rule. It is decided with the country data (PR #4) and the passport collections (Phase 1).
