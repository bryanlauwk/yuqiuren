

# Header Enhancement Plan

## Overview
Enhance the header with a sporty vibe by removing the share button, adding player silhouettes to the hero background, and replacing the logo with a shuttlecock icon that matches the arena theme.

---

## Changes Summary

| Task | File(s) | Description |
|------|---------|-------------|
| Remove Share Button | `src/components/Header.tsx` | Remove share button and related state/imports |
| Add Player Silhouettes | `src/components/ArenaHero.tsx` | Add CSS-based player silhouettes to background |
| Replace Logo | `src/components/Header.tsx` | Replace PNG logo with inline SVG shuttlecock |
| Add Silhouette Styles | `src/index.css` | Add CSS for player silhouette effects |

---

## Implementation Details

### 1. Remove Share Button from Header

**File:** `src/components/Header.tsx`

Remove:
- `useState` for `shareModalOpen`
- `Share2` icon import
- `ShareRankingModal` component import
- `useRankings` hook import
- Share button JSX (lines 67-79)
- ShareRankingModal JSX (lines 98-103)

### 2. Replace Logo with Shuttlecock SVG

**File:** `src/components/Header.tsx`

Replace the PNG logo with an inline SVG shuttlecock icon that uses the arena color scheme:
- Dark background circle with gradient
- White/gold shuttlecock design
- Matches the cinematic dark theme
- Subtle glow effect on hover

```tsx
{/* Shuttlecock Logo */}
<Link to="/" className="flex items-center group">
  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center shadow-lg">
    <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 text-white/90">
      {/* Shuttlecock SVG path */}
    </svg>
  </div>
</Link>
```

### 3. Add Player Silhouettes to Hero

**File:** `src/components/ArenaHero.tsx`

Add CSS-based player silhouettes positioned on left and right sides of the hero:
- Semi-transparent overlays
- Action poses (serving, smashing)
- Gradient fade to blend with background
- Responsive positioning

```tsx
{/* Player silhouettes */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* Left player silhouette */}
  <div className="player-silhouette-left" />
  {/* Right player silhouette */}
  <div className="player-silhouette-right" />
</div>
```

### 4. Add Silhouette CSS Styles

**File:** `src/index.css`

Add new utility classes for player silhouettes using CSS gradients and clip-paths:

```css
/* Player silhouettes for hero */
.player-silhouette-left {
  position: absolute;
  left: -5%;
  bottom: 0;
  width: 35%;
  height: 100%;
  background: linear-gradient(
    to right,
    hsl(0 70% 25% / 0.3),
    transparent
  );
  clip-path: polygon(...); /* Serving pose */
  opacity: 0.6;
}

.player-silhouette-right {
  position: absolute;
  right: -5%;
  bottom: 0;
  width: 35%;
  height: 100%;
  background: linear-gradient(
    to left,
    hsl(150 60% 15% / 0.3),
    transparent
  );
  clip-path: polygon(...); /* Smash pose */
  opacity: 0.6;
}
```

---

## Visual Result

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [🏸]  Rankings  History  Admin         [Lang] [Logout]                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ▓▓▓                  2026 羽球人赛 · 积分榜                    ▓▓▓   │
│  ▓▓▓▓▓                                                          ▓▓▓▓▓  │
│ ▓▓▓▓▓▓▓               "Every point matters."                   ▓▓▓▓▓▓▓ │
│  ▓▓▓▓▓                     ─────────                            ▓▓▓▓▓  │
│   ▓▓▓                                                            ▓▓▓   │
│     [Left player                                    Right player]       │
│     [silhouette]                                    [silhouette]        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Notes

### Shuttlecock SVG Design
A simple, elegant shuttlecock icon using:
- Cork base (rounded bottom)
- Feather crown (triangular top)
- Clean lines matching athletic aesthetic
- White/cream color on gradient background

### Player Silhouettes Approach
Using CSS clip-paths and gradients instead of images for:
- Smaller bundle size
- Perfect color matching with theme
- Easy animation potential
- Responsive scaling

### Removed Dependencies
- `useRankings` hook no longer needed in Header
- `ShareRankingModal` import removed
- `Share2` icon import removed
- Logo PNG asset no longer imported

