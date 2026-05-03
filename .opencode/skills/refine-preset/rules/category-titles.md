# Category Heuristics — Titles

Title presets have the most visual weight and are often the first thing the audience sees. They set the tone for the entire video.

## Structural Check

A title preset typically has:

- **Primary line**: The main text, bold, large, anchors the composition
- **Secondary line**: Subtitle, label, or category tag — smaller, lighter weight
- **Accent element(s)**: Underline, box, bar, frame, or decorative shape

## Title-Specific Evaluation Criteria

### 1. Hierarchy Weight

The eye must know where to look immediately.

**Check:**
- Primary line is visually dominant (largest, boldest, brightest)
- Secondary line is clearly subordinate (60-70% size of primary, lighter weight)
- Accent elements sit between or behind text — never compete for attention
- If there's a third text element (label, category tag), it's the smallest

**Redflags:**
- Primary and secondary same size → 🔴 Critical
- Accent element brighter than primary text → 🟡 Enhancement
- No clear focal point → 🟡 Enhancement

### 2. Accent Motion Timing

Underlines, boxes, bars, and frames should enter slightly after text or with a different animation.

**Check:**
- Accent draws/spreads after text has settled (5-10 frame delay)
- Accent eases with purpose (underline draws from left, box scales from center)
- Accent doesn't overshoot further than text
- Accent color complements, doesn't clash

**Redflags:**
- Accent appears simultaneously with text → 🟡 Enhancement (flat choreography)
- Accent draws in wrong direction (English reads left→right, accent should follow) → 🟢 Polish
- Accent linger on exit after text is gone → 🟡 Enhancement

### 3. Safe Margins & Positioning

Title text must be readable at all viewport sizes.

**Check:**
- Text is centered or has equal margins
- No text within 48px of any edge (safe zone)
- If positioned (e.g., modern right-aligned), margin is intentional and consistent
- Long text doesn't overflow at 1080p width

**Redflags:**
- Text within 40px of edges → 🟡 Enhancement (will clip on some displays)
- Centering relies on `textAlign` alone, not layout → 🟢 Polish
- No `maxWidth` or `padding` on container → 🟡 Enhancement

### 4. Subtitle Pairing

If a subtitle exists, its relationship to the primary must be clear.

**Check:**
- Subtitle enters after primary (staggered, 10-20 frame delay)
- Subtitle uses secondary font weight (regular, not bold)
- Subtitle is smaller (50-60% of primary `fontSize`)
- Vertical gap between primary and subtitle is intentional (golden ratio ideal — 1.618x)

**Redflags:**
- Subtitle enters before primary → 🔴 Critical (audience reads wrong thing)
- Same font/size/weight → 🔴 Critical (no hierarchy)
- No gap or tiny gap (practically touching) → 🟡 Enhancement

### 5. Title Animation Engine Integration

Many titles use the `TitleAnimationEngine` component for choreography. Check:

- [ ] If engine is used, props are complete (startFrame, stagger, effect)
- [ ] If engine is NOT used but the title is complex, should it be?
- [ ] Engine variants match the title's design intent (don't use "glitch" on corporate title)

### 6. Type & Duration

Title timing must match its category purpose.

| Title Type | Entry | Hold | Exit | Total |
|---|---|---|---|---|
| Hero / Opening | 30-45f | 30-60f | 20-30f | 80-135f |
| Section / Chapter | 20-30f | 30-45f | 15-25f | 65-100f |
| Label / Tag | 10-15f | 15-20f | 10-15f | 35-50f |
| Lower-third | 10-20f | 60-90f | 10-15f | 80-125f |

Multiply by 2 for 60fps compositions. Spring animations may vary.

**Redflags:**
- Hero title <60 frames total → 🔴 Critical (too fast to read)
- Label >70 frames → 🟡 Enhancement (overstays welcome)
- Entry longer than hold → 🟡 Enhancement (awkward pacing)

### 7. Common Title Anti-Patterns

- Text transform: `uppercase` without adjusted tracking → letters cramp together. Add `letterSpacing: "0.02em"` minimum.
- Drop shadow on light text → muddies readability. Use dark offset or no shadow on light text.
- Gradient text without `backgroundClip: "text"` → gradient applies to box, not text.
- Gradient text with `WebkitBackgroundClip: "text"` but missing `color: "transparent"` → doesn't work.
- `fontSize` in pixels without scaling consideration → prefer `rem` or `vw` for responsive.
