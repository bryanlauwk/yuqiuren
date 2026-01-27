

# Ranking Card Layout Optimization

## Problem Analysis

The current layout has a large empty gap in the middle because:
- The Player Info section uses `flex-1` which stretches to fill all available space
- Stats (sessions/wins) are displayed as small secondary text underneath the player name
- Points are pushed to the far right, creating visual imbalance

**Current Layout:**
```
[Rank] [Avatar] [Name                                         ] [Points]
                [4 sessions • 2 wins (tiny text)]                [pts]
```

## Proposed Solution

Reorganize to a more balanced 3-column layout where stats are visually prominent:

**New Layout:**
```
[Rank] [Avatar] [Name        ] [Sessions] [Wins ] [Points]
                [rank change ] [  8      ] [ 3   ] [ 156  ]
                               [场次/PLAYED] [胜/WINS] [积分/PTS]
```

This creates a cleaner visual hierarchy with:
1. **Left block:** Rank + Avatar + Name (identity)
2. **Center block:** Sessions + Wins (performance stats with bigger typography)
3. **Right block:** Points (main score)

---

## Implementation Details

### File: `src/components/PlayerRankingCard.tsx`

**Layout Changes:**
- Split the flexible middle section into discrete stat columns
- Each stat (sessions, wins, points) gets its own vertical block with number on top, label below
- Use consistent spacing with `gap-8` between stat columns
- Stats get larger font sizes (comparable to points)

**Typography Hierarchy:**
| Element | Current | New |
|---------|---------|-----|
| Sessions number | `text-xs/text-sm` | `text-xl sm:text-2xl` (rank 1-3) / `text-lg sm:text-xl` (others) |
| Wins number | `text-xs/text-sm` | `text-xl sm:text-2xl` (rank 1-3) / `text-lg sm:text-xl` (others) |
| Stat labels | `text-xs` | `text-[10px] sm:text-xs uppercase tracking-wider` |
| Points number | unchanged | unchanged |

**Visual Treatment:**
- Sessions/Wins numbers: Bold, slightly muted color (not as prominent as points)
- Points: Remains the most prominent (largest, gold glow for top 3)
- Labels: Uppercase, tracked, muted gray

### New Component Structure:

```tsx
<div className="flex items-center gap-4 sm:gap-6 ...">
  {/* Rank Badge */}
  <div>...</div>

  {/* Avatar */}
  <button>...</button>

  {/* Player Name (no longer flex-1) */}
  <div className="min-w-0 flex-shrink">
    <div className="flex items-center gap-2">
      <p className="font-bold truncate">{playerName}</p>
      {getRankChangeDisplay()}
    </div>
  </div>

  {/* Spacer */}
  <div className="flex-1" />

  {/* Stats Grid - Sessions, Wins, Points */}
  <div className="flex items-center gap-6 sm:gap-8">
    {/* Sessions */}
    <div className="text-center">
      <p className="font-display font-bold text-lg sm:text-xl text-foreground/80">
        {sessionsPlayed}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {t.ranking.sessions}
      </p>
    </div>

    {/* Wins */}
    <div className="text-center">
      <p className="font-display font-bold text-lg sm:text-xl text-foreground/80">
        {championships}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {t.ranking.wins}
      </p>
    </div>

    {/* Points (most prominent) */}
    <div className="text-center min-w-[60px]">
      <p className="font-display font-bold text-2xl sm:text-3xl text-rank-gold">
        {totalPoints}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {t.ranking.points}
      </p>
    </div>
  </div>
</div>
```

---

## Size Scaling by Rank

### Top 3 Players (rank 1-3):
- Sessions/Wins: `text-xl sm:text-2xl`
- Points: `text-3xl sm:text-4xl` (rank 1 gets `text-4xl sm:text-5xl`)
- Gap between stats: `gap-8 sm:gap-10`

### Other Players (rank 4+):
- Sessions/Wins: `text-lg sm:text-xl`
- Points: `text-2xl sm:text-3xl`
- Gap between stats: `gap-6 sm:gap-8`

---

## Visual Result

**Desktop View:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌───┐  ┌────┐                                                               │
│  │ 1 │  │ 👤 │  HANSON ↑2            8         3          156                │
│  └───┘  └────┘                    SESSIONS   WINS       POINTS               │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile View:**
```
┌───────────────────────────────────────────────────┐
│  ┌─┐ ┌──┐                    8     3      156     │
│  │1│ │👤│ HANSON ↑2        场次   胜     积分      │
│  └─┘ └──┘                                         │
└───────────────────────────────────────────────────┘
```

---

## Benefits

1. **Better space utilization** - No wasted empty space in the middle
2. **Improved scannability** - All stats are visually aligned in columns
3. **Stronger hierarchy** - Points remain most prominent, followed by wins, then sessions
4. **Professional look** - Mimics sports broadcast stat displays
5. **Mobile-friendly** - Columns compress naturally without breaking

