

# Pivot to "Game On" — Sporty & Energetic Aesthetic

The uploaded reference (Swing Up) defines a **completely different visual direction** from the current dark-blue arena and the recent Airbnb-polish pass. It's a modern fitness-app energy: **light cream background, chunky black ink, and one explosive neon-lime accent** — think Strava x Gymshark x a sneaker drop.

This is a real pivot, not a tweak. We're moving from "dark esports broadcast" to "bright sporty hype."

## New Design Tokens

| Role | Old (dark blue) | New (Game On) |
|---|---|---|
| Background | `#0B131F` (deep navy) | `#FAFAF7` (warm off-white) |
| Foreground / Ink | Light gray | `#0A0E0A` (near-black) |
| Primary accent | Electric blue | `#C6FF2E` (neon lime) |
| Secondary ink | — | `#0B3B1E` (deep forest, on lime) |
| Cards | Dark navy | Pure white with 2px black border |
| Shadows | Blue glow | Hard offset shadow (`4px 4px 0 #0A0E0A`) |
| Display font | Plus Jakarta Sans 700 | **Archivo 900** (chunky, condensed feel) |

## What Changes

**1. Theme tokens (`src/index.css`)**
- Rewrite `:root` HSL tokens to the cream/black/lime palette
- Switch `font-display` to `Archivo` weight 900, tighter tracking
- Replace soft glow shadows with hard "neo-brutalist" offset shadows
- Add a `.btn-pop` utility (lime fill, black border, hard shadow, translates on hover)

**2. Hero (`ArenaHero.tsx`)**
- Drop the dark overlay, drop the background photo opacity treatment
- Lime highlight block behind/under the headline (like the "Game on." swatch in the ref)
- Headline becomes oversized chunky black text (`text-6xl → text-8xl`, font-weight 900)
- Subtitle in muted forest green, not gray
- Optional: a small hand-drawn shuttlecock + arrow doodle as a corner accent

**3. Ranking — Desktop table (`DesktopRankingTable.tsx`)**
- White card with 2px black border + hard offset shadow (replaces soft rounded shadow)
- Column headers in uppercase Archivo black, lime underline on hover
- Top 3 rows get a lime left-edge bar (instead of gold/silver/bronze gradients)
- Rank numbers become huge chunky numerals
- Points column: large black numerals, lime pill behind #1's points

**4. Ranking — Mobile card (`MobileRankingCard.tsx`)**
- White card, 2px black border, hard offset shadow
- Top-3 rank badge becomes a lime square (not circle) with black numeral
- Stats row: black numerals on cream chips

**5. Header & Footer**
- Header: cream bg, black wordmark in Archivo 900, lime CTA button
- Footer: keep minimal, but switch to cream/black palette and replace the dot separator with a lime bullet

**6. Buttons (`button.tsx`)**
- Update default variant to the lime-fill / black-border / hard-shadow style
- Outline variant: white fill, 2px black border, hard shadow

## Out of scope (this pass)

- BadmintonDoodles / BlueParticles / Confetti / SpotlightBeams / FloatingShuttlecocks — these are dark-mode decorative elements that would clash. They'll be **temporarily hidden** on the home route; a follow-up can redraw them in the new style if you want them back.
- Admin pages — same tokens will cascade automatically; no per-page rewrites.

## Files Touched

| File | Change |
|---|---|
| `src/index.css` | Rewrite theme tokens, fonts, shadows, add `.btn-pop` |
| `index.html` | Add Archivo Google Fonts link |
| `tailwind.config.ts` | Confirm `font-display: Archivo` mapping |
| `src/components/ArenaHero.tsx` | Lime highlight, chunky headline, drop dark overlay |
| `src/components/DesktopRankingTable.tsx` | Border + hard shadow, lime accents on top 3 |
| `src/components/MobileRankingCard.tsx` | Border + hard shadow, lime square badge |
| `src/components/Header.tsx` | Cream bg, black wordmark, lime CTA |
| `src/components/Footer.tsx` | Repalette to cream/black/lime |
| `src/components/ui/button.tsx` | New default variant style |
| `src/pages/RankingPage.tsx` | Hide dark decorative layers (BlueParticles etc.) |

