## Issue

The desktop ranking table header row still looks noticeably taller than the data rows, creating an obvious gap between the header and the first player.

## Root cause

The shadcn `TableHead` primitive (`src/components/ui/table.tsx`) bakes in `h-12` (a fixed 48px height) on every `<th>`. Our `py-1.5` / `py-2` density paddings in `DesktopRankingTable` do not override an explicit `height`, so the header row is pinned at 48px regardless of density — while data rows shrink to ~32–44px based on `py-*`. The mismatch is the visible "white band" under the header.

A secondary contributor: the default `TableRow` bottom border on the header uses the same weight as body rows, which makes the extra header height read as empty space rather than a divider.

## Fix

Scope changes to `src/components/DesktopRankingTable.tsx` only (no edits to the shared `ui/table.tsx` primitive, to avoid affecting other tables).

1. Neutralize the baked-in header height per column by adding `h-auto` to every `TableHead` className. This lets `py-1.5` (compact) / `py-2` (comfy) actually determine header height.
2. Tighten header vertical padding one more notch so the header hugs the divider:
   - compact: `py-1` (was `py-1.5`)
   - comfortable: `py-1.5` (was `py-2`)
3. Make the header/body divider read as a hard rule instead of dead space: keep the existing `border-b border-foreground` on the header row, and add `leading-none` to header text so line-height doesn't inflate the row.
4. Verify body rows also share the same grid: keep `align-middle` on all cells (already in place) and confirm no residual `p-4` from the primitive is bleeding into the first/last column — our explicit `px-*`/`py-*` classes override it, so no change needed.

## Verification

- Load `/` on desktop, compare header row height vs first data row in both Compact and Comfortable modes — they should differ only by the intended 2–4px padding.
- Toggle Compact ↔ Comfortable; header shrinks/grows in lockstep with rows.
- Spot-check that no other table in the app (admin views) is affected, since we only touched `DesktopRankingTable`.
