

## Goal
Add a "no change" indicator for players whose rank stayed the same, ensuring consistent UI/UX across all players in the leaderboard.

## Problem Identified

Currently, the ranking table shows:
- Green arrow with number when a player moves UP
- Red arrow with number when a player moves DOWN  
- **Nothing** when a player's rank is unchanged

This creates visual inconsistency where some players (ranks 1-10) show trend indicators while others (ranks 11-14 who had no rank movement) show nothing. Users may wonder if there's a bug or missing data.

## Solution

Add a horizontal dash/minus indicator for players whose rank hasn't changed (but who have participated in previous sessions). This provides visual consistency and confirms to users that the system is working correctly.

### Visual Result

| Rank | Player | Trend Display |
|------|--------|---------------|
| 1 | Lao Wong | ↑ 2 (green) |
| 8 | Jia Her | ↓ 6 (red) |
| 11 | Sam | — (gray, no change) |
| 13 | Moong | (nothing - not in latest session) |

### Design Decision

Show the "no change" indicator only for players who:
- Have `rank_change === 0`
- AND participated in previous sessions (`!is_new`)
- AND were not absent from the latest session

Players who didn't participate in the latest session won't show any indicator (their rank wasn't "actively" calculated for this session).

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/DesktopRankingTable.tsx` | Update `getRankChangeDisplay` to show a muted dash when `rank_change === 0` for eligible players |
| `src/components/MobileRankingCard.tsx` | Apply the same change to maintain mobile/desktop consistency |
| `src/hooks/useRankings.ts` | (Optional) Add flag to indicate if player was in latest session, for more precise control |

## Implementation Details

### A) Update Desktop Table Display
In `src/components/DesktopRankingTable.tsx`, modify the `getRankChangeDisplay` function:

```typescript
const getRankChangeDisplay = (ranking: PlayerRanking) => {
  if (ranking.rank_change > 0) {
    return (
      <div className="flex items-center gap-0.5 text-finished">
        <ArrowUp className="w-3 h-3" />
        <span className="text-xs font-medium">{ranking.rank_change}</span>
      </div>
    );
  }
  
  if (ranking.rank_change < 0) {
    return (
      <div className="flex items-center gap-0.5 text-destructive">
        <ArrowDown className="w-3 h-3" />
        <span className="text-xs font-medium">{Math.abs(ranking.rank_change)}</span>
      </div>
    );
  }
  
  // Show dash for unchanged rank (if player is not new)
  if (!ranking.is_new) {
    return (
      <div className="flex items-center text-muted-foreground">
        <Minus className="w-3 h-3" />
      </div>
    );
  }
  
  return null;
};
```

### B) Update Mobile Card Display
Apply the same logic to `src/components/MobileRankingCard.tsx` for consistency.

### C) Pass Full Ranking Object
Update the function call from `getRankChangeDisplay(ranking.rank_change)` to `getRankChangeDisplay(ranking)` so we can access both `rank_change` and `is_new` properties.

## Expected Outcome

- All players who have been in the system before will show a trend indicator
- ↑ N for rank improvement (green)
- ↓ N for rank decline (red)  
- — for no change (muted gray)
- New players show nothing (or optionally a "NEW" badge)
- Consistent visual treatment across all rows

