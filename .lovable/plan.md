

# Fix Table Border Consistency

## Problem
The desktop ranking table has inconsistent border styling:
- **Last row** has no bottom border (removed by `[&_tr:last-child]:border-0` in TableBody)
- **First data row** top border depends on header border which may look different
- Border opacity varies between top 3 rows and regular rows

---

## Solution

Apply consistent `border-b border-border` to ALL rows including the last one, and ensure visual cohesion throughout the table.

---

## Technical Changes

### File: `src/components/DesktopRankingTable.tsx`

**Change 1:** Override the TableBody's last-child border removal by adding explicit border classes to TableRow that persist for all rows.

**Change 2:** Apply consistent `border-b border-border` to all rows (not just top 3).

```tsx
// Current (line 106-112):
<TableRow 
  key={ranking.player_id}
  className={cn(
    "transition-all duration-200",
    getRowStyles(ranking.rank),
    isTopThree && "border-b border-border/50"
  )}
>

// Updated:
<TableRow 
  key={ranking.player_id}
  className={cn(
    "transition-all duration-200 border-b border-border",
    getRowStyles(ranking.rank)
  )}
>
```

**Change 3:** Add a top border to the first data row for visual separation from header, or alternatively ensure the header bottom border matches row borders.

---

## Visual Result

```text
+------------------------------------------+  ← outer border
| Rank | Player | Sessions | Wins | Points |  ← header
+------------------------------------------+  ← border-b-2 (header)
|  1   | Gold   |    12    |  5   |  156   |
+------------------------------------------+  ← border-b (consistent)
|  2   | Silver |    10    |  3   |  120   |
+------------------------------------------+  ← border-b (consistent)
|  3   | Bronze |     8    |  2   |   95   |
+------------------------------------------+  ← border-b (consistent)
|  4   | Player |     6    |  1   |   70   |
+------------------------------------------+  ← border-b (NOW VISIBLE)
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/DesktopRankingTable.tsx` | Apply `border-b border-border` to all TableRow elements consistently |

---

## Implementation Notes

- The `border-b border-border` class will override the TableBody's default `[&_tr:last-child]:border-0` behavior using CSS specificity
- All rows (including the last one) will have the same bottom border for visual consistency
- The outer container's `rounded-lg border border-border overflow-hidden` already provides the frame, so internal row borders just need to be consistent separators

