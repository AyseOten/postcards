# Design

Screen designs for Postcards, generated with Google Stitch. Each screen folder has a `screen.png` (screenshot) and a `code.html` (Stitch's HTML/Tailwind export). They are **references for layout and style, not code to copy**: the app builds its own components on `packages/tokens` and `packages/i18n`.

- `mobile/` is the phone layout of the **web app** (v0.1 is web first and most users arrive on a phone; SPEC.md §3). It is not the Expo app (v0.4), though it is a good starting point for it.
- `web/` is the desktop layout of the same web app.
- The sample data in the designs (cities, photos, kilometres, profile names) is illustrative only.

## Screens

| Screen | Folder | What it shows | SPEC.md | In v0.1? |
| --- | --- | --- | --- | --- |
| Map (mobile) | [`mobile/map`](mobile/map/screen.png) | Search, status filter chips with counts, world map with zoom, country card with Gittim / Yaşadım / İstiyorum, recent memories, bottom navigation | §5.1, §5.3 | **Yes**, except the memory cards and photos (v0.2) and city search (v0.2) |
| Stats (mobile) | [`mobile/stats`](mobile/stats/screen.png) | Traveler title and level, visited / lived / continents / wishlist tiles, continent breakdown, first trip and latest country, next badge goal, photos | §5.4 | **Yes**, except photos (v0.2); the level/badge progress is not in the spec |
| Passport stamps (mobile) | [`mobile/passport-stamps`](mobile/passport-stamps/screen.png) | Passport header, earned stamps grid, locked stamps, collections with progress (first 10, 25 countries, Mediterranean, all continents, Balkans, Scandinavia) | §5.5 | **Yes** |
| Country detail (mobile) | [`mobile/country-detail`](mobile/country-detail/screen.png) | Country name, status, earned stamp, first visit year, visit count, note, photos, share button | §5.2 | **Yes** for status, first visit year, note and stamp; visit count, arrival airport and photos are v0.2 (trips, postcards) |
| Share card (mobile) | [`mobile/share-card`](mobile/share-card/screen.png) | 4:5 card preview with country count, world percentage, title, mini map, top stamps; save and share buttons | §5.6 | **Yes** for the 1080×1350 card and download; the 9:16 story format and direct Instagram sharing are not in the spec |
| Home (web) | [`web/home`](web/home/screen.png) | Landing page: hero, live map and stamps preview, "how it works" in three steps, Instagram feed, call to action | §5.8 (partly) | **Open:** v0.1 opens on the map with sample marks; a landing page is not in the spec. The Instagram feed is curated content (v0.3) |
| Map (web) | [`web/map`](web/map/screen.png) | Full map with search, status filters, zoom, map theme switch, side panel with country detail, stamp, notes and photos | §5.1, §5.2, §5.3 | **Yes**, except city pins and photos (v0.2), "add flight" (v0.2 trips) and map themes (not in the spec) |
| Stats and timeline (web) | [`web/stats-timeline`](web/stats-timeline/screen.png) | Profile header, stat tiles, continent and region breakdown, travel timeline per year, travel style, photo archive, JSON/CSV export | §5.4 | **Partly**: the stat tiles and continent breakdown are v0.1; the trip timeline with days and distance is v0.2 (trips), the photo archive is v0.2, and export is not in the spec |
| Passport book (web) | [`web/passport-book`](web/passport-book/screen.png) | Stamp album with filters and tabs, collections sidebar, "25 countries club" progress, printable book and PDF download | §5.5 | **Yes** for stamps and collections; the PDF download and printable book are not in the spec |
| Share studio (web) | [`web/share-studio`](web/share-studio/screen.png) | Card editor: format (4:5, 9:16, 16:9), theme, which blocks to show, slogan, choice of four stamps, live preview, PNG download | §5.6 | **Partly**: v0.1 has one 1080×1350 card and a download button; formats, themes and editing are beyond the spec |
| Design system | [`design-system/DESIGN.md`](design-system/DESIGN.md) | "Postcards Warm Pastel": colors (light and dark), typography (Plus Jakarta Sans), spacing, radii, components | ARCHITECTURE.md §11, Phase 1 step 9 | **Yes**: input for the `packages/tokens` proposal |

## References

| File | What it is |
| --- | --- |
| [`references/pastel-travel-memories-board.png`](references/pastel-travel-memories-board.png) | Inspiration board, not a Stitch output. It shows the pastel mood and also later features: profile, cities, "create postcard" (v0.2), explore and social (v0.5). |

## Differences to resolve before the token proposal and Phase 1

1. **The colors in `DESIGN.md` disagree with each other.** The YAML front matter has `primary #9a442d`, `secondary #116588` and `tertiary #8e4e14`, while the prose describes Terracotta `#E07A5F`, Mediterranean Sky `#3D84A8` and Warm Ochre `#F4A261` as the visited / lived / wishlist colors. The screens use the darker front-matter values for buttons. Both sets are needed (actions vs. map states), and contrast must be checked (SPEC.md §7: Accessibility ≥ 90).
2. **Status label:** most designs say "İstiyorum", the web map filter says "Gitmek İstiyorum" and SPEC.md §5.1 says "Gitmek istiyorum".
3. **Traveler titles:** the designs use "Tutkulu Kaşif", "Altın Kaşif" and levels ("Seviye 4: Kıtalararası Gezgin"); SPEC.md §5.4 defines six titles by country count and no levels.
4. **Continents:** the stats designs merge North and South America into "Amerika"; the data and the spec use seven continents.
5. **Collections:** the designs show "Balkan Turu 3/6" and "Akdeniz Rüyası 5/5", which do not match the region lists proposed in PR #4. "Bütün Kıtalar" lists Antarctica as remaining, but no country can be marked there (ADR 0002).
6. **Font:** Plus Jakarta Sans has to be loaded (e.g. with `next/font`); the current tokens use system fonts.
