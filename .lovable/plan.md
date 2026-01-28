

# Responsive Ranking Layout: Mobile vs Desktop

## Overview
Create a completely different layout approach for mobile and desktop views to optimize the user experience on each device type. Mobile will use a compact card-based layout, while desktop will use a full table layout with all columns visible.

---

## Problem Analysis

Current issues on mobile:
- Player names truncated due to horizontal space constraints
- All stats (sessions, wins, points) compete for limited width
- Single-row layout doesn't scale well below 400px
- Rank badge, avatar, name, and 3 stat columns all cramped together

---

## Solution: Dual Layout Strategy

### Mobile Layout (< 768px)
A **stacked card design** where each player gets a compact card with:
- Top row: Rank badge + Avatar + Full player name (no truncation)
- Bottom row: Stats displayed horizontally with equal spacing

```text
+--------------------------------------------------+
|  [1]  [Avatar]   Player Full Name Here    [▲2]   |
|       12 sessions  •  5 wins  •  156 pts         |
+--------------------------------------------------+
```

### Desktop Layout (>= 768px)
A **proper table layout** with fixed column widths showing all data clearly:

```text
| Rank | Player           | Sessions | Wins | Points |
|------|------------------|----------|------|--------|
|  1   | [Avatar] Name    |    12    |  5   |  156   |
|  2   | [Avatar] Name    |    10    |  3   |  120   |
```

---

## Technical Implementation

### 1. Create New Mobile Card Component

**File: `src/components/MobileRankingCard.tsx`**

A dedicated component for mobile with a two-row stacked layout:
- Row 1: Identity (rank, avatar, name, rank change indicator)
- Row 2: Stats bar (sessions, wins, points) with dot separators

Features:
- Player name takes full width, no truncation
- Larger touch targets for avatar click
- Stats displayed in a single line with subtle separators
- Top 3 players get special glow effects and larger sizing

### 2. Create Desktop Table Component

**File: `src/components/DesktopRankingTable.tsx`**

A proper HTML table layout with:
- Sticky header row with column labels
- Fixed column widths for consistent alignment
- All columns visible: Rank, Player, Sessions, Wins, Points
- Top 3 rows get special row styling (gold/silver/bronze)
- Trophy icons for wins column on top 3

### 3. Update RankingPage with Responsive Switching

**File: `src/pages/RankingPage.tsx`**

Use the `useIsMobile()` hook to conditionally render:
- `<MobileRankingCard />` when `isMobile === true`
- `<DesktopRankingTable />` when `isMobile === false`

```tsx
const isMobile = useIsMobile();

return (
  <>
    {isMobile ? (
      <div className="space-y-3">
        {rankings.map(ranking => (
          <MobileRankingCard key={ranking.player_id} {...ranking} />
        ))}
      </div>
    ) : (
      <DesktopRankingTable rankings={rankings} onAvatarClick={handleAvatarClick} />
    )}
  </>
);
```

---

## Mobile Card Design Details

### Structure
```tsx
<div className="bg-card rounded-lg p-3 border">
  {/* Row 1: Identity */}
  <div className="flex items-center gap-3">
    <RankBadge rank={rank} />
    <Avatar player={player} />
    <div className="flex-1 min-w-0">
      <p className="font-bold text-foreground">{playerName}</p>
    </div>
    <RankChangeIndicator change={rankChange} />
  </div>
  
  {/* Row 2: Stats */}
  <div className="flex items-center justify-around mt-2 pt-2 border-t">
    <StatItem value={sessions} label="sessions" />
    <span className="text-muted-foreground">•</span>
    <StatItem value={wins} label="wins" icon={<Trophy />} />
    <span className="text-muted-foreground">•</span>
    <StatItem value={points} label="pts" highlight />
  </div>
</div>
```

### Top 3 Mobile Enhancements
- Rank 1: Gold border glow, larger card padding
- Rank 2: Silver border accent
- Rank 3: Bronze border accent
- All get trophy icons next to wins

---

## Desktop Table Design Details

### Structure
```tsx
<Table>
  <TableHeader>
    <TableRow className="bg-muted/50">
      <TableHead className="w-16">Rank</TableHead>
      <TableHead>Player</TableHead>
      <TableHead className="w-24 text-center">Sessions</TableHead>
      <TableHead className="w-24 text-center">Wins</TableHead>
      <TableHead className="w-28 text-center">Points</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rankings.map(ranking => (
      <TableRow className={getRowStyles(ranking.rank)}>
        <TableCell><RankBadge /></TableCell>
        <TableCell><Avatar + Name + RankChange /></TableCell>
        <TableCell>{sessions}</TableCell>
        <TableCell><Trophy icon for top 3> {wins}</TableCell>
        <TableCell className="font-bold">{points}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Top 3 Row Styling
- Row background gradients matching arena theme
- Subtle glow effects on hover
- Larger font sizes for points column

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/MobileRankingCard.tsx` | Create | New stacked card layout for mobile |
| `src/components/DesktopRankingTable.tsx` | Create | Table layout for desktop |
| `src/pages/RankingPage.tsx` | Modify | Add responsive switching logic |
| `src/components/PlayerRankingCard.tsx` | Keep | May be deprecated or kept for reference |

---

## Visual Comparison

### Before (Current)
Mobile cramped single row:
```text
[1][👤][Player Na...][12][5][156]
```

### After (Proposed)
Mobile stacked card:
```text
+----------------------------------+
| [1] [👤]  Player Full Name   ▲2  |
|     12 sessions • 5 wins • 156   |
+----------------------------------+
```

Desktop proper table:
```text
+------+------------------+----------+------+--------+
| Rank | Player           | Sessions | Wins | Points |
+------+------------------+----------+------+--------+
|  1   | [👤] Player Name |    12    |  5   |  156   |
+------+------------------+----------+------+--------+
```

---

## Benefits

1. **No more truncated names** - Mobile card gives full width to player name
2. **Better readability** - Each stat has dedicated space
3. **Touch-friendly** - Larger tap targets on mobile
4. **Professional desktop view** - Proper table with column headers
5. **Consistent with BWF aesthetic** - Table layout matches broadcast graphics
6. **Maintains existing styling** - Top 3 glow effects, rank badges, trophy icons

---

## Technical Notes

- Uses existing `useIsMobile()` hook (768px breakpoint)
- Leverages existing UI table components from `src/components/ui/table.tsx`
- Maintains translation support via `useLanguage()` hook
- Avatar click handler passed through for lightbox functionality
- Top 3 special styling preserved in both layouts

