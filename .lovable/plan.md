
# Cinematic Sports Arena Redesign

## Executive Summary

This is a complete visual transformation of the ranking page from "hand-drawn minimalist" to "elite sports broadcast" aesthetic. The goal is to create a competitive, heroic, screenshot-worthy leaderboard experience.

---

## What Will Be Removed

| Element | Current Location | Reason |
|---------|------------------|--------|
| Total Players card | Stats grid | Too informational |
| Next Match Countdown card | Stats grid | Too dashboard-like |
| Venue card | Stats grid | Too informational |
| Confetti animation | Page load | Too playful |
| BadmintonDoodles background | Fixed overlay | Too playful/whimsical |
| Decorative SVG doodles | Hero section | Not cinematic |
| Squiggle lines | Various | Too playful |
| Hand-drawn card styles | All components | Not athletic |

---

## New Visual Direction

### Color System

**Primary Palette:**
- `arena-deep-red`: `#8B0000` → `#4A0000` (power, intensity)
- `arena-dark-green`: `#0A2E1A` → `#051A0F` (court, national tone)
- `arena-black`: `#0A0A0A` (near-black background)
- `arena-gold`: `#FFD700` (champion highlight)
- `arena-silver`: `#C0C0C0` (second place)
- `arena-bronze`: `#CD7F32` (third place)

**Accents:**
- Warm white/cream for top rank text
- Muted grey for lower ranks
- Subtle glow effects for top 3

---

## Page Structure

### A. Hero Header (Full-Width Banner)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│     [Abstract texture: motion streaks, brush strokes, dark gradient]    │
│                                                                         │
│                    2026 羽球人赛 · 积分榜                               │
│                    "Every point matters."                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

- Full-width dark gradient (red → green → black)
- Subtle motion streaks / particle effects (CSS only)
- Athletic, premium typography
- No cards, no boxes

### B. Leaderboard List (Core Focus)

Each player row becomes a "player card" without boxed UI:

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ████                                                                   │
│  ██1██  [AVATAR]  HANSON                                          156   │
│  ████              8 sessions • 5 wins                           PTS    │
│  ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Top 3 Treatment:**
- Larger row height (taller, more breathable)
- Glow effect / accent streak
- Stronger contrast
- Gold/silver/bronze accent on rank number

**Middle Ranks (4-7):**
- Standard height
- Neutral styling
- Stable visual weight

**Bottom Ranks (8+):**
- Quieter, subdued
- Smaller visual emphasis
- Muted colors

---

## File Changes

### 1. CSS Theme Overhaul
**File:** `src/index.css`

- Replace warm cream palette with dark arena palette
- Add new CSS variables for arena colors
- Add cinematic effects (glow, streaks, gradients)
- Remove all doodle-related styles
- Add new keyframes for subtle hover effects
- Remove paper texture, replace with dark gradient

### 2. Tailwind Config Update
**File:** `tailwind.config.ts`

- Add new arena color tokens
- Add condensed font option for athletic feel
- Update animation presets for subtle effects

### 3. Complete RankingPage Redesign
**File:** `src/pages/RankingPage.tsx`

- Remove: Confetti, BadmintonDoodles, stats cards grid
- Replace hero section with cinematic banner
- Simplify structure to: Header → Hero → Rankings → Footer
- No Podium component (unified list approach)

### 4. New ArenaHero Component
**File:** `src/components/ArenaHero.tsx` (new)

- Full-width cinematic banner
- Animated gradient background
- Motion streak effects
- Title with premium typography
- Subtitle: "Every point matters."

### 5. Redesigned PlayerRankingCard
**File:** `src/components/PlayerRankingCard.tsx` (new, replaces RankingRow + Podium)

Unified ranking row for all positions:
- Props: rank, playerName, avatar, points, sessionsPlayed, championships, rankChange
- Dynamic styling based on rank (1-3 get special treatment)
- No border/card style, uses gradient backgrounds
- Taller for top 3, standard for rest
- Glow effect for top 3 on hover

### 6. Updated Header
**File:** `src/components/Header.tsx`

- Dark theme styling
- Sleek, minimal navigation
- Keep share functionality

### 7. Updated Footer  
**File:** `src/components/Footer.tsx`

- Minimal, dark themed
- Remove BadmintonRally animation
- Simple credit line

### 8. Update/Remove Legacy Components

| File | Action |
|------|--------|
| `src/components/BadmintonDoodles.tsx` | Delete or keep unused |
| `src/components/BadmintonRally.tsx` | Delete or keep unused |
| `src/components/Confetti.tsx` | Delete or keep unused |
| `src/components/Podium.tsx` | Delete or keep unused |
| `src/components/RankingRow.tsx` | Delete (replaced by PlayerRankingCard) |
| `src/components/NextMatchCountdown.tsx` | Keep but remove from page |

### 9. Translation Updates
**File:** `src/i18n/translations.ts`

- Update hero title and subtitle
- Add new copy: "Every point matters." / "每一分都至关重要。"

---

## Visual Specifications

### Typography

| Element | Style |
|---------|-------|
| Hero Title | 48-64px, bold condensed, white with text-shadow |
| Hero Subtitle | 16px, italic, white/60% opacity |
| Player Name (Top 3) | 24px, bold, white |
| Player Name (Others) | 18px, semibold, white/90% |
| Points (Top 3) | 48px, extra-bold, gold glow |
| Points (Others) | 32px, bold, white |
| Meta text | 12px, muted grey |

### Row Sizing

| Rank | Height | Background |
|------|--------|------------|
| 1 | 120px | Gold gradient + glow |
| 2-3 | 100px | Silver/Bronze gradient + subtle glow |
| 4-7 | 80px | Dark neutral gradient |
| 8+ | 72px | Darker, subdued |

### Hover Effects

- Top 3: Soft glow intensifies, slight scale (1.02)
- Others: Background lightens slightly
- All: Smooth 0.2s transitions

### Rank Change Indicators

- Up arrow: Small, green, understated
- Down arrow: Small, red, understated
- No change: Hidden or dash

---

## Mobile Considerations

- Full vertical rhythm
- Thumb-friendly tap targets (minimum 48px)
- Player rows stack naturally
- Hero compresses gracefully
- Points remain prominent and scannable
- Avatar size maintained for recognition

---

## Animation Philosophy

**Do:**
- Subtle hover glow
- Gentle parallax between hero and list (scroll-based)
- Fade-in on load (staggered rows)

**Don't:**
- Bouncy animations
- Confetti
- Spinning elements
- Gamified effects

---

## Implementation Sequence

1. Update CSS theme (colors, remove doodles)
2. Update Tailwind config (new tokens)
3. Create ArenaHero component
4. Create PlayerRankingCard component
5. Rebuild RankingPage with new structure
6. Update Header styling
7. Update Footer styling
8. Update translations
9. Test responsive behavior
10. Clean up unused components

---

## Technical Details

### New CSS Variables (src/index.css)

```css
:root {
  --arena-bg: 0 0% 4%;           /* Near black */
  --arena-card: 0 0% 8%;          /* Dark grey */
  --arena-text: 0 0% 95%;         /* White */
  --arena-muted: 0 0% 50%;        /* Grey */
  --arena-red: 0 70% 30%;         /* Deep red */
  --arena-green: 150 60% 12%;     /* Dark green */
  --arena-gold: 45 100% 50%;      /* Champion gold */
  --arena-silver: 0 0% 75%;       /* Silver */
  --arena-bronze: 30 60% 45%;     /* Bronze */
}
```

### PlayerRankingCard Props Interface

```typescript
interface PlayerRankingCardProps {
  rank: number;
  playerName: string;
  avatarUrl?: string;
  fullAvatarUrl?: string;
  totalPoints: number;
  sessionsPlayed: number;
  championships: number;
  rankChange: number;
  avatarCropX?: number;
  avatarCropY?: number;
  onAvatarClick?: (url: string, name: string) => void;
}
```

### Hero Gradient Effect

```css
.arena-hero {
  background: linear-gradient(
    135deg,
    hsl(0 70% 20% / 0.8) 0%,
    hsl(150 60% 8% / 0.9) 50%,
    hsl(0 0% 4%) 100%
  );
}

.motion-streak {
  background: linear-gradient(
    90deg,
    transparent,
    hsl(0 70% 40% / 0.1),
    transparent
  );
  animation: streak 3s ease-in-out infinite;
}
```

