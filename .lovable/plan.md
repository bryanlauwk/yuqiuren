

# Airbnb-Inspired UX Polish

Thinking as an Airbnb designer: the page has too many competing visual effects (particles, beams, shimmer, court lines, glows) creating visual noise. Airbnb's philosophy is **generous whitespace, restraint, and purposeful motion**. The content is good — we just need to let it breathe.

## Key Principles
- Remove decorative noise, keep purposeful motion
- More whitespace and padding
- Softer shadows instead of hard glows
- Cleaner card surfaces with subtle depth
- Typography hierarchy through size and weight, not color effects

## Changes

### 1. `src/components/ArenaHero.tsx` — Simplify hero
- Remove `CourtLines`, `SpotlightBeams`, `FloatingShuttlecocks`, and `arena-particles` overlays
- Keep the background image with a cleaner gradient overlay (stronger fade to background)
- Add more vertical padding (py-20 sm:py-32) for breathing room
- Remove the decorative gold line — replace with nothing (less is more)
- Cleaner subtitle treatment

### 2. `src/components/MobileRankingCard.tsx` — Softer cards
- Replace heavy glow shadows (`shadow-[0_0_20px_...]`) with subtle `shadow-sm` / `shadow-md`
- More padding (p-4 for all, p-5 for top 3)
- Softer border colors — use `border-border/30` for non-top-3
- Rounded corners bump to `rounded-xl`
- Stats row: remove bullet separators, use equal spacing with `gap-4` grid instead

### 3. `src/components/DesktopRankingTable.tsx` — Cleaner table
- Remove shimmer animation from header (visual noise)
- Softer row hover: `hover:bg-muted/20` instead of scale
- Round the outer container more: `rounded-xl`
- Increase row padding for breathing room

### 4. `src/index.css` — Tone down utilities
- Remove or soften `text-glow-gold` and `text-glow-white` (text-shadow creates blur)
- Soften `rank-row-*` gradients — reduce opacity by ~40%
- Reduce `arena-particles` opacity
- Make `accent-bar` subtler (thinner, less saturated)

### 5. `src/components/Header.tsx` — Cleaner nav
- Remove the accent-bar (the 1px colored line at top)
- Increase header height slightly (h-16 sm:h-18) for breathing room
- Softer nav pill: current page indicator uses `bg-primary/10 text-primary` instead of solid `bg-primary`

### 6. `src/components/Footer.tsx` — More whitespace
- Increase padding to `py-10`
- Add a subtle separator treatment

### 7. `src/pages/RankingPage.tsx` — Spacing
- Increase gap between ranking cards on mobile: `space-y-3` → `space-y-4`
- Add `pb-12` for more bottom breathing room
- Loading skeletons: use `rounded-xl`

## Not Changing
- Color palette (blue-white theme stays)
- Ranking logic and data structure
- Gold/silver/bronze rank tokens
- Overall layout structure

