---
name: Postcards Warm Pastel
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e4e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#55423e'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f0ed'
  outline: '#88726d'
  outline-variant: '#dbc1ba'
  surface-tint: '#9a442d'
  primary: '#9a442d'
  on-primary: '#ffffff'
  primary-container: '#e07a5f'
  on-primary-container: '#5b1604'
  inverse-primary: '#ffb4a1'
  secondary: '#116588'
  on-secondary: '#ffffff'
  secondary-container: '#94d7ff'
  on-secondary-container: '#005f81'
  tertiary: '#8e4e14'
  on-tertiary: '#ffffff'
  tertiary-container: '#d18547'
  on-tertiary-container: '#4c2500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd2'
  primary-fixed-dim: '#ffb4a1'
  on-primary-fixed: '#3c0800'
  on-primary-fixed-variant: '#7c2e19'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#8bcff6'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#ffb780'
  on-tertiary-fixed: '#2f1400'
  on-tertiary-fixed-variant: '#6f3800'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2df'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system channels tactile wanderlust, nostalgic stationery, and modern digital craft. Rooted in the experience of collecting memories across borders, the interface pairs the warmth of vintage paper goods—airmail edges, perforated postage stamps, delicate cancel marks, and wash tape—with clean, responsive layout architecture.

The tone is inviting, cheerful, reflective, and uncluttered. It honors travel as a personal, romantic storybook rather than an aggressive checklist or high-stress tracker. 

### Visual Paradigm
- **Tactile Papercraft & Stationery:** Soft, warm paper finishes, micro-angled card drops (subtle 1–2° tilt accents on hero postcards), and delicately scored perforated or dashed borders.
- **Friendly Modernism:** Rounded geometry with balanced proportions, generous touch targets, and open negative space.
- **Wanderlust Accents:** Circular postal cancellation glyphs, passport stamp badges, and watercolor pastel accents that evoke travel souvenirs without compromising UI utility.

## Colors

The palette draws inspiration from sun-bleached travel ephemera, terracotta coastlines, Aegean waters, and golden desert sand.

### Functional Roles & Travel States
- **Primary / Terracotta (`#E07A5F`):** Core interactive focal points, primary action triggers, and the **"Gittim / Visited"** journey status. Communicates warmth, completion, and personal presence.
- **Secondary / Mediterranean Sky (`#3D84A8`):** Informational accents, active nav indicators, and the **"Yaşadım / Lived"** state. Evokes stability, depth of residency, and overseas discovery.
- **Tertiary / Warm Ochre (`#F4A261`):** Badges, stars, highlights, and the **"Gitmek istiyorum / Wishlist"** state. Radiates optimism, anticipation, and sunny aspiration.
- **Canvas & Neutrals:**
  - **Light Mode Canvas:** Cream Paper (`#FAF8F5`) with card container white (`#FFFFFF`) and warm muted stone borders (`#ECE7DF`). Text leverages warm charcoal (`#2D2621`) and soft ink taupe (`#70655B`).
  - **Dark Mode Canvas:** Midnight Kraft (`#181614`) paired with deep sepia charcoal cards (`#221F1C`) and weathered border lines (`#342F2A`). Primary typography lifts to warm cream ivory (`#F3EEE8`) with subtext in soft haze (`#A3988F`).

## Typography

The type hierarchy relies on **Plus Jakarta Sans** for its friendly, rounded geometry, warm apertures, and crisp readability on both desktop canvases and compact mobile screens.

- **Headlines & Titles:** Rendered with confident, humanistic weights (600–800) and snug negative letter spacing for an editorial, modern travel journal feel.
- **Editorial Postcard Annotations:** Notes and handwritten sentiments may pair alongside subtle cursive or script badges, while core navigational type remains strictly legibility-first.
- **Labels & Badges:** Uppercase and small-caps tracking on category labels and postal stamps (`0.02em` to `0.04em`) creates crisp separation from free-flowing narrative body text.

## Layout & Spacing

The layout employs a comfortable, fluid 12-column grid on desktop/tablet views and a single-to-two column fluid grid on mobile devices.

- **Desktop (1024px+):** Fixed lateral navigation dock (left sidebar) or floating segmented pill bar. Dashboard panels feature asymmetrical dual-pane arrangements (e.g., world map explorer beside tactile memory feed).
- **Tablet (768px – 1023px):** Collapsible sidebar transitioning to an airy stacked card column with 1.25rem gutters.
- **Mobile (< 768px):** 1rem margins with full-bleed thumbnail scroll containers. Bottom safe-area floating action navigation holds primary camera/memory capture buttons.
- **Rhythm:** Spacing follows an intentional 4px/8px incremental cadence. Spacing tokens strictly organize padding and gap hierarchies to maintain an unhurried, breathable canvas.

## Elevation & Depth

Depth mimics overlapping light stationery, archival photo cards, and deckle-edged stamps:

1. **Base Layer (Level 0):** Warm matte cream background (`#FAF8F5` in light, `#181614` in dark). No shadow.
2. **Postcard Surfaces (Level 1):** Subtle, ultra-soft tinted shadow creating an impression of paper resting on a table:
   - Light: `0 4px 20px -2px rgba(90, 70, 50, 0.05), 0 1px 3px rgba(90, 70, 50, 0.03)`
   - Dark: `0 4px 24px -2px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(255, 255, 255, 0.02)`
3. **Hovered & Selected Memories (Level 2):** Gentle float elevation with a slight rotation transform (`-0.75deg` to `+1deg`):
   - Light: `0 12px 28px -4px rgba(90, 70, 50, 0.09), 0 4px 8px -2px rgba(90, 70, 50, 0.04)`
4. **Modals & Stamp Drawers (Level 3):** Frosted ambient backdrop blur (`backdrop-filter: blur(12px)`) with warm, pillowy shadow envelopes.

## Shapes

The design system standardizes on gentle, approachable contours (Level 2: `0.5rem` base, `1rem` for `rounded-lg`, `1.5rem` for `rounded-xl`, and full pill rounds for interactive tags).

- **Postal Stamps & Polaroids:** Outer frames carry `1rem` corner rounding, while stamp-cut perforated badges feature scalloped edges or regular dashed borders (`stroke-dasharray: 4 4`).
- **Interactive Buttons & Chips:** Pill silhouettes (`rounded-full`) for tag filters, status badges, and circular thumbnail pins.
- **Search & Input Bars:** Pill-shaped bars with inset soft shadows that echo clean, inviting address entry fields.

## Components

### Buttons
- **Primary Action (Coral/Terracotta):** Filled `#E07A5F`, text white, pill-shaped (`rounded-full`), padded `0.75rem 1.5rem`. Smooth scale hover (`1.02`) with warm terracotta glow shadow.
- **Secondary Action (Muted Indigo/Slate):** Deep navy `#1E2A38` or off-white paper fill with a crisp warm border (`#ECE7DF`).
- **Floating Action Button (Capture Memory):** High-prominence circular button with camera/plus icon, vibrant terracotta background, elevated with Level 2 float shadow.

### Stamps, Badges & Journey Tags
- **Travel State Chips:**
  - **Gittim (Visited):** `#E07A5F` background tint (12% opacity), deep terracotta text, accompanied by an checkmark or airplane icon.
  - **Yaşadım (Lived):** `#3D84A8` background tint (12% opacity), ocean blue text, paired with a small home/anchor motif.
  - **Gitmek istiyorum (Wishlist):** `#F4A261` background tint (15% opacity), warm mustard text, paired with a star or heart emblem.
- **Postmark Cancel Mark:** Subtle SVG overlay featuring concentric circular postal cancel rings with country code and date stamps stamped across card corners.

### Postcard Memory Cards
- **Structure:** Clean white paper surface (`#FFFFFF` in light, `#221F1C` in dark) with a generous 12px internal margin around the photography, reminiscent of a vintage polaroid or physical postcard.
- **Border:** Optional micro dashed border (`1.5px dashed #E5DFD5`) on draft or wishlist states; solid hairline (`1px solid #F0EAE1`) on published memories.
- **Metadata Layout:** Location pin with city/country on the left, travel companion avatars, and bookmark/heart toggles on the right.

### Search & Form Inputs
- **Destination Search:** Rounded pill input with inset magnifying glass, placeholder in `#9C9186`, container fill in white or subtle cream `#F5F1EB`.
- **Form Controls & Date Selectors:** Generous 44px minimum tap height, clear label hierarchy, and subtle postal airmail-striped focus rings (`2px solid #E07A5F`).

### Segmented Tabs & Nav Bars
- **Navigation Tabs:** Segmented rounded container with sliding pill indicator highlighting "My Posts", "My Map", and "Wishlist". Active tab receives deep navy `#1E2A38` or coral `#E07A5F` fill with crisp white text.