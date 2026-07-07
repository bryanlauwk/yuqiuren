# Desktop Ranking Table Redesign — "Pro Broadcast"

Rebuild `src/components/DesktopRankingTable.tsx` to match the selected direction. Mobile card layout is untouched.

## What changes

- **Top-3 rows stay oversized (~110–120px)** with medal-color left bar + gradient tint, large italic rank numeral, prominent avatar with red MVP tag on #1, and a highlighted points figure.
- **Ranks 4+ compress to ~44px** tabular rows: small 24px avatar, uppercase name, mono numerals for sessions/wins, condensed italic points, subtle zebra tint, red text on row hover.
- **Sticky header row** with tightly-tracked uppercase labels (English + faded Chinese subscript) on a `#111` bar and a red hairline underline.
- **Live footer strip** with pulsing red dot showing "实时数据 · 最近场次日期" using existing session data — no fake "Broadcast Live Feed / Region" copy.
- **Container**: full-width dark `#0a0a0a` panel with 1px hairline border and dramatic outer shadow.

Net effect: 15+ players fit in one viewport instead of scrolling, and the top-3 still read as trophy rows.

## Design tokens

- Reuse existing semantic tokens (`--background`, `--card`, `--primary`, `--muted-foreground`, etc.). Medal colors stay as the current gold/silver/bronze token values.
- **New font**: Barlow Condensed (700/800 + italic) for rank numerals, player names, and points — installed via `@fontsource/barlow-condensed`, imported in `src/main.tsx`, exposed in `tailwind.config.ts` as `font-display`. Body copy (Inter) unchanged.
- Add a `font-display` utility; no other palette changes.

## File-level changes

- `src/components/DesktopRankingTable.tsx` — full rewrite of markup/classes; keep the same props, sorting, delta, and rank-change data flow. Preserve avatar crop (`objectPosition` from `avatar_crop_x/y`) and click-to-lightbox behavior. Preserve empty-state.
- `src/main.tsx` — add `import '@fontsource/barlow-condensed/700.css'` etc.
- `tailwind.config.ts` — register `display: ['"Barlow Condensed"', ...]`.
- `package.json` — add `@fontsource/barlow-condensed` (via `bun add`).

## Out of scope

- Mobile card (`MobileRankingCard.tsx`) — untouched.
- Hero, header, session history, admin — untouched.
- Column semantics, sort logic, data hooks — unchanged.
- Adding fake "MVP / Live Feed / Region" copy from the prototype beyond what maps to real data.

## Layout reference

```text
┌ header  RANK  PLAYER                     场次   胜    积分 ┐
│ 01  ★ [avatar] BRYAN LAU  ↑3           17    9    37   │  ← 120px, gold bar
│ 02    [avatar] CHRIS       —           15    8    37   │  ← 110px, silver
│ 03    [avatar] BEAR       ↓2           16    8    37   │  ← 110px, bronze
├─────────────────────────────────────────────────────────┤
│ 04   ·  laowong  ↓1                     16    7    37   │  ← 44px compact
│ 05   ·  dicky    —                      13    7    31   │
│ 06   ·  jia her  —                      16    5    30   │
│ ...                                                     │
├ ● 实时数据 · 22 名选手 · 最近 2026.07.06 ────────────────┤
```
