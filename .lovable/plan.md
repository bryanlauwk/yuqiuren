
# Fix Missing Players & Sticky Header

## Problems Identified

### 1. Missing Players (Rank 8+)
The database contains **14 players**, but some are not visible due to:
- **Nested scroll containers**: The `Table` component creates its own `overflow-auto` wrapper, and then `DesktopRankingTable` adds another `max-h-[70vh] overflow-auto` wrapper outside
- This creates conflicting scroll contexts where the inner scroll may not trigger, cutting off content

### 2. Sticky Header Not Working
The `sticky top-0` on `TableHeader` fails because:
- Sticky positioning only works relative to the nearest scrolling ancestor
- The `Table` component creates an inner scrollable div that contains the actual `<thead>`
- The sticky header is trying to stick to the inner container, but the visible scroll is on the outer container

---

## Solution

Remove the scroll behavior from the inner `Table` wrapper and keep only ONE scrolling container at the outer level.

### File: `src/components/ui/table.tsx`

**Change**: Remove `overflow-auto` from the Table component's inner div, or make it configurable.

```tsx
// Current (line 6-9):
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);

// Updated - remove overflow-auto:
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
```

This allows the outer container in `DesktopRankingTable.tsx` to be the sole scroll container, making:
- All 14 players visible within the scrollable area
- Sticky header work correctly relative to the outer scrolling div

---

## Visual Result

```text
+------------------------------------------+ ← sticky header stays here
| Rank | Player | Sessions | Wins | Points |
+------------------------------------------+
|  1   | Gold   |    12    |  5   |  156   | ↑
|  2   | Silver |    10    |  3   |  120   | |
|  ...                                     | | scrollable content
|  13  | Player |     1    |  0   |    1   | |
|  14  | Player |     1    |  0   |    1   | ↓
+------------------------------------------+
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/ui/table.tsx` | Remove `overflow-auto` from the Table wrapper div |

---

## Technical Notes

- This is the minimal change needed to fix both issues
- The outer container's `max-h-[70vh] overflow-auto` will handle all scrolling
- The sticky header will now properly stick to the scrolling container
- All 14 players will be accessible via scrolling
