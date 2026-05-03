# Audit Checklist — Universal Evaluation

Ten dimensions applied to every preset, scaled to its type. Severity determined by impact.

## 1. Entry Animation

Does the preset have a designed entrance for every major element?

**Check:**

- [ ] Primary element(s) animate in (opacity, transform, or filter change)
- [ ] Entry easing curve is intentional and appropriate for mood
- [ ] Directional movement includes anticipation (3-5 frame counter-move)
- [ ] All entry animations complete before the hold state
- [ ] Stagger between elements is deliberate, not accidental
- [ ] Entry duration is proportional to element importance

**Common failures:**

- Opacity 0→1 with no transform — boring, unmotivated
- Linear easing — robotic, cheap
- No anticipation on slides — feels floaty
- All elements enter simultaneously — flat, no hierarchy
- Entry too fast (<8 frames for main content) — feels rushed
- Entry too slow (>60 frames for minor content) — drags

**Severity assignment:**

- Missing or broken entry → 🔴 Critical
- Wrong easing curve → 🟡 Enhancement
- Could use anticipation → 🟢 Polish

## 2. Hold State

Does the preset have a readable, confident rest phase?

**Check:**

- [ ] Hold state looks intentional and designed — you'd screenshot it
- [ ] Hold duration is appropriate (minimum 15 frames at 30fps for readability)
- [ ] Typography is clean and readable during hold
- [ ] Hierarchy is clear (what should I read first/second?)
- [ ] Secondary motion exists during hold (subtle breath, not static)
- [ ] Colors don't vibrate or strain during hold
- [ ] No layout shift between entry end and hold start

**Common failures:**

- No hold at all — entry bleeds directly into exit
- Hold too short (<10 frames) — can't read
- Hold too long (>120 frames for simple content) — boring
- Typography illegible at hold (wrong size, contrast, font)
- Hold looks different from entry endpoint — visual pop
- No secondary motion during hold — looks frozen/dead

**Severity assignment:**

- Cannot read content during hold → 🔴 Critical
- Hold too short/long → 🟡 Enhancement
- No secondary motion → 🟢 Polish

## 3. Exit Animation

Does the preset gracefully exit rather than abruptly disappear?

**Check:**

- [ ] Exit animation exists for every element that entered
- [ ] Exit easing curve is intentional (often `Easing.in(...)` — slow start, fast end)
- [ ] Exit duration is proportional to entry (typically 50-70% of entry)
- [ ] Exit echoes or inverts entry motion (slide in from left → slide out left)
- [ ] Exit stagger matches or mirrors entry stagger order
- [ ] No element remains on screen after composition ends

**Common failures:**

- No exit animation at all — elements vanish at last frame → 🔴 Critical
- Exit uses entry easing — should be different direction
- Exit too abrupt (<5 frames) — jarring
- Exit stagger order doesn't match entry — confusing
- Some elements exit, some don't — inconsistent

**Severity assignment:**

- Missing exit entirely → 🔴 Critical
- Exit too abrupt → 🟡 Enhancement
- Wrong stagger order → 🟢 Polish

## 4. Secondary Motion

Is there supporting motion that reinforces the primary action?

**Check:**

- [ ] At least one layer of secondary motion exists (shadow, accent, background)
- [ ] Secondary motion is at 10-30% intensity of primary — subtle, not distracting
- [ ] Secondary motion has its own (slightly offset) timing
- [ ] Parallax or depth effect if multiple layers exist
- [ ] Grain/texture/vignette animates if present (grain should be frame-varying)

**Common failures:**

- No secondary motion at all — flat, video-gamey
- Secondary motion at 80-100% intensity — competing, distracting
- Shadow doesn't animate when element moves — uncanny
- Background is completely static while foreground animates — disconnected

**Severity assignment:**

- No secondary motion in complex preset → 🟡 Enhancement
- Missing shadow animation → 🟢 Polish
- Competing secondary motion → 🔴 Critical (if it breaks readability)

## 5. Typography

Is the text treatment professional and video-safe?

**Check:**

- [ ] Font is loaded (check for Google Font hooks: `useAnton`, `useInter`, etc.)
- [ ] `fontFamily` includes fallback chain
- [ ] `lineHeight` is explicitly set (not browser default)
- [ ] `textTransform` is set (uppercase is common for titles)
- [ ] `letterSpacing` is appropriate for font at target size
- [ ] Text size is readable at common viewing distances (minimum 24px for body)
- [ ] Text doesn't overflow at default config width
- [ ] `whiteSpace: "pre"` is set if character-level animation is used
- [ ] `willChange` includes "filter, opacity, transform" if text animates

**Common failures:**

- Font not loaded → 🔴 Critical (browser fallback, ugly)
- Missing `lineHeight` → causes jumpy layout
- Missing `whiteSpace: "pre"` on char-animated text → collapses spaces
- `fontSize` too small for video → unreadable at distance
- Wrong `textTransform` — lowercase titles look amateur
- No `willChange` on animated text — performance hit

**Severity assignment:**

- Font not loaded → 🔴 Critical
- Missing `whiteSpace: "pre"` → 🔴 Critical (breaks rendering)
- Missing `lineHeight` → 🟡 Enhancement
- Font size too small → 🟡 Enhancement

## 6. Color

Is the color palette harmonious, accessible, and mood-appropriate?

**Check:**

- [ ] Colors follow a coherent palette (complementary, triadic, analogous, monochromatic)
- [ ] Text has sufficient contrast against background (minimum 4.5:1 for body, 3:1 for large text)
- [ ] Accent colors are used sparingly — too many competing colors is chaotic
- [ ] Colors support the intended mood (warm = energetic, cool = calm, dark = dramatic)
- [ ] Gradient stops are evenly spaced and don't band
- [ ] Opacity values don't create muddy colors (check overlay stacking)

**Common failures:**

- Low contrast text → 🔴 Critical (inaccessible, unreadable)
- Too many colors competing → 🟡 Enhancement
- Colors clash (e.g., pure red on pure blue vibrates) → 🟡 Enhancement
- Gradient banding due to too few stops → 🟢 Polish
- Mood-appropriate but still ugly → 🟡 Enhancement

**Severity assignment:**

- Unreadable text contrast → 🔴 Critical
- Clashing colors → 🟡 Enhancement
- Gradient banding → 🟢 Polish

## 7. Performance

Is the preset efficient and render-friendly?

**Check:**

- [ ] `willChange` is set on every animating element's style
- [ ] Filter properties (blur, brightness) are bounded and don't blow out
- [ ] No expensive operations per-frame without necessity
- [ ] SVG elements don't re-render unnecessarily (use `React.memo` or static components)
- [ ] Number of simultaneously animating elements is reasonable (<100 for browser)
- [ ] CSS transforms used instead of `top`/`left` for position animation
- [ ] `GrainOverlay` opacity is reasonable (0.05-0.15) — too high costs GPU

**Common failures:**

- No `willChange` on animating elements → causes unnecessary repaints
- `filter: blur(100px)` on full-screen element → GPU hammer
- 500+ animating elements → browser renderer chokes
- `top`/`left` animation instead of `transform: translate()` → layout thrashing

**Severity assignment:**

- Layout thrashing (`top`/`left` animation) → 🔴 Critical
- Missing `willChange` → 🟡 Enhancement
- High element count → 🟡 Enhancement (if >200)

## 8. Props API

Is the prop interface complete, well-typed, and appropriately configurable?

**Check:**

- [ ] Props include `enterDuration` or equivalent timing controls
- [ ] Props include `exitDuration` or equivalent exit timing controls
- [ ] Props include `easing` as a bezier tuple _or_ named easing option
- [ ] Props include `startFrame` for sequencing within a composition
- [ ] Props include color overrides (text color, accent color, background color)
- [ ] Props include `fontFamily`, `fontSize`, `fontWeight` if text is involved
- [ ] Default values are sensible and produce a stunning result out of the box
- [ ] Zod schema exists and matches the prop types exactly
- [ ] No unused or dead props
- [ ] Props are sorted alphabetically in the interface and destructuring

**Common failures:**

- No `exitDuration` prop → 🔴 Critical (can't control exit)
- No easing prop → 🟡 Enhancement
- Defaults produce ugly result → 🔴 Critical
- Prop exists but not used → 🔵 Refactor
- Wrong alphabetical order → 🔵 Refactor

**Severity assignment:**

- Default values look bad → 🔴 Critical
- Missing critical controls → 🟡 Enhancement
- Unused props → 🔵 Refactor
- Ordering violations → 🔵 Refactor

## 9. Schema & Composition

Is the Zod schema complete and the playground composition representative?

**Check:**

- [ ] Zod schema exists with all props defined
- [ ] Schema types match the TS interface exactly
- [ ] Schema defaults match component defaults exactly
- [ ] Composition file exists and is properly registered
- [ ] Composition uses `defaultProps` with representative values
- [ ] Composition duration is reasonable (typically 5-8 seconds, 150-240 frames)
- [ ] Composition is in the correct `<Folder>` in Root.tsx

**Common failures:**

- Missing schema → 🟡 Enhancement
- Schema and component defaults differ → 🔴 Critical (confusing UX)
- Composition duration too short/long → 🟡 Enhancement
- Not registered in Root.tsx → 🔴 Critical (can't preview)

**Severity assignment:**

- Not registered → 🔴 Critical
- Schema mismatch → 🔴 Critical
- Missing schema → 🟡 Enhancement

## 10. Code Quality

Is the code clean, consistent, and compliant with project conventions?

**Check:**

- [ ] No unused imports (`unused-imports/no-unused-imports`)
- [ ] Exports are alphabetically sorted (`perfectionist/sort-exports`)
- [ ] Interface properties sorted alphabetically (`perfectionist/sort-interfaces`)
- [ ] JSX props sorted alphabetically (`react/jsx-sort-props`)
- [ ] No inline handlers named starting with `handle` (use descriptive action verbs)
- [ ] No `any` types unless absolutely necessary
- [ ] Imports use path alias `@/` for src
- [ ] Barrel export includes the component
- [ ] File passes `npm run lint`

**Common failures:**

- ESLint errors → 🔵 Refactor
- Alphabetical ordering violations → 🔵 Refactor
- Unused imports → 🔵 Refactor
- `any` types without necessity → 🔵 Refactor

**Severity assignment:**

- All 🔵 Refactor — these don't change visual output but improve maintainability
