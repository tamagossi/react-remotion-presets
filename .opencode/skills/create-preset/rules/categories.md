# Categories

Preset categories and their conventions. Extendable — add new categories as needed.

## backgrounds

Atmospheric full-screen backdrops. Always accept `children` for content overlay.

**Conventions:**
- Fill entire frame (`AbsoluteFill`)
- `zIndex` layering: base → effect → children
- Low motion so text remains readable
- Grain/texture optional but common
- Color palettes derived from mood

**Examples:**
- `DarkGradientBackground` — animated orbs on dark base
- `MeshGradientBackground` — flowing mesh gradient
- `ParticleFieldBackground` — starfield/particle drift

## text-animations

Typography motion effects. Reveal, highlight, type, scramble.

**Conventions:**
- Accept `text: string` prop (not children, for character-level control)
- Support `startFrame` / `endFrame` for sequencing
- Per-character or per-word animation common
- Preserve text selection/accessibility where possible

**Examples:**
- `TypewriterText` — character-by-character reveal
- `WordHighlight` — sequential word color change
- `ScrambleReveal` — decrypt effect

## transitions

Scene-to-scene visual bridges. Often used as overlay components.

**Conventions:**
- `from: number`, `to: number` props for timing control
- Full frame coverage during active period
- Alpha/opacity based common
- Accept `children` or work as overlay

**Examples:**
- `FadeTransition` — opacity fade
- `SlideWipe` — directional wipe
- `GlitchTransition` — digital distortion

## charts

Data visualization with animation.

**Conventions:**
- Accept `data: DataPoint[]` array prop
- Animate from zero on mount
- Support `colorScheme` prop
- Label/tooltip support if interactive

**Examples:**
- `BarChartRace` — animated bar chart
- `LineChartDraw` — SVG path draw-on
- `PieChartReveal` — sector-by-sector reveal

## overlays

Visual layers on top of content. Decorative, not structural.

**Conventions:**
- `pointerEvents: "none"` common
- Lower opacity (0.1 - 0.4 typical)
- Position: absolute within parent
- Optional `blendMode` prop

**Examples:**
- `VignetteOverlay` — edge darkening
- `LightLeakOverlay` — film light leaks
- `GrainOverlay` — animated film grain

## lower-thirds

Information bars, name titles, captions.

**Conventions:**
- Positioned at bottom 15% of frame
- Safe zone padding (48px+ from edges)
- Two-line layout common: primary + secondary
- Slide or fade entrance

**Examples:**
- `NameTitleLowerThird` — name + role
- `TopicBadgeLowerThird` — topic label
- `SocialHandleLowerThird` — platform + handle

## code

Source code presentation with syntax highlighting.

**Conventions:**
- Accept `code: string` and `language: string`
- Line-by-line reveal or typewriter
- Monospace font
- Line numbers optional
- Highlight specific lines via `highlightLines: number[]`

**Examples:**
- `TypewriterCode` — code types out
- `CodeBlockReveal` — lines slide in
- `TerminalWindow` — framed terminal with cursor

## list-points

Bullet points, numbered lists, feature highlights.

**Conventions:**
- Accept `items: string[]` or structured item array
- Staggered reveal per item
- Support icons/numbers before text
- Vertical stack with consistent spacing

**Examples:**
- `StaggeredList` — items fade/slide in sequentially
- `ChecklistReveal` — checkmarks animate on
- `NumberedSteps` — large number + description

## video-masks

Mask video content with shapes, text, or gradients.

**Conventions:**
- Accept `src: string` for video URL
- Mask defined via SVG clipPath or CSS mask
- Support `maskShape: 'circle' | 'text' | 'custom'`
- Animate mask scale/position

**Examples:**
- `CircleMaskVideo` — video inside expanding circle
- `TextMaskVideo` — video clipped to text shape
- `SplitRevealVideo` — mask wipes away to reveal

## scene-templates

Full pre-composed scenes combining multiple presets.

**Conventions:**
- Combine background + text + lower-third + chart
- Accept content-specific props
- Designed for specific video types (intro, outro, explainer)
- Higher complexity, more props

**Examples:**
- `ExplainerScene` — title + bullets + background
- `IntroTitleScene` — big title + subtitle + dramatic bg
- `DataStoryScene` — chart + narration text + background

## Extending Categories

New category workflow:
1. Create `src/shared/presets/[new-category]/` folder
2. Add `CATALOG.md` with header + quick guide table
3. Add first preset following structure rules
4. Add `<Folder name="[new-category]">` in `Root.tsx`
5. Update this file with new category conventions

**Category naming:** kebab-case, plural, descriptive. `video-effects`, `social-cards`, `kinetic-type`.
