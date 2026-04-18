

The decorative SVG components (`BadmintonDoodles`, `FloatingShuttlecocks`) currently use soft strokes, low opacities, and dark-mode-friendly colors (whites, blues, gold). For the "Game On" aesthetic they need to be redrawn with **chunky black ink, lime accents, and hard edges** — matching the neo-brutalist hero/cards.

I also need to re-mount them on the home page (`RankingPage.tsx`), where they were hidden during the pivot.

## Redraw approach

**Shared visual language**
- Strokes: `hsl(var(--foreground))` (near-black), thick (`3-4px`), `strokeLinecap="round"`, no dashes (chunky over sketchy)
- Fills: `hsl(var(--primary))` lime for accent shapes (cork base, score chips, stars)
- Opacity bumped up: doodles at `0.18-0.35` (was `0.10-0.20`) so they read on the cream bg
- No more gold/silver/bronze hues — lime is the only accent
- Score bubbles: white fill, 2px black border, hard offset shadow (`shadow-[3px_3px_0_hsl(var(--foreground))]`), black uppercase Archivo text

**`BadmintonDoodles.tsx` — full repaint**
- Court outlines: solid black strokes (drop dashes), one with a lime fill-tint at `0.05`
- Shuttlecocks: black feather strokes, lime cork base
- Rackets: black frame + strings, lime grip tape band on handle
- Motion arcs: solid black, thicker, no dashes
- Stars/sparkles: filled lime with black stroke
- Dots: solid lime or black (no translucent rank-gold)
- Score bubbles: white card + black border + hard shadow, black Archivo text

**`FloatingShuttlecocks.tsx` — full repaint**
- Cork: lime fill with black stroke
- Feathers: black stroke, white fill
- Trail path: solid black with lime mid-stop, thicker stroke

**`RankingPage.tsx` — re-mount**
- Add `<BadmintonDoodles />` back as the fixed background layer
- Add `<FloatingShuttlecocks />` inside/near the hero area
- Keep `BlueParticles` / `SpotlightBeams` hidden (those are dark-mode only)

## Files touched

| File | Change |
|---|---|
| `src/components/BadmintonDoodles.tsx` | Full repaint to black ink + lime accents |
| `src/components/hero/FloatingShuttlecocks.tsx` | Repaint cork lime, feathers black, thicker trail |
| `src/pages/RankingPage.tsx` | Re-mount both decorative layers |

