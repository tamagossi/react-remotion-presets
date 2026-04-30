# Root.tsx Refactor Plan

## Goal

1. Order compositions alphabetically in both backgrounds and titles folders
2. Use barrel exports for composition imports instead of individual file imports

## Step 1: Create `src/shared/presets/backgrounds/compositions/index.ts`

```ts
export { ArchitecturalWireframeBackgroundComposition } from "./ArchitecturalWireframeBackgroundComposition";
export { AtmosphericFogBackgroundComposition } from "./AtmosphericFogBackgroundComposition";
export { AuroraFlowBackgroundComposition } from "./AuroraFlowBackgroundComposition";
export { BackgroundComposition } from "./BackgroundComposition";
export { BokehLightsBackgroundComposition } from "./BokehLightsBackgroundComposition";
export { CinematicVignetteOverlayComposition } from "./CinematicVignetteOverlayComposition";
export { CornerGlowBackgroundComposition } from "./CornerGlowBackgroundComposition";
export { DepthFogBackgroundComposition } from "./DepthFogBackgroundComposition";
export { DiagonalSpectrumBackgroundComposition } from "./DiagonalSpectrumBackgroundComposition";
export { FlowWaveBackgroundComposition } from "./FlowWaveBackgroundComposition";
export { GeometricGridBackgroundComposition } from "./GeometricGridBackgroundComposition";
export { GeometricTessellationBackgroundComposition } from "./GeometricTessellationBackgroundComposition";
export { HaloVignetteBackgroundComposition } from "./HaloVignetteBackgroundComposition";
export { LightGradientBackgroundComposition } from "./LightGradientBackgroundComposition";
export { MonochromeDriftBackgroundComposition } from "./MonochromeDriftBackgroundComposition";
export { MorphingMeshBackgroundComposition } from "./MorphingMeshBackgroundComposition";
export { NeonPulseBackgroundComposition } from "./NeonPulseBackgroundComposition";
export { NodeScatterBackgroundComposition } from "./NodeScatterBackgroundComposition";
export { PaperTextureBackgroundComposition } from "./PaperTextureBackgroundComposition";
export { PlexusNetworkBackgroundComposition } from "./PlexusNetworkBackgroundComposition";
export { RadialSpotlightBackgroundComposition } from "./RadialSpotlightBackgroundComposition";
export { StarfieldBackgroundComposition } from "./StarfieldBackgroundComposition";
export { SunsetOrbitBackgroundComposition } from "./SunsetOrbitBackgroundComposition";
export { SweepArcBackgroundComposition } from "./SweepArcBackgroundComposition";
export { WarmDriftBackgroundComposition } from "./WarmDriftBackgroundComposition";
export { WaveCurveBackgroundComposition } from "./WaveCurveBackgroundComposition";
```

## Step 2: Create `src/shared/presets/titles/compositions/index.ts`

```ts
export { BoldRightTitleComposition } from "./BoldRightTitleComposition";
export { CardFillTitleComposition } from "./CardFillTitleComposition";
export { ControllersUnderlineTitleComposition } from "./ControllersUnderlineTitleComposition";
export { DoubleFrameTitleComposition } from "./DoubleFrameTitleComposition";
export { ExclusiveLabelTitleComposition } from "./ExclusiveLabelTitleComposition";
export { GiantInitialTitleComposition } from "./GiantInitialTitleComposition";
export { HeroSubtitleTitleComposition } from "./HeroSubtitleTitleComposition";
export { LabelStackTitleComposition } from "./LabelStackTitleComposition";
export { MinimalDuoTitleComposition } from "./MinimalDuoTitleComposition";
export { MinimalStyleTitleComposition } from "./MinimalStyleTitleComposition";
export { ModernRightTitleComposition } from "./ModernRightTitleComposition";
export { NumberFrameTitleComposition } from "./NumberFrameTitleComposition";
export { OffsetFramesTitleComposition } from "./OffsetFramesTitleComposition";
export { OutlineBoxTitleComposition } from "./OutlineBoxTitleComposition";
export { OverlineUnderlineTitleComposition } from "./OverlineUnderlineTitleComposition";
export { SplitHighlightTitleComposition } from "./SplitHighlightTitleComposition";
export { StackedCenterTitleComposition } from "./StackedCenterTitleComposition";
export { StackedRightTitleComposition } from "./StackedRightTitleComposition";
export { StackedTrioCenterTitleComposition } from "./StackedTrioCenterTitleComposition";
export { StrikethroughBadgeTitleComposition } from "./StrikethroughBadgeTitleComposition";
export { VerticalAccentTitleComposition } from "./VerticalAccentTitleComposition";
```

## Step 3: Rewrite Root.tsx

Replace the 26 individual background composition imports with a single barrel import:

```ts
import {
  ArchitecturalWireframeBackgroundComposition,
  AtmosphericFogBackgroundComposition,
  AuroraFlowBackgroundComposition,
  BackgroundComposition,
  BokehLightsBackgroundComposition,
  CinematicVignetteOverlayComposition,
  CornerGlowBackgroundComposition,
  DepthFogBackgroundComposition,
  DiagonalSpectrumBackgroundComposition,
  FlowWaveBackgroundComposition,
  GeometricGridBackgroundComposition,
  GeometricTessellationBackgroundComposition,
  HaloVignetteBackgroundComposition,
  LightGradientBackgroundComposition,
  MonochromeDriftBackgroundComposition,
  MorphingMeshBackgroundComposition,
  NeonPulseBackgroundComposition,
  NodeScatterBackgroundComposition,
  PaperTextureBackgroundComposition,
  PlexusNetworkBackgroundComposition,
  RadialSpotlightBackgroundComposition,
  StarfieldBackgroundComposition,
  SunsetOrbitBackgroundComposition,
  SweepArcBackgroundComposition,
  WarmDriftBackgroundComposition,
  WaveCurveBackgroundComposition,
} from "./shared/presets/backgrounds/compositions";
```

Replace the 21 individual title composition imports with:

```ts
import {
  BoldRightTitleComposition,
  CardFillTitleComposition,
  ControllersUnderlineTitleComposition,
  DoubleFrameTitleComposition,
  ExclusiveLabelTitleComposition,
  GiantInitialTitleComposition,
  HeroSubtitleTitleComposition,
  LabelStackTitleComposition,
  MinimalDuoTitleComposition,
  MinimalStyleTitleComposition,
  ModernRightTitleComposition,
  NumberFrameTitleComposition,
  OffsetFramesTitleComposition,
  OutlineBoxTitleComposition,
  OverlineUnderlineTitleComposition,
  SplitHighlightTitleComposition,
  StackedCenterTitleComposition,
  StackedRightTitleComposition,
  StackedTrioCenterTitleComposition,
  StrikethroughBadgeTitleComposition,
  VerticalAccentTitleComposition,
} from "./shared/presets/titles/compositions";
```

### Backgrounds Section - Alphabetical Order:

1. ArchitecturalWireframeBackground
2. AtmosphericFogBackground
3. AuroraFlowBackground (new - needs composition + registration)
4. BackgroundComposition
5. BokehLightsBackground
6. CinematicVignetteOverlay
7. CornerGlowBackground (new - needs composition + registration)
8. DepthFogBackground
9. DiagonalSpectrumBackground (new - needs composition + registration)
10. FlowWaveBackground
11. GeometricGridBackground
12. GeometricTessellationBackground
13. HaloVignetteBackground
14. LightGradientBackground
15. MonochromeDriftBackground
16. MorphingMeshBackground
17. NeonPulseBackground
18. NodeScatterBackground
19. PaperTextureBackground
20. PlexusNetworkBackground
21. RadialSpotlightBackground (new - needs composition + registration)
22. StarfieldBackground
23. SunsetOrbitBackground
24. SweepArcBackground
25. WarmDriftBackground
26. WaveCurveBackground (new - needs composition + registration)

Note: Some backgrounds exist in the barrel but don't have compositions registered yet (AuroraFlow, CornerGlow, DiagonalSpectrum, RadialSpotlight, WaveCurve). These need compositions created AND registered. But this is out of scope - only register what already has compositions.

Actually, let me check which backgrounds DON'T have compositions yet...

Already-registered backgrounds (current Root.tsx):

- BackgroundComposition
- LightGradientBackground
- MorphingMeshBackground
- NeonPulseBackground
- NodeScatterBackground
- MonochromeDriftBackground
- SunsetOrbitBackground
- FlowWaveBackground
- GeometricGridBackground
- GeometricTessellationBackground
- HaloVignetteBackground
- StarfieldBackground
- SweepArcBackground
- WarmDriftBackground
- AtmosphericFogBackground
- ArchitecturalWireframeBackground
- BokehLightsBackground
- DepthFogBackground
- PaperTextureBackground
- PlexusNetworkBackground
- CinematicVignetteOverlay

Missing from Root.tsx but have composition files:

- AuroraFlowBackgroundComposition
- CornerGlowBackgroundComposition
- DiagonalSpectrumBackgroundComposition
- RadialSpotlightBackgroundComposition
- WaveCurveBackgroundComposition

These should be added too. Need to check if they have Props types in the backgrounds barrel.

### Titles Section - Alphabetical Order:

1. BoldRightTitle
2. CardFillTitle
3. ControllersUnderlineTitle
4. DoubleFrameTitle
5. ExclusiveLabelTitle
6. GiantInitialTitle
7. HeroSubtitleTitle
8. LabelStackTitle
9. MinimalDuoTitle
10. MinimalStyleTitle
11. ModernRightTitle
12. NumberFrameTitle
13. OffsetFramesTitle
14. OutlineBoxTitle
15. OverlineUnderlineTitle
16. SplitHighlightTitle
17. StackedCenterTitle
18. StackedRightTitle
19. StackedTrioCenterTitle
20. StrikethroughBadgeTitle
21. VerticalAccentTitle

## Step 4: Fix existing lint error

In AtmosphericFogBackground defaultProps, swap `bandBlur` and `baseColor` so `bandBlur` comes before `baseColor` (alphabetical order).

## Step 5: Run lint + typecheck
