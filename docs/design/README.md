# Design

Screen designs for Postcards, generated with Google Stitch. Each screen folder has a `screen.png` (screenshot) and a `code.html` (Stitch's HTML/Tailwind export). They are **references for layout and style, not code to copy**: the app builds its own components on `packages/tokens` and `packages/i18n`.

- `mobile/` is the phone layout of the **web app** (v0.1 is web first and most users arrive on a phone; SPEC.md §3). It is not the Expo app (v0.4), though it is a good starting point for it.
- `web/` is the desktop layout of the same web app.
- The sample data in the designs (cities, photos, kilometres, profile names) is illustrative only.

## Screens

| Screen | Folder | What it shows | SPEC.md | In v0.1? |
| --- | --- | --- | --- | --- |
| Map (mobile) | [`mobile/map`](mobile/map/screen.png) | Search, status filter chips with counts, world map with zoom, country card with Gittim / Yaşadım / İstiyorum, recent memories, bottom navigation | §5.1, §5.3 | **Yes**, except the memory cards and photos (v0.2) and city search (v0.2) |
| Stats (mobile) | [`mobile/stats`](mobile/stats/screen.png) | Traveler title and level, visited / lived / continents / wishlist tiles, continent breakdown, first trip and latest country, next badge goal, photos | §5.4 | **Yes**, except photos (v0.2) and the level/badge progress (v0.3) |
| Passport stamps (mobile) | [`mobile/passport-stamps`](mobile/passport-stamps/screen.png) | Passport header, earned stamps grid, locked stamps, collections with progress (first 10, 25 countries, Mediterranean, all continents, Balkans, Scandinavia) | §5.5 | **Yes** |
| Country detail (mobile) | [`mobile/country-detail`](mobile/country-detail/screen.png) | Country name, status, earned stamp, first visit year, visit count, note, photos, share button | §5.2 | **Yes** for status, first visit year, note and stamp; visit count, arrival airport and photos are v0.2 (trips, postcards) |
| Share card (mobile) | [`mobile/share-card`](mobile/share-card/screen.png) | 4:5 card preview with country count, world percentage, title, mini map, top stamps; save and share buttons | §5.6 | **Yes** for the 1080×1350 card and download; the 9:16 story format and direct Instagram sharing are not in the spec |
| Home (web) | [`web/home`](web/home/screen.png) | Landing page: hero, live map and stamps preview, "how it works" in three steps, Instagram feed, call to action | — | **v0.2**: v0.1 opens directly on the map (SPEC.md §2, 30-second goal). The landing page will be considered in v0.2 for SEO and sharing; the Instagram feed is curated content (v0.3) |
| Map (web) | [`web/map`](web/map/screen.png) | Full map with search, status filters, zoom, map theme switch, side panel with country detail, stamp, notes and photos | §5.1, §5.2, §5.3 | **Yes**, except city pins and photos (v0.2), "add flight" (v0.2 trips) and map themes (not in the spec) |
| Stats and timeline (web) | [`web/stats-timeline`](web/stats-timeline/screen.png) | Profile header, stat tiles, continent and region breakdown, travel timeline per year, travel style, photo archive, JSON/CSV export | §5.4 | **Partly**: the stat tiles and continent breakdown are v0.1; the trip timeline with days and distance is v0.2 (trips), the photo archive is v0.2, and export is not in the spec |
| Passport book (web) | [`web/passport-book`](web/passport-book/screen.png) | Stamp album with filters and tabs, collections sidebar, "25 countries club" progress, printable book and PDF download | §5.5 | **Yes** for stamps and collections; the PDF download and printable book are not in the spec |
| Share studio (web) | [`web/share-studio`](web/share-studio/screen.png) | Card editor: format (4:5, 9:16, 16:9), theme, which blocks to show, slogan, choice of four stamps, live preview, PNG download | §5.6 | **Partly**: v0.1 has one 1080×1350 card and a download button; formats, themes and editing are beyond the spec |
| Design system | [`design-system/DESIGN.md`](design-system/DESIGN.md) | "Postcards Warm Pastel": colors (light and dark), typography (Plus Jakarta Sans), spacing, radii, components | ARCHITECTURE.md §11, Phase 1 step 9 | **Yes**: input for the `packages/tokens` proposal |

## References

| File | What it is |
| --- | --- |
| [`references/pastel-travel-memories-board.png`](references/pastel-travel-memories-board.png) | Inspiration board, not a Stitch output. It shows the pastel mood and also later features: profile, cities, "create postcard" (v0.2), explore and social (v0.5). |

## Decisions

The differences between the designs and the spec were resolved on 2026-11-18; see [ADR 0003](../decisions/0003-design-scope-v0.1.md).

| Topic | In the designs | Decision |
| --- | --- | --- |
| Colors | `DESIGN.md` front matter (`#9a442d`, `#116588`, `#8e4e14`) and prose (`#E07A5F`, `#3D84A8`, `#F4A261`) disagree | **Both:** dark tones for buttons, text and accents; pastel tones for map status colors and background surfaces. Contrast for every pair: [`tokens-contrast.md`](tokens-contrast.md) (ADR 0004). |
| Wishlist label | "İstiyorum" in most screens | **"Gitmek istiyorum"** is the main label; **"İstiyorum"** is the short form for chips and the legend. Both come from `packages/i18n`. |
| Traveler titles | "Tutkulu Kaşif", "Altın Kaşif", levels | **v0.1 uses the six titles in SPEC.md §5.4.** Levels and badge titles move to v0.3 (ARCHITECTURE.md §11). |
| Continents | "Amerika" as one continent | **Seven continents** (North and South America separate, Antarctica included). |
| Collections | "Balkan Turu 3/6", "Akdeniz Rüyası 5/5" | **Sample data only.** Region lists come from `packages/core` (PR #4). |
| Home page | Landing page (`web/home`) | **Not in v0.1**; the app opens on the map. Considered in v0.2. |
| Font | Plus Jakarta Sans | To be loaded with the token work (e.g. `next/font`). |
| File size | ~7.7 MB of PNG/HTML | No Git LFS for now. |
