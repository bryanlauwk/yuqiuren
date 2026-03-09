

# Blue-White Sporting Theme Redesign

Shift the entire visual identity from dark red/green "cinematic arena" to a vibrant, youthful blue-white tone inspired by BWF broadcast graphics (like the uploaded All England Open references).

## Color Palette Transformation

Current: Dark background (#0a0a0a), deep red primary, dark green accent
New: Deep navy background, vibrant electric blue primary, cyan/teal accent, white foreground with blue tints

```text
OLD                          NEW
--background: 0 0% 4%    →  215 35% 7%     (deep navy-black)
--card: 0 0% 8%           →  215 30% 11%    (navy card)
--primary: 0 70% 35%      →  210 100% 55%   (electric blue)
--accent: 150 60% 15%     →  195 90% 45%    (cyan/teal)
--arena-red: 0 70% 30%    →  210 100% 40%   (deep blue)
--arena-green: 150 60% 12% → 195 80% 20%   (dark cyan)
--ring: 0 70% 40%         →  210 100% 55%   (blue ring)
--border: 0 0% 18%        →  215 25% 18%    (navy border)
--muted: 0 0% 15%         →  215 25% 15%    (navy muted)
```

Gold/silver/bronze ranking tokens stay unchanged (universal sports colors).

## Files to Modify

### 1. `src/index.css` — Core theme variables + utility classes
- Update all `:root` CSS variables to blue-white palette
- Update `.dark` to match
- Update gradient utilities: `arena-hero-gradient`, `motion-streak`, `arena-particles`, `accent-bar`, `text-gradient-arena`, `rank-row-default`, `player-glow-breathe` — all shift from red/green hues to blue/cyan hues
- Spotlight pulse keyframes shift to blue tones

### 2. `src/components/hero/SpotlightBeams.tsx`
- Change spotlight beam colors from gold/red/white to blue/cyan/white

### 3. `src/components/hero/CourtLines.tsx`
- Court line gradient stays white (neutral), no changes needed

### 4. `src/components/ArenaHero.tsx`
- Hero background image stays (it still features badminton players)
- Gradient overlay shifts: `from-background via-background/20 to-background/60` will auto-adapt since it uses CSS variables

### 5. `src/components/Header.tsx`
- Logo SVG gradient: change `from-primary/80 to-accent/60` — will auto-adapt via CSS vars
- No structural changes needed

### 6. `src/components/BadmintonRally.tsx`
- Stroke colors use `hsl(var(--primary))` and `hsl(var(--accent))` — will auto-adapt

### 7. `tailwind.config.ts`
- No changes needed (all colors reference CSS variables)

## Scope Summary

| File | Change Type |
|------|-------------|
| `src/index.css` | Full color variable overhaul + gradient utility updates |
| `src/components/hero/SpotlightBeams.tsx` | Spotlight colors from gold/red to blue/cyan |

Most components already use CSS variable references, so changing the variables in `index.css` propagates everywhere automatically. Only hardcoded HSL values in utilities and spotlight beams need manual updates.

