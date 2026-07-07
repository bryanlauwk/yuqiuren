# Ranking Table — Tighten & Calm Down

The table currently spreads 5 columns across the full container width, leaving 400–600px of dead space between the player name and the stat columns. The top-3 rows are also visually noisy (italic Barlow numerals, MVP tag, gradient tint, dual-language header labels).

Fix by pulling the layout in and letting the numbers sit close to the names — same information, no visual gimmicks.

## Changes

**Column layout**
- Switch grid from `64 / 1fr / 96 / 96 / 120` (whitespace column = 1fr) to `56 / 1fr / 80 / 80 / 96` **inside a `max-w-4xl mx-auto` inner wrapper**, so numeric columns sit right next to the name instead of drifting to the far right.
- Right-align sessions/wins/points instead of centering; add a subtle vertical divider before the points column.

**Top-3 rows**
- Reduce heights: rank 1 → 88px, ranks 2–3 → 76px (was 120/108).
- Remove the horizontal gradient tint; keep only the colored 4px left bar + rank-colored numeral + rank-colored points.
- Drop the "MVP" skewed tag.
- Avatar shrinks to 48/44px.
- Keep Barlow Condensed for name and rank number, but drop italic on the stat numerals (use Archivo/tabular-nums) so numbers align cleanly with rows 4+.

**Compact rows (4+)**
- Height stays 44px.
- Same stat typography as top-3 for consistency.
- Zebra tint stays subtle.

**Header**
- Single-language labels (based on current `language`) instead of doubled English+Chinese.
- Keep red hairline underline.

**Footer strip**
- Keep, but drop the `italic` from the date so it matches the rest.

## Out of scope

- Colors, fonts, and container border stay as-is (brutalist card with offset shadow).
- Mobile card — unchanged.
- Data hooks and props — unchanged.

## Files touched

- `src/components/DesktopRankingTable.tsx` — layout + typography tweaks only.
