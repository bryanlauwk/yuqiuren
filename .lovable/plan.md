

# Real Player Photo Hero Background

## Overview
Replace the SVG silhouettes with a professional composite image featuring real badminton players, blended into the red/green arena gradient background - similar to BWF broadcast graphics.

---

## Analysis of Reference Image

The reference shows:
- Multiple player photos layered at different sizes and positions
- Players facing center with dynamic action poses
- Red tint on left side, green tint on right side
- Soft blending/feathering of photo edges into the gradient
- Particles and texture overlays for atmosphere
- A professional "sports broadcast" composite look

---

## Implementation Approach

### Option: Use AI to Generate a Custom Hero Background

Since we need a professional-looking composite that blends real players into the arena theme, the best approach is to:

1. **Generate a custom hero background image** using Lovable AI (image generation)
2. **Replace SVG silhouettes** with this generated/composite image
3. **Apply CSS blending and overlay effects** for seamless integration

### Why AI Generation?
- Creates a unique, cohesive image that matches the exact color scheme
- Avoids copyright issues with real BWF player photos
- Can be styled to perfectly match the arena red/green gradient
- Professional composite look without needing Photoshop

---

## Technical Implementation

### 1. Generate Hero Background Image

Use the Gemini image generation model to create a badminton-themed hero composite:
- Red/dark tones on left side
- Green/dark tones on right side  
- Dynamic player silhouettes or stylized figures in action poses
- Particles, light effects, and shuttlecock elements
- Professional sports broadcast aesthetic

### 2. Update ArenaHero Component

Replace the SVG player components with the new background image:

```tsx
// New structure
<section className="relative w-full overflow-hidden">
  {/* Hero background image with blending */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${heroBackground})` }}
  />
  
  {/* Gradient overlays for blending */}
  <div className="absolute inset-0 bg-gradient-to-r from-arena-red/80 via-transparent to-arena-green/80" />
  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
  
  {/* Keep existing effects */}
  <CourtLines />
  <SpotlightBeams />
  <FloatingShuttlecocks />
  
  {/* Content */}
  <div className="relative z-10 ...">
    <h1>...</h1>
  </div>
</section>
```

### 3. Remove Old SVG Components

Delete or deprecate:
- `src/components/hero/PlayerSilhouetteLeft.tsx`
- `src/components/hero/PlayerSilhouetteRight.tsx`

### 4. CSS Blending Enhancements

Add new utilities for image blending:

```css
/* Hero image with multiply/overlay blend */
.hero-image-blend {
  mix-blend-mode: multiply;
  opacity: 0.9;
}

/* Gradient mask for soft edges */
.hero-image-mask {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
}
```

---

## Image Generation Prompt Strategy

For Gemini image generation, use a prompt like:

> "Professional sports broadcast style hero banner with badminton players in dynamic poses. Dark moody atmosphere with red tones on the left side and green tones on the right side. Players shown as dramatic silhouettes with action poses - one in defensive stance, one mid-smash. Include subtle particles, light streaks, and a shuttlecock. Cinematic sports aesthetic similar to BWF tournament graphics. 16:9 aspect ratio, high contrast, premium broadcast quality."

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/ArenaHero.tsx` | Replace SVG components with background image |
| `src/assets/hero-players.png` | New generated composite image |
| `src/index.css` | Add image blending utilities |
| `src/components/hero/PlayerSilhouetteLeft.tsx` | Delete (no longer needed) |
| `src/components/hero/PlayerSilhouetteRight.tsx` | Delete (no longer needed) |

---

## Mobile Responsiveness

- Background image uses `bg-cover bg-center` for proper scaling
- Gradient overlays ensure text readability on all devices
- Image position adjusts via `object-position` for mobile vs desktop

---

## Benefits

1. **Professional look** - Matches BWF broadcast quality
2. **Unique branding** - Custom generated, no copyright concerns
3. **Better blending** - Real photos/renders integrate better than SVG
4. **Simpler codebase** - One image vs complex SVG components
5. **Faster loading** - Optimized image vs rendering multiple SVGs

---

## Alternative: User-Provided Image

If you prefer to use a specific image (like the reference provided):
- Copy it to `src/assets/hero-background.png`
- Apply gradient overlays and blending to integrate with theme
- This gives immediate results without AI generation

