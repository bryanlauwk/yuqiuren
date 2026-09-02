Plan: Breathe room in hero + tighten ranking table internal gap

1. Hero — more vertical presence
   - File: `src/components/ArenaHero.tsx`
   - Increase the section padding: `py-12 sm:py-16 lg:py-20` (or equivalent), giving the title block more top/bottom breathing room without changing the content.
   - Keep the two-column layout but slightly widen the gap between the title block and the stats/CTA block so the right module feels anchored, not crammed.

2. Desktop ranking table — reduce the empty middle and fill the width
   - File: `src/components/DesktopRankingTable.tsx`
   - The internal gap between the player column and the points column is caused by the player column absorbing all leftover width while the points column is fixed narrow. Fix by assigning proportional widths:
     - Player column: a fixed share of the table width (e.g., `w-5/12` or similar) so the name/avatar block ends predictably.
     - Points column: fill the remaining width so the points bar stretches across the space and the number stays at the right edge.
     - Keep rank and stat columns narrow and fixed.
   - Reduce horizontal cell padding slightly (e.g., `px-2 lg:px-3`) so the table does not feel stretched apart on smaller desktop widths.
   - Ensure the points bar container is `w-full` and the bar text remains right-aligned with a small inner padding so it never touches the border.
   - Preserve the current top-3 row spacing, separators, hover effects, and avatar sizes.

3. Verify
   - Open the preview in desktop and mobile widths.
   - Confirm the hero feels taller and the title is not visually crushed.
   - Confirm the ranking table fills the container and the gap between the player name and the points bar is visibly reduced.
   - Confirm no horizontal overflow on 1280px or 1440px screens.

Scope: UI-only changes to the existing components. No data model, backend, or translation changes.
