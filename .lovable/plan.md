

## Goal
Re-skin the site to match the jersey: **white base, royal blue, red accents**, on a **near-black** ink. Replace the current neon-lime "Game On" theme with a sportier, cleaner palette inspired by the uploaded jersey, while keeping the neo-brutalist hard-shadow aesthetic intact.

## New palette (token swap in `src/index.css`)
- `--background`: white (`0 0% 100%`)
- `--foreground` / ink: near-black (`220 25% 8%`) — keeps strong borders/shadows
- `--primary`: royal blue `#2A4FB8` (`224 65% 45%`) — new "hero" color (replaces lime)
- `--primary-foreground`: white
- `--accent`: jersey red `#E63946` (`354 76% 56%`) — used for CTAs, LIVE badge, top‑1 highlight
- `--accent-foreground`: white
- `--muted`: very light blue‑gray (`220 20% 96%`)
- `--rank-gold` → blue, top-row left bar uses red for #1, blue for #2/#3 (jersey-like layering)
- Hard offset shadows stay near-black (unchanged behavior)
- `.lime-slab` → renamed visually to a **blue slab** (keep class name for compatibility): blue bg + white text. (Optional: also add `.red-slab` for emphasis on one word.)

## Component touch-ups
1. **`src/index.css`** — swap CSS variables only; all components automatically inherit. Update `.lime-slab` to blue. Update `.rank-badge-*` to use blue (top-3) with a red variant for `#1`.
2. **`ArenaHero.tsx`** — change phone shadow from lime/foreground to **red** (`shadow-[8px_8px_0_0_hsl(var(--accent))]` becomes red automatically via accent token swap, no code change needed). Tinted rows alternate between **light-blue (muted)** and white instead of lime; row #1 gets a red tint. Small tweak to row backgrounds.
3. **`MobileRankingCard.tsx` / `DesktopRankingTable.tsx` / `RankingRow.tsx` / `Podium.tsx`** — no structural change; primary-token swap recolors them. Minor: top-1 left bar uses `--accent` (red), top-2/3 use `--primary` (blue).
4. **`Header.tsx`** — logo tile becomes blue (auto via primary), active nav pill becomes blue with white text (auto). No code change required.
5. **Hero CTA** — currently `bg-accent` (was forest green) → now becomes red automatically. Looks great with white text on red, near-black border, blue slab in headline.

## Visual rhythm (jersey-inspired)
- White canvas, blue as the dominant "team" color, red reserved for **#1, LIVE, and CTA** so it pops like the jersey's red slashes over the blue field.
- Keep all hard 2px black borders + offset shadows for the brutalist sport-poster feel.

## Files to edit
- `src/index.css` (palette + `.lime-slab` + rank-badge tweak)
- `src/components/ArenaHero.tsx` (row tint logic: row 1 = red, others alternate blue/white)
- `src/components/MobileRankingCard.tsx` (top-1 left border red, top-2/3 blue; #1 points tile red)
- `src/components/DesktopRankingTable.tsx` + `RankingRow.tsx` (same top-1 red treatment)
- `src/components/Podium.tsx` (1st = red, 2nd/3rd = blue)

No new dependencies. No DB changes. Existing translations and layout untouched.

