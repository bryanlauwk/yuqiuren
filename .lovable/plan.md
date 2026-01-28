

## Goal
Fix the desktop + tablet leaderboard so:
1) All 14 players (ranks 1–14) are accessible by scrolling the table area.
2) The table header stays visible (sticky) while scrolling through players.

## What I found (from code + my test)
- Your desktop table wrapper currently includes both `overflow-hidden` and `overflow-auto` in the same class list:
  - `className="... overflow-hidden ... overflow-auto"`
- With Tailwind utilities, conflicting `overflow-*` classes can result in the wrong one “winning” (often `overflow-hidden`), which clips rows (so rank 8/9+ appears “missing”) and prevents the table from becoming the scroll container.
- In my test, the page itself was scrolling (browser scrollbar), not the table container—so the sticky header never had a proper scroll container to stick within.
- Additionally, relying on `sticky` on `<thead>` is unreliable across browsers; sticky works best on the individual `<th>` cells.

## Implementation approach

### A) Make the table wrapper the *only* vertical scroll container (fix missing rows)
**File:** `src/components/DesktopRankingTable.tsx`

1. Replace the conflicting overflow utilities on the outer wrapper:
   - Current:
     - `... overflow-hidden ... overflow-auto`
   - Update to:
     - `overflow-x-hidden overflow-y-auto`
   - Keep the `max-h-[70vh]` so the table becomes scrollable when there are many players.
   - Add `relative` + `isolate` so sticky header layering works consistently.

**Result:** The wrapper becomes the scroll container, so ranks 8–14 are reachable.

### B) Make the header truly sticky (fix header not sticking)
**File:** `src/components/DesktopRankingTable.tsx`

2. Move sticky behavior from `<TableHeader>` / `<thead>` to the `<TableHead>` (`<th>`) cells:
   - Add to each `TableHead`:
     - `sticky top-0 z-20`
     - a solid background like `bg-card` or `bg-muted/50` so it doesn’t appear transparent while stuck
   - Keep the header row border (`border-b-2 border-border`) for a clear separation.

**Result:** The header remains visible while scrolling the table body, in desktop + tablet.

### C) Verify zebra striping stays visible (optional but recommended)
Because `.rank-row-default` uses a subtle gradient background, zebra striping can be hard to perceive.
3. Increase stripe contrast or override background on even rows (only for ranks > 3), e.g.:
   - Use a slightly stronger stripe (`bg-muted/30` instead of `/20`), or
   - Apply an inline `style={{ background: '...' }}` on striped rows to ensure it’s visible even if a gradient exists.

This is optional for the “missing players + sticky header” fix, but it addresses your earlier note that striping wasn’t visible.

## Step-by-step changes (what I will edit)
1. `src/components/DesktopRankingTable.tsx`
   - Update outer wrapper classes:
     - Remove `overflow-hidden` + `overflow-auto` combo
     - Use `overflow-x-hidden overflow-y-auto`
     - Add `relative isolate`
   - Update header implementation:
     - Remove/stop relying on `sticky` on `TableHeader`
     - Add `sticky top-0 z-20 bg-*` to each `TableHead`

## How I will test (desktop + tablet journey)
1. Desktop width:
   - Hover over the table and scroll: confirm the table area scrolls (not only the page).
   - Confirm you can reach the last row (rank 14).
   - Confirm the header row remains pinned at the top of the table while scrolling.
2. Tablet width (>= 768px so it still uses desktop table):
   - Repeat the same scroll test; confirm sticky header remains visible.
3. Regression check:
   - Ensure top-3 styling (gold/silver/bronze) remains unchanged.
   - Ensure row borders remain consistent.

## Files involved
- `src/components/DesktopRankingTable.tsx` (primary fix)

## Expected outcome
- No more “missing” players: ranks 1–14 are reachable via table scrolling.
- Sticky header works reliably on desktop and tablet (header stays visible while scrolling inside the table).

