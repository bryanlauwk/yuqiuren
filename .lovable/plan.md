
# Header Logo Redesign

The current logo is a basic white shuttlecock SVG on a blue gradient square — it reads as a placeholder icon rather than a brand mark.

## New Design Direction

Replace with a more detailed, polished shuttlecock logo that feels like a proper sports brand mark:

- **Outer container**: Keep `rounded-xl` with gradient, but add a subtle inner glow/ring for depth
- **SVG redesign**: A more refined shuttlecock with:
  - Detailed feather plumes fanning out (5-6 separate feather paths instead of a single triangle)
  - A proper cork base with gradient shading (warm gold tones)
  - Subtle motion trail arc behind the shuttlecock suggesting speed
  - Better proportions — the shuttlecock tilted ~15° for dynamic feel
- **Brand text**: Add "羽球人" or a short wordmark next to the icon on desktop (`hidden sm:inline` text), giving it a proper logo feel instead of just an icon

## File Changed

**`src/components/Header.tsx`** — Replace the inline SVG (lines 31-40) with a more detailed shuttlecock illustration and optional wordmark text beside it.
