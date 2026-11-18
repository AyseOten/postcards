# Spec: Postcards v0.1 – Map & Passport

Read `ARCHITECTURE.md` first. This spec covers Phase 0 (foundation) and Phase 1 (v0.1).

## 1. Problem

Travelers want a fun, visual way to see where they have been and where they want to go, and to share it. Most travel-map apps ask for sign-up first and stop at coloring a map, so people use them once and forget them.

## 2. Goal

A first-time visitor marks a few countries and sees fun stats, earned stamps and a shareable card within 30 seconds, with no sign-up. Collections give a reason to come back and add more.

## 3. Users

Turkish-speaking travelers aged roughly 20–40 who follow travel accounts on Instagram (e.g. @postcards.fromworld). Most arrive on a phone from an Instagram link. UI in Turkish by default, English available.

## 4. Phase 0 – Foundation

- [ ] pnpm + Turborepo monorepo with `apps/web`, `packages/core`, `packages/data`, `packages/tokens`, `packages/i18n` (see `ARCHITECTURE.md` §5).
- [ ] TypeScript strict, ESLint, Jest in every package; `pnpm lint`, `pnpm test`, `pnpm build` at the root.
- [ ] GitHub Actions: lint, test and build on every pull request.
- [ ] Country reference data in `packages/core`: ISO alpha-2 code, Turkish and English name, continent, regions (e.g. Mediterranean, Balkans, Scandinavia). Source the list from a maintained dataset and document the source.
- [ ] Map geometry from `world-atlas` (countries-110m) with numeric → alpha-2 mapping, projected with d3-geo in `packages/core`.

## 5. Phase 1 – Features

### 5.1 World map
- SVG world map. Tap a country → a small panel to choose **Gittim** (visited), **Yaşadım** (lived) or **Gitmek istiyorum** (wishlist), or remove.
- Each status has its own color; a legend shows them.
- Keyboard accessible: regions focusable, Enter opens the panel.
- Zoom in/out and reset.

### 5.2 Country detail
- Opens from the map or the list: country name, status, optional first visit year, optional short note (max 280 characters).
- Shows the earned stamp for visited/lived countries.

### 5.3 Search and lists
- Search with suggestions (Turkish and English names, case- and accent-insensitive) to add countries that are hard to tap.
- Lists grouped by status, sorted with Turkish collation, each item removable.

### 5.4 Travel stats
- Countries visited (visited + lived), percentage of the world (out of 198: the 193 UN members, Vatican, Palestine, Kosovo, Taiwan and Northern Cyprus; see `docs/decisions/0005-cyprus-and-de-facto-states.md`), continents visited (out of 7; Antarctica can be marked as a special region).
- Most visited continent, first trip (earliest first visit year), latest country added, countries lived in, wishlist size.
- Traveler title: 0 "Yola çıkmaya hazır", 1–4 "Hafta Sonu Kâşifi", 5–14 "Pasaport Koleksiyoncusu", 15–29 "Sınır Avcısı", 30–49 "Dünya Gezgini", 50+ "Efsane Göçebe".

### 5.5 Digital passport
- A stamp for every visited or lived country.
- Collections with progress: first 5, 10, 25, 50 countries; every continent; regions (Mediterranean, Balkans, Scandinavia & Nordics, Southeast Asia, South America).
- When a collection is completed, show a short celebration.
- Stamps and collections are computed from marks (`getStamps`, `getCollections`); nothing extra is stored.

### 5.6 Share card
- 1080×1350 PNG: title, country count, world percentage, continents, top stamps, brand line "postcardsfrom.world".
- Download button; long-press works on mobile.

### 5.7 Persistence
- `LocalMarksRepository` using localStorage key `postcards.marks.v1`.
- All storage access wrapped in try/catch; the app works for the session if storage is unavailable.

### 5.8 First visit
- If nothing is stored, show sample marks with a notice and a "Örnekleri temizle" button. The first real action replaces the samples.

### 5.9 Analytics
- Events: `country_marked` (status), `collection_completed`, `card_downloaded`, `return_visit`. Behind a small `track()` wrapper so the provider can change.

## 6. Out of scope for v0.1

Sign-in, trips, cities, postcards and photos, day plans, public profiles, community. See `ARCHITECTURE.md` §2 for the phase of each.

## 7. Acceptance criteria

- [ ] Marking a country updates the map color, stats, title, stamps and collections immediately.
- [ ] The countries colored on the map always match the lists.
- [ ] Searching "japonya", "Japan" or "JAPONYA" finds Japonya.
- [ ] Reloading keeps all marks, years and notes.
- [ ] With storage blocked, the app still works for the session.
- [ ] Completing "first 5 countries" shows the celebration once.
- [ ] The downloaded card is 1080×1350 and shows current numbers.
- [ ] Works at 360px width with no horizontal scroll; light and dark mode.
- [ ] Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 90.
- [ ] Unit tests cover every function in `packages/core` and `LocalMarksRepository`.
- [ ] CI passes on the pull request.
