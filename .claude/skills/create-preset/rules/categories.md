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

**Existing presets:** DarkGradientBackground, LightGradientBackground, MorphingMeshBackground, NeonPulseBackground, MonochromeDriftBackground, SunsetOrbitBackground, GeometricGridBackground, StarfieldBackground, RadialSpotlightBackground, WaveCurveBackground, CornerGlowBackground, DiagonalSpectrumBackground, AuroraFlowBackground, FlowWaveBackground, HaloVignetteBackground, SweepArcBackground, WarmDriftBackground, BokehLightsBackground, AtmosphericFogBackground, DepthFogBackground, PaperTextureBackground, CinematicVignetteOverlay, PlexusNetworkBackground, ArchitecturalWireframeBackground, GridDotPatternBackground, GridLinePatternBackground, DiagonalStripePatternBackground, HexagonPatternBackground, WaveDotPatternBackground, ConcentricCirclePatternBackground

## texts

Typography motion effects and title layouts. Reveal, highlight, type, scramble, slide, zoom, stack.

**Conventions:**

- Accept `text: string` or `lines: string[]` prop (not children, for character-level/word-level control)
- Support `startFrame` / `durationInFrames` for sequencing
- Per-character, per-word, or per-line animation based on use case
- Preserve text readability — never animate while viewer needs to read
- Expose font size, weight, letter spacing, and color as props

**Existing presets:** BlurRevealText, FocusShiftText, CascadeLetterText, MixedWeightSlideText, StackedRepeatText, WordSwapText, TypewriterGlitchText, InlineHighlightText, WordSlideText, StackedLineText, SimpleFadeText, ColorStackText, SequentialWordText, SingleWordZoomText, ScalePopText, GlitchRevealText, WaveText, TypewriterText, WiggleText, LetterSpacingRevealText, RotateInText, SmearStretchText + BoldRightTitle, GlitchStrokeTitle, HeavyStackTitle, HighlightBarTitle, KineticSlamTitle, LabelStackTitle, LetterSpacingRevealTitle, MinimalDuoTitle, MinimalStyleTitle, MixedEmphasisTitle, ModernRightTitle, NumberFrameTitle, OutlineFillTitle, QuoteBlockTitle, RoundedBoxTitle, SandwichLabelTitle, ShadowDepthTitle, StackedCenterTitle, StackedRightTitle, StackedTrioCenterTitle

**Sub-categories:**

- **Text animations:** Reveal effects, kinetic typography, word/character-level motion
- **Title layouts:** Pre-composed title cards with specific aesthetic (bold right, stacked trio, minimal duo, etc.)

## data-visualizations

Animated charts, graphs, and data displays.

**Conventions:**

- Accept typed data props (e.g., `data: DataPoint[]`)
- Animate from zero or baseline on mount
- Support `colorScheme` or per-series color props
- Cards often wrap charts with title, subtitle, accent
- Use `useCountUp` hook for animated counters
- Zod schemas for data validation

**Existing presets:** AnimatedLineChart, AreaChartGlow, CandlestickChart, HorizontalBarChart, HorizontalBarChartCard, GroupedBarChart, GroupedBarChartCard, StackedBarChart, StackedBarChartCard, DivergingBarChart, PillBounceChart, DonutChart, DonutChartSet, DonutBreakdownCard, DualGaugeChart, SemiCircleGaugeCard, CircularRadialGauge, ActivityRings, ProgressBarCard, LoadingProgress, SplitPercentageDisplay, DemographicIcons, PyramidChart, IconStatGrid, RadarChart, RadarChartCard, DotScatterChart, TrafficLightDots, DataTableCard, SalesReportCard

## list

Structured item displays — bullets, numbered entries, search results, timelines, icon grids.

**Conventions:**

- Accept `items` array prop with item-specific data
- Staggered entry animation per item
- Support `enterDuration` and `staggerDelay` props
- Card-based or full-width layouts
- Expose accent color for theming

**Existing presets:** BarRevealList, CompactBarList, CardBulletList, FlatSearchList, GradientSearchList, OutlineSearchList, NumberedCircleList, IconGridList, TimelineScheduleList

## lower-thirds

Information bars, overlays, name titles, captions. Positioned at lower portion of frame.

**Conventions:**

- Positioned at bottom 15% of frame
- Safe zone padding (48px+ from edges)
- Slide or fade entrance
- Glassmorphism or overlay blend common
- Event-triggered animations (e.g., bell ring, particle burst)

**Existing presets:** YouTubeSubscribeOverlay

## misc

Special-purpose scenes and compositions that don't fit other categories.

**Conventions:**

- Full-scene compositions rather than overlay components
- Audio integration common
- Complex, multi-element layouts
- Domain-specific (chat, language learning)

**Existing presets:** ChatConversation, ShadowingScene

## icons

Static SVG icon components used by presets. Not standalone presets — shared assets.

**Conventions:**

- Export React SVG components
- Accept `size`, `color`, `style` props
- Used internally by misc/list/lower-third presets

**Existing presets:** MicIcon (in `icons/microphones/`)

## Extending Categories

New category workflow:

1. Create `src/shared/presets/[new-category]/` folder
2. Add first preset, schema, composition following structure rules
3. Add barrel export `index.ts`
4. Add `<Folder name="[new-category]">` in `Root.tsx`
5. Update this file with new category conventions
6. Update `preset-catalog` skill (`.opencode/skills/preset-catalog/SKILL.md`)
7. Update `AGENTS.md` and `CLAUDE.md` preset counts

**Category naming:** kebab-case, plural, descriptive. Use existing conventions: `backgrounds`, `texts`, `data-visualizations`, `list`, `lower-thirds`, `misc`, `icons`.
