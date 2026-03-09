

# Logo Redesign — Realistic Shuttlecock

The current SVG uses thin triangular shapes that look flat and childish. Redesign based on the reference image: a side-view shuttlecock with overlapping curved feathers fanning out from a round cork base, rendered with proper depth using strokes and layered fills.

## Changes

**`src/components/Header.tsx`** (lines 32-62) — Replace the SVG with a more detailed, realistic shuttlecock:

- **Cork base**: A proper sphere with gradient shading (light gray to darker gray) and a dark rim/band, matching the reference's glossy round cork
- **Feather skirt**: 8-10 overlapping curved feather shapes fanning outward from the cork, using `path` curves with subtle stroke outlines (not filled triangles)
- **Feather detail**: Light cross-hatching lines on feathers for texture, similar to the reference's hand-drawn style
- **Color palette**: White/light gray feathers with thin dark gray outlines — clean monochrome look that works on the blue gradient background
- **Orientation**: Side view matching reference (cork bottom-right, feathers fanning upper-left), tilted ~30°
- **Remove**: Motion trail arcs, gold cork gradient — replace with the cleaner monochrome style

Container and wordmark text stay unchanged.

