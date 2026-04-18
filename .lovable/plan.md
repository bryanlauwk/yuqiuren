

# Borrow 3 Swing Up Patterns into Game On

The Swing Up thumbnail shows three motifs we haven't adopted yet. All additive — no breaking changes to current Game On styling.

## 1. "Phone mockup" showcase block (new section on home)

A tilted dark device frame on the right of a new section, with stacked alternating white/lime list rows inside — visually previews "what the leaderboard looks like" before the user scrolls to the real table. Pure decorative SVG/divs, no real data.

- New component: `src/components/PhoneShowcase.tsx`
- Mounted on `RankingPage.tsx` between hero and rankings
- Left side: short pitch headline ("Track every rally.") + lime CTA → scrolls to rankings
- Right side: `rotate-[-4deg]` black rounded frame, 3-4 mock rows (white / lime / white / lime), each with a circle avatar + name bar + score chip

## 2. "Circle + arrow" launch motif

The chunky black circle-with-arrow doodle from the thumbnail — a small reusable SVG that signals "go / next / scroll". 

- New component: `src/components/ink/CircleArrow.tsx`  
- Drop one into the hero corner (replacing the current diagonal-arrow SVG, which is similar but less characterful)
- Drop one as a divider between the showcase section and the rankings

## 3. Soft list-row variant for ranking cards (opt-in)

The thumbnail's rows are softer than our current cards: `rounded-2xl`, 2px border, alternating white / lime-tinted fills, no hard offset shadow. Rather than replacing `MobileRankingCard` (which is doing well), introduce this as the style for the *mock* rows in the showcase block only — keeps real cards punchy, gives the showcase its own gentler rhythm.

## Files

| File | Change |
|---|---|
| `src/components/PhoneShowcase.tsx` | New — tilted device mockup + pitch copy |
| `src/components/ink/CircleArrow.tsx` | New — reusable chunky circle+arrow SVG |
| `src/pages/RankingPage.tsx` | Mount `<PhoneShowcase />` between hero and rankings |
| `src/components/ArenaHero.tsx` | Swap corner arrow SVG → `<CircleArrow />` |
| `src/i18n/translations.ts` | Add 2 strings: showcase headline + CTA (zh + en) |

## Out of scope

- No palette/typography changes (Game On stays)
- No edits to real ranking cards or table
- No new routes or data

