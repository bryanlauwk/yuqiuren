

# Logo Redesign — Abstract Mark

Drop the literal shuttlecock entirely. Think Airbnb's Bélo — a simple, geometric symbol that *suggests* the sport without illustrating it. 

## Concept: "Rally"

A minimal abstract mark made of two curved arcs intersecting — evoking the arc of a shuttlecock's flight path, two players exchanging shots, or a stylized "R" for Rankings. Clean, geometric, single-weight strokes.

## Design

An inline SVG with:
- **Two sweeping arcs** that cross in the center, forming an elegant X-like shape with rounded ends — like two flight trajectories meeting
- **A small circle** at one intersection point — the shuttlecock at the moment of contact
- Monochrome white on the gradient background
- Stroke-based, no fills — modern and airy
- No rotation hacks — the geometry itself is dynamic

## Container
- Remove the heavy gradient box entirely
- The SVG sits bare (no background square) — just the mark, like Airbnb's logo in the nav
- Slightly larger: `w-8 h-8 sm:w-9 sm:h-9`
- `group-hover:scale-105` kept for interaction
- Color: `text-primary` (the electric blue) — single color mark

## File

**`src/components/Header.tsx`** — Replace the gradient container + img with a clean inline SVG abstract mark. Remove the `shuttlecock-logo.png` import.

