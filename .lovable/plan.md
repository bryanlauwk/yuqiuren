

# Ranking Table — Airbnb-Polish Redesign

The current table has a heavy "esports arena" aesthetic: colored left borders, gradient row backgrounds, glow effects, bold rank badges with drop shadows, and dense typography. Airbnb's design language is the opposite — clean surfaces, generous whitespace, subtle depth through shadows not gradients, and letting content breathe.

## Design Direction

Strip away visual noise. Let the data speak. Depth comes from elevation (soft shadows) not from color gradients. Hierarchy comes from size and weight, not from glowing text.

## Desktop Table Changes (`src/components/DesktopRankingTable.tsx`)

**Container**: Replace `border border-border bg-card/50` with a clean white/dark card using a soft `shadow-lg` and `rounded-2xl` — no visible border. Remove `max-h-[70vh] overflow-y-auto` (let it flow naturally, the page scrolls).

**Header row**: Remove uppercase tracking. Use sentence-case, `text-sm text-muted-foreground font-medium` — quiet labels, not shouting column titles. Thin bottom border only.

**Rows**:
- Remove colored left borders (`rank-row-gold/silver/bronze`) and gradient backgrounds entirely
- Remove zebra striping
- Use a single thin `border-b border-border/40` between rows
- On hover: subtle `bg-muted/30` background, no scale transforms
- Top 3 rows get no special background — their rank badge and slightly larger avatar are enough differentiation

**Rank badge**:
- Top 3: Keep the gradient fill but make badges circular (`rounded-full`) instead of `rounded-lg`, and reduce shadow intensity by ~50%
- Others: Simple `text-muted-foreground` number, no background box at all — just the number

**Avatar**: Reduce border from `border-2` to `border` with `border-border/50`. On hover, instead of `scale-105`, use a soft `ring-2 ring-primary/30` effect.

**Name + rank change**: Keep as-is, the arrow indicators are clean already.

**Stats cells**: Reduce font sizes by one step (e.g. `text-xl` to `text-lg`, `text-2xl` to `text-xl`). Remove the Trophy icon next to wins — the rank badge already communicates position. Use `text-foreground/60` for stats to de-emphasize them vs the player name.

**Points column**: Keep bolder than other stats but remove `text-rank-gold` coloring — use `text-foreground` for all. The rank badge carries the color story.

## Mobile Card Changes (`src/components/MobileRankingCard.tsx`)

**Container**: Replace `border` + colored borders with borderless cards using `shadow-sm hover:shadow-md` transition. Use `rounded-2xl` and `bg-card`. Top 3 get `shadow-md` by default.

**Rank badge**: Same circular treatment as desktop.

**Stats row**: Remove `border-t` divider. Use lighter `text-foreground/50` for stat labels. Remove Trophy icons.

## CSS Cleanup (`src/index.css`)

Keep `rank-badge-gold/silver/bronze` (still used for badges) but soften their `box-shadow` values. The `rank-row-*` classes, `glow-*` classes, and `text-glow-*` classes can remain defined but will no longer be applied in the table components.

## Files to Modify

| File | Change |
|------|--------|
| `src/components/DesktopRankingTable.tsx` | Restyle container, header, rows, badges, avatars, stats |
| `src/components/MobileRankingCard.tsx` | Borderless shadow cards, circular badges, remove trophy icons |
| `src/index.css` | Soften badge shadows, optionally add new subtle utility classes |

