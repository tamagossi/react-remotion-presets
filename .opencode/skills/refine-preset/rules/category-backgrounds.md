# Category Heuristics — Backgrounds

Background presets are the canvas. They must create atmosphere without stealing focus from content.

## Structural Check

A background preset typically has:

- `AbsoluteFill` base layer
- One or more animated decorative layers (gradients, shapes, particles, waves)
- Optional `GrainOverlay` and/or `VignetteOverlay`
- `children` rendering at the highest z-index

## Background-Specific Evaluation Criteria

### 1. Motion Intensity

Background motion must be subtle — it's the stage, not the star.

**Check:**
- Position drift: maximum 10-15% of viewport per element
- Scale breathing: 1.0 ± 0.15 max (breathe between 0.85 and 1.15)
- Opacity pulsing: 0.05-0.15 range (not swinging 0-1)
- Rotation: maximum ±5 degrees
- Motion speed: slow (60+ frames for a full cycle)

**Redflags:**
- Motion >20% of viewport → 🟡 Enhancement (competes with content)
- Rapid pulsing (<30 frames per cycle) → 🟡 Enhancement (distracting)
- Elements cross the center focal point → 🟡 Enhancement
- Multiple fast-moving layers → 🔴 Critical (content unreadable)

### 2. Content Readability

Background exists to support children. Primary test: can you read white text on top?

**Check:**
- No bright spots (>80% luminance) where white text would disappear
- No extremely dark areas (<5% luminance) where dark accents would vanish
- Gradient transitions are gradual — no harsh lines that text can straddle
- Text overlays have sufficient contrast across the entire animated range

**Redflags:**
- Bright focal point at center where title would go → 🔴 Critical
- Light/dark banding that text might cross → 🟡 Enhancement
- Color that matches common text colors (if bg is white, text is invisible) → 🔴 Critical

### 3. Atmospheric Depth

Great backgrounds have depth — some layers feel close, others distant.

**Check:**
- Multiple layers with different motion speeds (parallax)
- At least 2-3 distinct depth planes (far, mid, near)
- Larger elements move slower (far), smaller move faster (near) — or vice versa, but consistently
- Blur increases with distance (far elements are softer)
- Opacity decreases with distance

**Redflags:**
- All layers move at same speed → 🟡 Enhancement (flat, no depth)
- Single-layer background → 🟢 Polish (simple can be elegant if intentional)
- No blur/focus variation → 🟢 Polish

### 4. Grain & Texture Balance

Grain and vignette add cinematic texture but can overwhelm.

**Check:**
- `GrainOverlay` opacity: 0.03-0.08 for subtle, 0.10-0.15 for heavy (never higher)
- `VignetteOverlay` strength: 0.2-0.5 (0.5 is very dark edges)
- Grain animates (different noise pattern each frame)
- Vignette is smooth and gradual, not a harsh circle

**Redflags:**
- Grain opacity >0.2 → 🔴 Critical (destroys compression, visual noise)
- Vignette creates visible dark circle → 🟡 Enhancement
- No grain on otherwise "cinematic" background → 🟢 Polish

### 5. Color Mood Consistency

The color palette must match the intended mood.

| Mood | Palette Characteristics |
|---|---|
| Dramatic / Cinematic | Dark base (#0a0a12-#1a1a2e), muted warm/cool accents |
| Energetic / Modern | Vibrant saturation, neon accents, high contrast |
| Calm / Professional | Muted, analogous colors, soft gradients |
| Technical / Data | Dark base, blue/cyan/teal accents, clean separation |
| Playful / Creative | Bright, varied palette, warm dominant with cool pops |

**Redflags:**
- Colors clash with stated mood → 🟡 Enhancement
- Too many competing colors (5+ distinct) → 🟡 Enhancement
- Default colors are ugly → 🔴 Critical

### 6. Performance

Backgrounds render every frame — performance matters most here.

**Check:**
- Particle count is bounded (no infinite particles)
- SVG elements are not re-computed per-frame unnecessarily
- Blur radii are reasonable (max 80px on full-screen elements)
- `willChange` set on animating layers
- No unnecessary `useVideoConfig` destructuring (only get what you need)

**Redflags:**
- Full-screen blur >100px → 🟡 Enhancement (GPU cost)
- 500+ animating elements → 🔴 Critical (render may fail)
- Unbounded particle systems → 🔴 Critical (memory leak risk)

### 7. Common Background Anti-Patterns

- `overflow: "hidden"` on `AbsoluteFill` without a clipping container → content bleeds.
- Linear gradients without color stop positions → hard transitions.
- Sin/cos math for position without `Math.PI` normalization → uneven cycles.
- Gradient direction doesn't match content flow (if content is vertical, gradient should be horizontal for contrast).
- Missing z-index on `children` container → children render behind decorative layers.
