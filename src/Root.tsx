import React from "react";

import "./index.css";

import { Composition, Folder } from "remotion";

import { MyComposition } from "./Composition";
import { FPS } from "./shared/constatns/fps";
import {
  ArchitecturalWireframeBackgroundProps,
  ArchitecturalWireframeBackgroundSchema,
  AtmosphericFogBackgroundProps,
  AtmosphericFogBackgroundSchema,
  AuroraFlowBackgroundProps,
  AuroraFlowBackgroundSchema,
  BokehLightsBackgroundProps,
  BokehLightsBackgroundSchema,
  CinematicVignetteOverlayProps,
  CinematicVignetteOverlaySchema,
  ConcentricCirclePatternBackgroundProps,
  ConcentricCirclePatternBackgroundSchema,
  CornerGlowBackgroundProps,
  CornerGlowBackgroundSchema,
  DarkGradientBackgroundProps,
  DarkGradientBackgroundSchema,
  DepthFogBackgroundProps,
  DepthFogBackgroundSchema,
  DiagonalSpectrumBackgroundProps,
  DiagonalSpectrumBackgroundSchema,
  DiagonalStripePatternBackgroundProps,
  DiagonalStripePatternBackgroundSchema,
  FlowWaveBackgroundProps,
  FlowWaveBackgroundSchema,
  GeometricGridBackgroundProps,
  GeometricGridBackgroundSchema,
  GeometricTessellationBackgroundProps,
  GeometricTessellationBackgroundSchema,
  GridDotPatternBackgroundProps,
  GridDotPatternBackgroundSchema,
  GridLinePatternBackgroundProps,
  GridLinePatternBackgroundSchema,
  HaloVignetteBackgroundProps,
  HaloVignetteBackgroundSchema,
  HexagonPatternBackgroundProps,
  HexagonPatternBackgroundSchema,
  LightGradientBackgroundProps,
  LightGradientBackgroundSchema,
  MonochromeDriftBackgroundProps,
  MonochromeDriftBackgroundSchema,
  MorphingMeshBackgroundProps,
  MorphingMeshBackgroundSchema,
  NeonPulseBackgroundProps,
  NeonPulseBackgroundSchema,
  NodeScatterBackgroundProps,
  NodeScatterBackgroundSchema,
  PaperTextureBackgroundProps,
  PaperTextureBackgroundSchema,
  PlexusNetworkBackgroundProps,
  PlexusNetworkBackgroundSchema,
  RadialSpotlightBackgroundProps,
  RadialSpotlightBackgroundSchema,
  StarfieldBackgroundProps,
  StarfieldBackgroundSchema,
  SunsetOrbitBackgroundProps,
  SunsetOrbitBackgroundSchema,
  SweepArcBackgroundProps,
  SweepArcBackgroundSchema,
  WarmDriftBackgroundProps,
  WarmDriftBackgroundSchema,
  WaveCurveBackgroundProps,
  WaveCurveBackgroundSchema,
  WaveDotPatternBackgroundProps,
  WaveDotPatternBackgroundSchema,
} from "./shared/presets/backgrounds";
import {
  ArchitecturalWireframeBackgroundComposition,
  AtmosphericFogBackgroundComposition,
  AuroraFlowBackgroundComposition,
  BackgroundComposition,
  BokehLightsBackgroundComposition,
  CinematicVignetteOverlayComposition,
  ConcentricCirclePatternBackgroundComposition,
  CornerGlowBackgroundComposition,
  DepthFogBackgroundComposition,
  DiagonalSpectrumBackgroundComposition,
  DiagonalStripePatternBackgroundComposition,
  FlowWaveBackgroundComposition,
  GeometricGridBackgroundComposition,
  GeometricTessellationBackgroundComposition,
  GridDotPatternBackgroundComposition,
  GridLinePatternBackgroundComposition,
  HaloVignetteBackgroundComposition,
  HexagonPatternBackgroundComposition,
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
  WaveDotPatternBackgroundComposition,
} from "./shared/presets/backgrounds/compositions";
import {
  ActivityRingsProps,
  ActivityRingsSchema,
  AnimatedLineChartProps,
  AnimatedLineChartSchema,
  AreaChartGlowProps,
  AreaChartGlowSchema,
  CandlestickChartProps,
  CandlestickChartSchema,
  CircularRadialGaugeProps,
  CircularRadialGaugeSchema,
  DataTableCardProps,
  DataTableCardSchema,
  DemographicIconsProps,
  DemographicIconsSchema,
  DivergingBarChartProps,
  DivergingBarChartSchema,
  DonutBreakdownCardProps,
  DonutBreakdownCardSchema,
  DonutChartProps,
  DonutChartSchema,
  DonutChartSetProps,
  DonutChartSetSchema,
  DotScatterChartProps,
  DotScatterChartSchema,
  DualGaugeChartProps,
  DualGaugeChartSchema,
  GroupedBarChartCardProps,
  GroupedBarChartCardSchema,
  GroupedBarChartProps,
  GroupedBarChartSchema,
  HorizontalBarChartCardProps,
  HorizontalBarChartCardSchema,
  HorizontalBarChartProps,
  HorizontalBarChartSchema,
  IconStatGridProps,
  IconStatGridSchema,
  LoadingProgressProps,
  LoadingProgressSchema,
  NestedArcChartProps,
  NestedArcChartSchema,
  PillBounceChartProps,
  PillBounceChartSchema,
  ProgressBarCardProps,
  ProgressBarCardSchema,
  PyramidChartProps,
  PyramidChartSchema,
  RadarChartCardProps,
  RadarChartCardSchema,
  RadarChartProps,
  RadarChartSchema,
  RadialRingChartProps,
  RadialRingChartSchema,
  SalesReportCardProps,
  SalesReportCardSchema,
  SemiCircleGaugeCardProps,
  SemiCircleGaugeCardSchema,
  SplitPercentageDisplayProps,
  SplitPercentageDisplaySchema,
  StackedBarChartCardProps,
  StackedBarChartCardSchema,
  StackedBarChartProps,
  StackedBarChartSchema,
  TrafficLightDotsProps,
  TrafficLightDotsSchema,
} from "./shared/presets/data-visualizations";
import {
  ActivityRingsComposition,
  AnimatedLineChartComposition,
  AreaChartGlowComposition,
  CandlestickChartComposition,
  CircularRadialGaugeComposition,
  DataTableCardComposition,
  DemographicIconsComposition,
  DivergingBarChartComposition,
  DonutBreakdownCardComposition,
  DonutChartComposition,
  DonutChartSetComposition,
  DotScatterChartComposition,
  DualGaugeChartComposition,
  GroupedBarChartCardComposition,
  GroupedBarChartComposition,
  HorizontalBarChartCardComposition,
  HorizontalBarChartComposition,
  IconStatGridComposition,
  LoadingProgressComposition,
  NestedArcChartComposition,
  PillBounceChartComposition,
  ProgressBarCardComposition,
  PyramidChartComposition,
  RadarChartCardComposition,
  RadarChartComposition,
  RadialRingChartComposition,
  SalesReportCardComposition,
  SemiCircleGaugeCardComposition,
  SplitPercentageDisplayComposition,
  StackedBarChartCardComposition,
  StackedBarChartComposition,
  TrafficLightDotsComposition,
} from "./shared/presets/data-visualizations/compositions";
import {
  BigTextStackProps,
  BigTextStackSchema,
  BulletFocusListProps,
  BulletFocusListSchema,
  CylinderRolodexListProps,
  CylinderRolodexListSchema,
  FocusHighlightListProps,
  FocusStackListProps,
  FocusStackListSchema,
  GoldGradientStackListProps,
  GradientCarouselListProps,
  KineticTextMorphProps,
  KineticTextMorphSchema,
  PillBarListProps,
  PillTagListProps,
  PillTagListSchema,
  StarPointListProps,
  StickyNoteScatterProps,
  StickyNoteScatterSchema,
} from "./shared/presets/list-points";
import {
  BigTextStackComposition,
  BulletFocusListComposition,
  CylinderRolodexListComposition,
  FocusHighlightListComposition,
  FocusStackListComposition,
  GoldGradientStackListComposition,
  GradientCarouselListComposition,
  KineticTextMorphComposition,
  PillBarListComposition,
  PillTagListComposition,
  StarPointListComposition,
  StickyNoteScatterComposition,
} from "./shared/presets/list-points/compositions";
import {
  BlurRevealTextProps,
  CascadeLetterTextProps,
  ColorStackTextProps,
  FocusShiftTextProps,
  GlitchRevealTextProps,
  InlineHighlightTextProps,
  LetterSpacingRevealTextProps,
  MixedWeightSlideTextProps,
  ScalePopTextProps,
  SequentialWordTextProps,
  SimpleFadeTextProps,
  SingleWordZoomTextProps,
  StackedLineTextProps,
  StackedRepeatTextProps,
  TypewriterGlitchTextProps,
  TypewriterTextProps,
  WaveTextProps,
  WiggleTextProps,
  WordSlideTextProps,
  WordSwapTextProps,
} from "./shared/presets/texts";
import {
  BlurRevealTextComposition,
  CascadeLetterTextComposition,
  ColorStackTextComposition,
  FocusShiftTextComposition,
  GlitchRevealTextComposition,
  InlineHighlightTextComposition,
  LetterSpacingRevealTextComposition,
  MixedWeightSlideTextComposition,
  ScalePopTextComposition,
  SequentialWordTextComposition,
  SimpleFadeTextComposition,
  SingleWordZoomTextComposition,
  StackedLineTextComposition,
  StackedRepeatTextComposition,
  TypewriterGlitchTextComposition,
  TypewriterTextComposition,
  WaveTextComposition,
  WiggleTextComposition,
  WordSlideTextComposition,
  WordSwapTextComposition,
} from "./shared/presets/texts/compositions";
import {
  BoldRightTitleProps,
  BoldRightTitleSchema,
  CardFillTitleProps,
  CardFillTitleSchema,
  ControllersUnderlineTitleProps,
  ControllersUnderlineTitleSchema,
  DoubleFrameTitleProps,
  DoubleFrameTitleSchema,
  ExclusiveLabelTitleProps,
  ExclusiveLabelTitleSchema,
  GeometricMaskTitleProps,
  GeometricMaskTitleSchema,
  GiantInitialTitleProps,
  GiantInitialTitleSchema,
  GlitchStrokeTitleProps,
  GlitchStrokeTitleSchema,
  GradientTrailTitleProps,
  GradientTrailTitleSchema,
  HeavyStackTitleProps,
  HeavyStackTitleSchema,
  HeroSubtitleTitleProps,
  HeroSubtitleTitleSchema,
  HighlightBarTitleProps,
  HighlightBarTitleSchema,
  LabelStackTitleProps,
  LabelStackTitleSchema,
  LetterSpacingRevealTitleProps,
  LetterSpacingRevealTitleSchema,
  MinimalDuoTitleProps,
  MinimalDuoTitleSchema,
  MinimalStyleTitleProps,
  MinimalStyleTitleSchema,
  MixedEmphasisTitleProps,
  MixedEmphasisTitleSchema,
  ModernRightTitleProps,
  ModernRightTitleSchema,
  NumberFrameTitleProps,
  NumberFrameTitleSchema,
  OffsetFramesTitleProps,
  OffsetFramesTitleSchema,
  OutlineBoxTitleProps,
  OutlineBoxTitleSchema,
  OutlineFillTitleProps,
  OutlineFillTitleSchema,
  OverlineUnderlineTitleProps,
  OverlineUnderlineTitleSchema,
  QuoteBlockTitleProps,
  QuoteBlockTitleSchema,
  RoundedBoxTitleProps,
  RoundedBoxTitleSchema,
  SandwichLabelTitleProps,
  SandwichLabelTitleSchema,
  ShadowDepthTitleProps,
  ShadowDepthTitleSchema,
  SplitHighlightTitleProps,
  SplitHighlightTitleSchema,
  StackedCenterTitleProps,
  StackedCenterTitleSchema,
  StackedRightTitleProps,
  StackedRightTitleSchema,
  StackedTrioCenterTitleProps,
  StackedTrioCenterTitleSchema,
  StrikethroughBadgeTitleProps,
  StrikethroughBadgeTitleSchema,
  VerticalAccentTitleProps,
  VerticalAccentTitleSchema,
} from "./shared/presets/titles";
import {
  BoldRightTitleComposition,
  CardFillTitleComposition,
  ControllersUnderlineTitleComposition,
  DoubleFrameTitleComposition,
  ExclusiveLabelTitleComposition,
  GeometricMaskTitleComposition,
  GiantInitialTitleComposition,
  GlitchStrokeTitleComposition,
  GradientTrailTitleComposition,
  HeavyStackTitleComposition,
  HeroSubtitleTitleComposition,
  HighlightBarTitleComposition,
  LabelStackTitleComposition,
  LetterSpacingRevealTitleComposition,
  MinimalDuoTitleComposition,
  MinimalStyleTitleComposition,
  MixedEmphasisTitleComposition,
  ModernRightTitleComposition,
  NumberFrameTitleComposition,
  OffsetFramesTitleComposition,
  OutlineBoxTitleComposition,
  OutlineFillTitleComposition,
  OverlineUnderlineTitleComposition,
  QuoteBlockTitleComposition,
  RoundedBoxTitleComposition,
  SandwichLabelTitleComposition,
  ShadowDepthTitleComposition,
  SplitHighlightTitleComposition,
  StackedCenterTitleComposition,
  StackedRightTitleComposition,
  StackedTrioCenterTitleComposition,
  StrikethroughBadgeTitleComposition,
  VerticalAccentTitleComposition,
} from "./shared/presets/titles/compositions";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        height={720}
        id="MyComp"
        width={1280}
      />
      <Folder name="backgrounds">
        <Composition
          component={ArchitecturalWireframeBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="ArchitecturalWireframeBackground"
          schema={ArchitecturalWireframeBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              baseColor: "#020617",
              driftSpeed: 0.15,
              easing: [0.45, 0, 0.55, 1],
              fadeToCenter: true,
              grainAmount: 0.3,
              grainOpacity: 0.04,
              gridDensity: 10,
              lineColor: "#38bdf8",
              lineOpacity: 0.35,
              lineThickness: 0.8,
              perspectiveStrength: 0.7,
              vanishingPointX: 0.5,
              vanishingPointY: 0.5,
              vignetteStrength: 0.4,
            } satisfies ArchitecturalWireframeBackgroundProps
          }
        />
        <Composition
          component={AtmosphericFogBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="AtmosphericFogBackground"
          schema={AtmosphericFogBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              bandBlur: 100,
              bandCount: 4,
              bandOpacity: 0.35,
              baseColor: "#0a0a12",
              easing: [0.45, 0, 0.55, 1],
              fogColors: ["#334155", "#475569", "#64748b", "#94a3b8"],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.45,
            } satisfies AtmosphericFogBackgroundProps
          }
        />
        <Composition
          component={AuroraFlowBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="AuroraFlowBackground"
          schema={AuroraFlowBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 25,
              baseColor: "#0a0418",
              blurAmount: 180,
              colors: ["#3b82f6", "#a855f7", "#ec4899", "#06b6d4"],
              easing: [0.45, 0, 0.55, 1],
              flowAmount: 0.12,
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.3,
              zoneOpacity: 0.65,
              zoneSize: 1.3,
            } satisfies AuroraFlowBackgroundProps
          }
        />
        <Composition
          component={BackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="BackgroundComposition"
          schema={DarkGradientBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              baseColor: "#020617",
              blobCount: 3,
              blobOpacity: 0.55,
              blobSize: 1.4,
              blurAmount: 140,
              colors: ["#0f172a", "#1e293b", "#334155"],
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.35,
            } satisfies DarkGradientBackgroundProps
          }
        />
        <Composition
          component={BokehLightsBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="BokehLightsBackground"
          schema={BokehLightsBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 25,
              baseColor: "#0a0a14",
              blurAmount: 60,
              bokehCount: 18,
              bokehOpacity: 0.55,
              driftAmount: 0.4,
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.03,
              hexShape: false,
              lightSize: 1.0,
              vignetteStrength: 0.4,
              bokehColors: [
                "#f472b6",
                "#a78bfa",
                "#60a5fa",
                "#fbbf24",
                "#34d399",
              ],
            } satisfies BokehLightsBackgroundProps
          }
        />
        <Composition
          component={CinematicVignetteOverlayComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="CinematicVignetteOverlay"
          schema={CinematicVignetteOverlaySchema}
          width={1280}
          defaultProps={
            {
              grainAmount: 0.3,
              grainAnimated: true,
              grainOpacity: 0.04,
              grainSpeed: 0.5,
              lightLeakColor: "#ff6b35",
              lightLeakOpacity: 0.08,
              vignetteColor: "#000000",
              vignetteShape: "oval",
              vignetteStrength: 0.4,
            } satisfies CinematicVignetteOverlayProps
          }
        />
        <Composition
          component={ConcentricCirclePatternBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="ConcentricCirclePatternBackground"
          schema={ConcentricCirclePatternBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              animationSpeed: 1,
              easing: [0.45, 0, 0.55, 1],
              lineWidth: 1,
              opacity: 0.35,
              patternDensity: 8,
              ringSpacing: 80,
              theme: "dark",
              vignetteStrength: 0.25,
            } satisfies ConcentricCirclePatternBackgroundProps
          }
        />
        <Composition
          component={CornerGlowBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="CornerGlowBackground"
          schema={CornerGlowBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 22,
              baseColor: "#0a0a14",
              blurAmount: 140,
              easing: [0.45, 0, 0.55, 1],
              glowColors: ["#7c3aed", "#06b6d4"],
              glowCorners: ["br", "tr"],
              glowDrift: 0.05,
              glowOpacity: 0.7,
              glowSize: 1.3,
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.4,
            } satisfies CornerGlowBackgroundProps
          }
        />
        <Composition
          component={DepthFogBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="DepthFogBackground"
          schema={DepthFogBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              baseColor: "#0a0a14",
              blobCount: 6,
              blobOpacity: 0.45,
              blobSize: 1.6,
              blurAmount: 120,
              colors: ["#1e293b", "#334155", "#475569", "#64748b"],
              depthLayers: 3,
              easing: [0.45, 0, 0.55, 1],
              focusLayer: 1,
              focusShiftSpeed: 0.3,
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.35,
            } satisfies DepthFogBackgroundProps
          }
        />
        <Composition
          component={DiagonalSpectrumBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="DiagonalSpectrumBackground"
          schema={DiagonalSpectrumBackgroundSchema}
          width={1280}
          defaultProps={
            {
              angleEnd: 200,
              angleStart: 135,
              animationDuration: 24,
              baseColor: "#02061a",
              colors: ["#0072ff", "#00c6a7", "#0072ff"],
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              spectrumOpacity: 1,
              vignetteStrength: 0.2,
            } satisfies DiagonalSpectrumBackgroundProps
          }
        />
        <Composition
          component={DiagonalStripePatternBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="DiagonalStripePatternBackground"
          schema={DiagonalStripePatternBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              animationSpeed: 1,
              easing: [0.45, 0, 0.55, 1],
              opacity: 0.3,
              patternDensity: 30,
              stripeAngle: 45,
              stripeWidth: 10,
              theme: "dark",
              vignetteStrength: 0.25,
            } satisfies DiagonalStripePatternBackgroundProps
          }
        />
        <Composition
          component={FlowWaveBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="FlowWaveBackground"
          schema={FlowWaveBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 18,
              baseColor: "#020617",
              easing: [0.45, 0, 0.55, 1],
              flowSpeed: 0.6,
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.3,
              waveBlur: 80,
              waveColors: ["#0e7490", "#1e3a8a", "#0891b2"],
              waveCount: 3,
              waveOpacity: 0.6,
              waveThickness: 0.35,
            } satisfies FlowWaveBackgroundProps
          }
        />
        <Composition
          component={GeometricGridBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="GeometricGridBackground"
          schema={GeometricGridBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              baseColor: "#060d18",
              easing: [0.45, 0, 0.55, 1],
              fadeToHorizon: true,
              glowPulse: true,
              gridDensity: 12,
              lineColor: "#4a7fcf",
              lineOpacity: 0.6,
              lineWidth: 1,
              perspective: 600,
              vignetteStrength: 0.25,
            } satisfies GeometricGridBackgroundProps
          }
        />
        <Composition
          component={GeometricTessellationBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="GeometricTessellationBackground"
          schema={GeometricTessellationBackgroundSchema}
          width={1280}
          defaultProps={
            {
              accentColor: "#cffafe",
              animationDuration: 30,
              bandCount: 8,
              baseColor: "#0c4a6e",
              chevronDepth: 5,
              dotDensity: 12,
              driftSpeed: 0.2,
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              layerOffset: 0.3,
              lineColor: "#7dd3fc",
              lineOpacity: 0.45,
              lineThickness: 1.5,
              nestingDepth: 4,
              patternType: "diamondCross",
              rotationSpeed: 15,
              scalePulse: 0.05,
              tileSize: 80,
            } satisfies GeometricTessellationBackgroundProps
          }
        />
        <Composition
          component={GridDotPatternBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="GridDotPatternBackground"
          schema={GridDotPatternBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              animationSpeed: 1,
              dotSize: 2,
              easing: [0.45, 0, 0.55, 1],
              opacity: 0.4,
              parallaxDepth: true,
              patternDensity: 40,
              theme: "dark",
              vignetteStrength: 0.25,
            } satisfies GridDotPatternBackgroundProps
          }
        />
        <Composition
          component={GridLinePatternBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="GridLinePatternBackground"
          schema={GridLinePatternBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              animationSpeed: 1,
              easing: [0.45, 0, 0.55, 1],
              lineWidth: 1,
              opacity: 0.3,
              patternDensity: 50,
              theme: "dark",
              vignetteStrength: 0.25,
            } satisfies GridLinePatternBackgroundProps
          }
        />
        <Composition
          component={HaloVignetteBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="HaloVignetteBackground"
          schema={HaloVignetteBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              baseColor: "#0a0212",
              blobCount: 2,
              blobOpacity: 0.7,
              blobSize: 1.8,
              blurAmount: 200,
              breatheAmount: 0.15,
              colors: ["#c026d3", "#7c3aed"],
              driftAmount: 0.06,
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.5,
            } satisfies HaloVignetteBackgroundProps
          }
        />
        <Composition
          component={HexagonPatternBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="HexagonPatternBackground"
          schema={HexagonPatternBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              animationSpeed: 1,
              easing: [0.45, 0, 0.55, 1],
              opacity: 0.35,
              patternDensity: 60,
              rotationSpeed: 10,
              scaleBreathe: true,
              theme: "dark",
              vignetteStrength: 0.25,
            } satisfies HexagonPatternBackgroundProps
          }
        />
        <Composition
          component={LightGradientBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="LightGradientBackground"
          schema={LightGradientBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              baseColor: "#f8fafc",
              blobCount: 3,
              blobOpacity: 0.6,
              blobSize: 1.4,
              blurAmount: 160,
              colors: ["#f1f5f9", "#e2e8f0", "#cbd5e1"],
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.03,
              vignetteStrength: 0.15,
            } satisfies LightGradientBackgroundProps
          }
        />
        <Composition
          component={MonochromeDriftBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="MonochromeDriftBackground"
          schema={MonochromeDriftBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              baseColor: "#1a1a1a",
              blobOpacity: 0.2,
              blobSize: 1.8,
              blurAmount: 200,
              colors: ["#e0e0e0", "#b0b0b0"],
              easing: [0.25, 0.1, 0.25, 1],
              grainAmount: 0.3,
              grainOpacity: 0.02,
              vignetteStrength: 0.25,
            } satisfies MonochromeDriftBackgroundProps
          }
        />
        <Composition
          component={MorphingMeshBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="MorphingMeshBackground"
          schema={MorphingMeshBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 20,
              baseColor: "#0a0a1a",
              blobCount: 5,
              blobOpacity: 0.5,
              blobSize: 1.2,
              blobStagger: 0.8,
              blurAmount: 120,
              colors: ["#6366f1", "#8b5cf6", "#d946ef", "#06b6d4", "#f472b6"],
              driftAmount: 0.6,
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              morphStiffness: 1.0,
              vignetteStrength: 0.3,
            } satisfies MorphingMeshBackgroundProps
          }
        />
        <Composition
          component={NeonPulseBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="NeonPulseBackground"
          schema={NeonPulseBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 12,
              baseColor: "#050505",
              blobCount: 4,
              blobOpacity: 0.7,
              blobSize: 1.0,
              blurAmount: 100,
              colors: ["#f472b6", "#a78bfa", "#60a5fa", "#2dd4bf", "#fbbf24"],
              easing: [0.4, 0, 0.6, 1],
              grainAmount: 0.3,
              grainOpacity: 0.03,
              pulseIntensity: 0.6,
              vignetteStrength: 0.25,
            } satisfies NeonPulseBackgroundProps
          }
        />
        <Composition
          component={NodeScatterBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="NodeScatterBackground"
          schema={NodeScatterBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              baseColor: "#06060a",
              connectionOpacity: 0.25,
              connectionThreshold: 100,
              driftSpeed: 0.4,
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              lineColor: "#475569",
              lineWidth: 0.5,
              nodeColor: "#e2e8f0",
              nodeCount: 80,
              nodeSize: 2.5,
              pulseIntensity: 0.3,
              scatterSeed: 42,
              vignetteStrength: 0.35,
            } satisfies NodeScatterBackgroundProps
          }
        />
        <Composition
          component={PaperTextureBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="PaperTextureBackground"
          schema={PaperTextureBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              baseColor: "#f5f0e8",
              easing: [0.45, 0, 0.55, 1],
              edgeBleedColor: "#c4b49a",
              edgeBleedStrength: 0.25,
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.15,
            } satisfies PaperTextureBackgroundProps
          }
        />
        <Composition
          component={PlexusNetworkBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="PlexusNetworkBackground"
          schema={PlexusNetworkBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 25,
              baseColor: "#050505",
              connectionDistance: 120,
              connectionOpacity: 0.3,
              driftAmount: 0.03,
              easing: [0.45, 0, 0.55, 1],
              emergentShapes: true,
              grainAmount: 0.3,
              grainOpacity: 0.04,
              gridDensity: 16,
              lineColor: "#64748b",
              lineWidth: 0.5,
              nodeColor: "#ffffff",
              nodeSize: 2,
              pulseIntensity: 0.5,
              shapeOpacity: 0.4,
              vignetteStrength: 0.3,
            } satisfies PlexusNetworkBackgroundProps
          }
        />
        <Composition
          component={RadialSpotlightBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="RadialSpotlightBackground"
          schema={RadialSpotlightBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 18,
              baseColor: "#0a1a0e",
              blurAmount: 120,
              breatheAmount: 0.15,
              driftAmount: 0.08,
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              spotlightColor: "#1cc23a",
              spotlightOpacity: 0.7,
              spotlightSize: 1.3,
              spotlightX: 0.5,
              spotlightY: 0.5,
              vignetteStrength: 0.45,
            } satisfies RadialSpotlightBackgroundProps
          }
        />
        <Composition
          component={StarfieldBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="StarfieldBackground"
          schema={StarfieldBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              baseColor: "#020408",
              easing: [0.45, 0, 0.55, 1],
              nebulaColor: "#1e3a8a",
              nebulaOpacity: 0.15,
              starColor: "#ffffff",
              starCount: 120,
              starOpacity: 0.8,
              vignetteStrength: 0.35,
            } satisfies StarfieldBackgroundProps
          }
        />
        <Composition
          component={SunsetOrbitBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="SunsetOrbitBackground"
          schema={SunsetOrbitBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 25,
              baseColor: "#1a0505",
              blobCount: 3,
              blobOpacity: 0.4,
              blobSize: 1.5,
              blurAmount: 150,
              colors: ["#dc2626", "#ea580c", "#f97316", "#fbbf24"],
              easing: [0.37, 0, 0.63, 1],
              grainAmount: 0.3,
              grainOpacity: 0.03,
              vignetteStrength: 0.35,
            } satisfies SunsetOrbitBackgroundProps
          }
        />
        <Composition
          component={SweepArcBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="SweepArcBackground"
          schema={SweepArcBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 16,
              arcColor: "#06b6d4",
              arcOpacity: 0.75,
              arcPosition: 1.25,
              arcWidth: 1.4,
              baseColor: "#020617",
              blurAmount: 160,
              breatheAmount: 0.12,
              driftAmount: 0.04,
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.03,
              vignetteStrength: 0.35,
            } satisfies SweepArcBackgroundProps
          }
        />
        <Composition
          component={WarmDriftBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="WarmDriftBackground"
          schema={WarmDriftBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              baseColor: "#1a0a04",
              blobCount: 2,
              blobOpacity: 0.55,
              blobSize: 2.0,
              blurAmount: 180,
              colors: ["#d97706", "#b45309", "#92400e"],
              driftAmount: 0.5,
              driftComplexity: 1.2,
              easing: [0.45, 0, 0.55, 1],
              grainAmount: 0.3,
              grainOpacity: 0.04,
              vignetteStrength: 0.3,
            } satisfies WarmDriftBackgroundProps
          }
        />
        <Composition
          component={WaveCurveBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="WaveCurveBackground"
          schema={WaveCurveBackgroundSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 18,
              baseColor: "#0a0212",
              easing: [0.45, 0, 0.55, 1],
              flowSpeed: 1,
              grainAmount: 0.3,
              grainOpacity: 0.04,
              reflectedWave: false,
              vignetteStrength: 0.3,
              waveAccentColor: "#f0abfc",
              waveAmplitude: 0.18,
              waveBlur: 30,
              waveColor: "#c026d3",
              waveFrequency: 1.2,
              waveOffsetY: 0.6,
              waveOpacity: 1,
            } satisfies WaveCurveBackgroundProps
          }
        />
        <Composition
          component={WaveDotPatternBackgroundComposition}
          durationInFrames={20 * FPS}
          fps={FPS}
          height={720}
          id="WaveDotPatternBackground"
          schema={WaveDotPatternBackgroundSchema}
          width={1280}
          defaultProps={
            {
              amplitude: 20,
              animationDuration: 20,
              animationSpeed: 1,
              dotSize: 2.5,
              easing: [0.45, 0, 0.55, 1],
              frequency: 0.3,
              opacity: 0.4,
              patternDensity: 40,
              theme: "dark",
              vignetteStrength: 0.25,
              waveDirection: "horizontal",
            } satisfies WaveDotPatternBackgroundProps
          }
        />
      </Folder>
      <Folder name="titles">
        <Composition
          component={BoldRightTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="BoldRightTitle"
          schema={BoldRightTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "right",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [72, 96],
              fontWeight: 700,
              gap: 12,
              holdDuration: 30,
              letterSpacing: 0.02,
              lines: ["BOLD IDEAS", "MATTER"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies BoldRightTitleProps
          }
        />
        <Composition
          component={CardFillTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="CardFillTitle"
          schema={CardFillTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              cardColor: "#ffffff",
              cardPadding: 48,
              cardWidth: 700,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              lines: ["CARD FILL"],
              subtitle: "Premium Collection",
            } satisfies CardFillTitleProps
          }
        />
        <Composition
          component={ControllersUnderlineTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="ControllersUnderlineTitle"
          schema={ControllersUnderlineTitleSchema}
          width={1280}
          defaultProps={
            {
              accentColor: "#dc2626",
              accentThickness: 3,
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              lines: ["CONTROLLERS"],
              subtitle: "Premium Gaming Gear",
            } satisfies ControllersUnderlineTitleProps
          }
        />
        <Composition
          component={DoubleFrameTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="DoubleFrameTitle"
          schema={DoubleFrameTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              borderThickness: 2,
              boxPadding: 48,
              boxWidth: 600,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              lines: ["DOUBLE FRAME"],
              subtitle: "PREMIUM",
            } satisfies DoubleFrameTitleProps
          }
        />
        <Composition
          component={ExclusiveLabelTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="ExclusiveLabelTitle"
          schema={ExclusiveLabelTitleSchema}
          width={1280}
          defaultProps={
            {
              accentColor: "#dc2626",
              accentThickness: 2,
              accentWidth: 120,
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              label: "EXCLUSIVE",
              lines: ["DYNAMIC TITLES"],
            } satisfies ExclusiveLabelTitleProps
          }
        />
        <Composition
          component={GiantInitialTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="GiantInitialTitle"
          schema={GiantInitialTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              initial: "G",
              initialColor: "#dc2626",
              initialFontSize: 180,
              lines: ["GIANT INITIAL"],
            } satisfies GiantInitialTitleProps
          }
        />
        <Composition
          component={GeometricMaskTitleComposition}
          durationInFrames={3 * FPS}
          fps={FPS}
          height={720}
          id="GeometricMaskTitle"
          schema={GeometricMaskTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 120,
              holdDuration: 30,
              maskColor: "#6b7280",
              maskWidth: 40,
              startFrame: 0,
              text: "SELECT",
              textColor: "#ffffff",
            } satisfies GeometricMaskTitleProps
          }
        />
        <Composition
          component={GradientTrailTitleComposition}
          durationInFrames={3 * FPS}
          fps={FPS}
          height={720}
          id="GradientTrailTitle"
          schema={GradientTrailTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: [64, 96],
              gap: 8,
              holdDuration: 30,
              lines: ["BRING", "CHANGES"],
              startFrame: 0,
              textColor: "#ffffff",
              trailColor: "#ec4899",
              trailLength: 3,
            } satisfies GradientTrailTitleProps
          }
        />
        <Composition
          component={GlitchStrokeTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="GlitchStrokeTitle"
          schema={GlitchStrokeTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "center",
              animationDuration: 45,
              chromaticAberration: true,
              chromaticOffset: 24,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: 96,
              fontWeight: 700,
              gap: 12,
              glitchDecay: 0.4,
              glitchIntensity: 1,
              holdDuration: 30,
              letterSpacing: 0.02,
              lines: ["THE PAST IS", "NEVER DEAD"],
              staggerDelay: 12,
              startFrame: 0,
              strokeColor: "#000000",
              strokeWidth: 2,
            } satisfies GlitchStrokeTitleProps
          }
        />
        <Composition
          component={HeroSubtitleTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="HeroSubtitleTitle"
          schema={HeroSubtitleTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "center",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [96, 36],
              fontWeight: [700, 400],
              gap: 12,
              holdDuration: 30,
              letterSpacing: [0.02, 0.1],
              lines: ["DYNAMIC", "Titles Kit"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies HeroSubtitleTitleProps
          }
        />
        <Composition
          component={HeavyStackTitleComposition}
          durationInFrames={3 * FPS}
          fps={FPS}
          height={720}
          id="HeavyStackTitle"
          schema={HeavyStackTitleSchema}
          width={1280}
          defaultProps={
            {
              accentColor: "#f59e0b",
              animationDuration: 50,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontSize: [120, 72, 36],
              gap: 12,
              holdDuration: 30,
              lines: ["THE", "TITLE IS HEAVY", "FOLLOW THE TYPE"],
              startFrame: 0,
              textColor: "#ffffff",
            } satisfies HeavyStackTitleProps
          }
        />
        <Composition
          component={HighlightBarTitleComposition}
          durationInFrames={3 * FPS}
          fps={FPS}
          height={720}
          id="HighlightBarTitle"
          schema={HighlightBarTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 50,
              barColor: "#ec4899",
              barHeight: 60,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontSize: 96,
              holdDuration: 30,
              startFrame: 0,
              subtitle: "The Brand New Title Animation Pack",
              text: "HELLO NEW TYPE",
              textColor: "#ffffff",
            } satisfies HighlightBarTitleProps
          }
        />
        <Composition
          component={LabelStackTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="LabelStackTitle"
          schema={LabelStackTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "left",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [36, 96],
              fontWeight: [400, 700],
              gap: 8,
              holdDuration: 30,
              letterSpacing: [0.15, 0.02],
              lines: ["TITLES KIT", "DYNAMIC"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies LabelStackTitleProps
          }
        />
        <Composition
          component={LetterSpacingRevealTitleComposition}
          durationInFrames={3 * FPS}
          fps={FPS}
          height={720}
          id="LetterSpacingRevealTitle"
          schema={LetterSpacingRevealTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 50,
              divider: "/",
              dividerColor: "#6b7280",
              easing: [0.22, 1, 0.36, 1],
              endLetterSpacing: 0.25,
              exitDuration: 25,
              fontSize: 96,
              holdDuration: 30,
              startFrame: 0,
              startLetterSpacing: -0.5,
              text: "TYPOGRAPHY",
              textColor: "#ffffff",
            } satisfies LetterSpacingRevealTitleProps
          }
        />
        <Composition
          component={MinimalDuoTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="MinimalDuoTitle"
          schema={MinimalDuoTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "left",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [28, 96],
              fontWeight: [400, 700],
              gap: 8,
              holdDuration: 30,
              letterSpacing: [0.15, 0.02],
              lines: ["MINIMAL", "TITLES"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies MinimalDuoTitleProps
          }
        />
        <Composition
          component={MinimalStyleTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="MinimalStyleTitle"
          schema={MinimalStyleTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "left",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [28, 96, 28],
              fontWeight: [400, 700, 400],
              gap: 8,
              holdDuration: 30,
              letterSpacing: [0.15, 0.02, 0.15],
              lines: ["MINIMAL", "STYLE", "CONCEPT"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies MinimalStyleTitleProps
          }
        />
        <Composition
          component={MixedEmphasisTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="MixedEmphasisTitle"
          schema={MixedEmphasisTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "center",
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              gap: 12,
              holdDuration: 30,
              lineGap: 24,
              staggerDelay: 8,
              startFrame: 0,
              segments: [
                { fontSize: 96, text: "KNOWLEDGE" },
                {
                  color: "#a0a0a0",
                  fontSize: 72,
                  fontStyle: "italic",
                  text: "IS",
                },
                { fontSize: 96, text: "POWER" },
              ],
            } satisfies MixedEmphasisTitleProps
          }
        />
        <Composition
          component={ModernRightTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="ModernRightTitle"
          schema={ModernRightTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "right",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [96, 48],
              fontWeight: [700, 400],
              gap: 12,
              holdDuration: 30,
              letterSpacing: [0.02, 0.08],
              lines: ["MODERN", "TEXT REVEAL"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies ModernRightTitleProps
          }
        />
        <Composition
          component={NumberFrameTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="NumberFrameTitle"
          schema={NumberFrameTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              frameColor: "#dc2626",
              frameSize: 100,
              holdDuration: 30,
              lines: ["FRAME TITLE"],
              number: "01",
            } satisfies NumberFrameTitleProps
          }
        />
        <Composition
          component={OffsetFramesTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="OffsetFramesTitle"
          schema={OffsetFramesTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              frame1Color: "#dc2626",
              frame2Color: "#ffffff",
              frameHeight: 140,
              frameOffset: 16,
              frameWidth: 450,
              holdDuration: 30,
              lines: ["OFFSET FRAMES"],
              subtitle: "DYNAMIC LAYOUT",
            } satisfies OffsetFramesTitleProps
          }
        />
        <Composition
          component={OutlineBoxTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="OutlineBoxTitle"
          schema={OutlineBoxTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              boxBorderColor: "#dc2626",
              boxBorderThickness: 3,
              boxPadding: 48,
              boxWidth: 600,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              lines: ["OUTLINE BOX"],
              subtitle: "Premium Design",
            } satisfies OutlineBoxTitleProps
          }
        />
        <Composition
          component={OutlineFillTitleComposition}
          durationInFrames={3 * FPS}
          fps={FPS}
          height={720}
          id="OutlineFillTitle"
          schema={OutlineFillTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fillColor: "#f59e0b",
              fontSize: [96, 96],
              gap: 4,
              holdDuration: 30,
              lines: ["FRESH", "GAME"],
              outlineColor: "#f59e0b",
              startFrame: 0,
              strokeWidth: 2,
            } satisfies OutlineFillTitleProps
          }
        />
        <Composition
          component={OverlineUnderlineTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="OverlineUnderlineTitle"
          schema={OverlineUnderlineTitleSchema}
          width={1280}
          defaultProps={
            {
              accentColor: "#dc2626",
              accentThickness: 3,
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              lines: ["OVERLINE"],
              overline: "EST. 2024",
            } satisfies OverlineUnderlineTitleProps
          }
        />
        <Composition
          component={QuoteBlockTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="QuoteBlockTitle"
          schema={QuoteBlockTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "center",
              animationDuration: 60,
              attribution: "— W. EDWARDS",
              attributionColor: "#a0a0a0",
              attributionFontSize: 24,
              chromaticAberration: true,
              chromaticOffset: 18,
              color: "#ffffff",
              context: "WITHOUT DATA",
              contextColor: "#a0a0a0",
              contextFontSize: 28,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              gap: 16,
              holdDuration: 30,
              quote: "YOU'RE JUST ANOTHER PERSON WITH AN OPINION",
              quoteFontSize: 64,
              startFrame: 0,
            } satisfies QuoteBlockTitleProps
          }
        />
        <Composition
          component={SandwichLabelTitleComposition}
          durationInFrames={3 * FPS}
          fps={FPS}
          height={720}
          id="SandwichLabelTitle"
          schema={SandwichLabelTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 50,
              bottomText: "DESIGN",
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontSize: 120,
              gap: 4,
              holdDuration: 30,
              label: "JOIN THE TRENDY DESIGN CLUB",
              labelColor: "#2dd4bf",
              startFrame: 0,
              textColor: "#ffffff",
              topText: "TRENDY",
            } satisfies SandwichLabelTitleProps
          }
        />
        <Composition
          component={RoundedBoxTitleComposition}
          durationInFrames={3 * FPS}
          fps={FPS}
          height={720}
          id="RoundedBoxTitle"
          schema={RoundedBoxTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              borderRadius: 20,
              boxColor: "#ffffff",
              boxSize: 280,
              easing: [0.34, 1.56, 0.64, 1],
              exitDuration: 25,
              fontSize: 120,
              holdDuration: 30,
              startFrame: 0,
              subtitle: "NEW TYPE BOX",
              text: "TYPE",
              textColor: "#000000",
            } satisfies RoundedBoxTitleProps
          }
        />
        <Composition
          component={ShadowDepthTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="ShadowDepthTitle"
          schema={ShadowDepthTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "center",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: 96,
              fontWeight: 700,
              gap: 12,
              holdDuration: 30,
              letterSpacing: 0.02,
              lines: ["EVOLVE", "ADAPT", "MOVE", "FORWARD"],
              shadowColor: "#000000",
              shadowOffsetX: 4,
              shadowOffsetY: 4,
              shadowOpacity: 0.5,
              shadowStagger: 4,
              staggerDelay: 12,
              startFrame: 0,
            } satisfies ShadowDepthTitleProps
          }
        />
        <Composition
          component={SplitHighlightTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="SplitHighlightTitle"
          schema={SplitHighlightTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              boxColor: "#dc2626",
              boxHeight: 160,
              boxWidth: 100,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              lines: ["HIGHLIGHT"],
              subtitle: "FEATURED",
            } satisfies SplitHighlightTitleProps
          }
        />
        <Composition
          component={StackedCenterTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="StackedCenterTitle"
          schema={StackedCenterTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "center",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [72, 96, 72],
              fontWeight: 700,
              gap: 12,
              holdDuration: 30,
              letterSpacing: 0.02,
              lines: ["CREATIVE", "DESIGN", "STUDIO"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies StackedCenterTitleProps
          }
        />
        <Composition
          component={StackedRightTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="StackedRightTitle"
          schema={StackedRightTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "right",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [72, 96, 72],
              fontWeight: 700,
              gap: 12,
              holdDuration: 30,
              letterSpacing: 0.02,
              lines: ["CREATIVE", "TYPOGRAPHY", "PACK"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies StackedRightTitleProps
          }
        />
        <Composition
          component={StackedTrioCenterTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="StackedTrioCenterTitle"
          schema={StackedTrioCenterTitleSchema}
          width={1280}
          defaultProps={
            {
              align: "center",
              animationDuration: 45,
              color: "#ffffff",
              easing: [0.16, 1, 0.3, 1],
              entranceDirection: "up",
              exitDuration: 25,
              fontSize: [72, 96, 72],
              fontWeight: 700,
              gap: 12,
              holdDuration: 30,
              letterSpacing: 0.02,
              lines: ["DIGITAL", "MARKETING", "WEEK"],
              staggerDelay: 12,
              startFrame: 0,
            } satisfies StackedTrioCenterTitleProps
          }
        />
        <Composition
          component={StrikethroughBadgeTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="StrikethroughBadgeTitle"
          schema={StrikethroughBadgeTitleSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              badge: "NEW",
              badgeColor: "#dc2626",
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              lines: ["STRIKETHROUGH"],
            } satisfies StrikethroughBadgeTitleProps
          }
        />
        <Composition
          component={VerticalAccentTitleComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="VerticalAccentTitle"
          schema={VerticalAccentTitleSchema}
          width={1280}
          defaultProps={
            {
              accentColor: "#dc2626",
              accentHeight: 180,
              accentThickness: 3,
              animationDuration: 45,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              holdDuration: 30,
              lines: ["VERTICAL", "ACCENT"],
            } satisfies VerticalAccentTitleProps
          }
        />
      </Folder>
      <Folder name="texts">
        <Composition
          component={ScalePopTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="ScalePopText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              bounceDamping: 8,
              bounceMass: 0.6,
              bounceStiffness: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              holdDuration: 30,
              letterSpacing: 0.02,
              overshoot: 1.15,
              staggerDelay: 6,
              startFrame: 0,
              text: "BOUNCE",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies ScalePopTextProps
          }
        />
        <Composition
          component={GlitchRevealTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="GlitchRevealText"
          width={1280}
          defaultProps={
            {
              animationDuration: 50,
              chromaticOffset: 8,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              glitchColor1: "#00f0ff",
              glitchColor2: "#ff0080",
              holdDuration: 30,
              letterSpacing: 0.02,
              scrambleIntensity: 0.8,
              startFrame: 0,
              text: "TEXT PRESETS",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies GlitchRevealTextProps
          }
        />
        <Composition
          component={WaveTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="WaveText"
          width={1280}
          defaultProps={
            {
              amplitude: 40,
              animationDuration: 40,
              damping: 0.92,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              frequency: 0.3,
              holdDuration: 30,
              letterSpacing: 0.02,
              startFrame: 0,
              text: "WAVE MOTION",
              textColor: "#ffffff",
              textTransform: "uppercase",
              waveDirection: "left-to-right",
            } satisfies WaveTextProps
          }
        />
        <Composition
          component={TypewriterTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="TypewriterText"
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              blinkingCursor: true,
              cursorColor: "#ffffff",
              cursorWidth: 3,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 64,
              fontWeight: 400,
              holdDuration: 30,
              letterSpacing: 0.02,
              startFrame: 0,
              text: "Typewriter effect",
              textColor: "#ffffff",
              textTransform: "none",
            } satisfies TypewriterTextProps
          }
        />
        <Composition
          component={LetterSpacingRevealTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="LetterSpacingRevealText"
          width={1280}
          defaultProps={
            {
              animationDuration: 50,
              blurAmount: 8,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              holdDuration: 30,
              letterSpacing: 0.02,
              startFrame: 0,
              startLetterSpacing: 0.8,
              text: "CINEMATIC",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies LetterSpacingRevealTextProps
          }
        />
        <Composition
          component={WiggleTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="WiggleText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              holdDuration: 30,
              jitterIntensity: 12,
              jitterSpeed: 0.4,
              letterSpacing: 0.02,
              startFrame: 0,
              text: "WIGGLE POSITION",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies WiggleTextProps
          }
        />
        <Composition
          component={BlurRevealTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="BlurRevealText"
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              blurAmount: 12,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              holdDuration: 30,
              letterSpacing: 0.02,
              scaleStart: 0.85,
              staggerDelay: 3,
              startFrame: 0,
              text: "BLUR REVEAL",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies BlurRevealTextProps
          }
        />
        <Composition
          component={CascadeLetterTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="CascadeLetterText"
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              cascadeDirection: "down",
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              holdDuration: 30,
              letterSpacing: 0.02,
              rotation: 45,
              startFrame: 0,
              text: "CASCADE",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies CascadeLetterTextProps
          }
        />
        <Composition
          component={FocusShiftTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="FocusShiftText"
          width={1280}
          defaultProps={
            {
              animationDuration: 50,
              blurAmount: 16,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              holdDuration: 30,
              letterSpacing: 0.02,
              shiftX: 60,
              shiftY: 0,
              startFrame: 0,
              text: "FOCUS SHIFT",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies FocusShiftTextProps
          }
        />
        <Composition
          component={MixedWeightSlideTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="MixedWeightSlideText"
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeights: [400, 700],
              holdDuration: 30,
              letterSpacing: 0.02,
              slideDirection: "alternate",
              startFrame: 0,
              text: "MIXED WEIGHT",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies MixedWeightSlideTextProps
          }
        />
        <Composition
          component={StackedRepeatTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="StackedRepeatText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              holdDuration: 30,
              layerCount: 4,
              layerOffset: 4,
              layerOpacity: 0.15,
              letterSpacing: 0.02,
              startFrame: 0,
              text: "STACKED",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies StackedRepeatTextProps
          }
        />
        <Composition
          component={WordSwapTextComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="WordSwapText"
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 400,
              holdDuration: 30,
              letterSpacing: 0.02,
              startFrame: 0,
              swapInterval: 45,
              textColor: "#ffffff",
              textTransform: "uppercase",
              words: ["CREATE", "DESIGN", "BUILD"],
            } satisfies WordSwapTextProps
          }
        />
        <Composition
          component={ColorStackTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="ColorStackText"
          width={1280}
          defaultProps={
            {
              animationDuration: 45,
              durationInFrames: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 96,
              fontWeight: 700,
              holdDuration: 30,
              lineColors: ["#ef4444", "#ef4444", "#ffffff"],
              lineGap: 12,
              lines: ["TRUE", "POWER OF", "WORDS"],
              staggerDelay: 12,
              startFrame: 0,
              textTransform: "uppercase",
            } satisfies ColorStackTextProps
          }
        />
        <Composition
          component={InlineHighlightTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="InlineHighlightText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              durationInFrames: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 72,
              holdDuration: 30,
              segments: [{ color: "#ef4444", text: "e" }, { text: "Patmos" }],
              startFrame: 0,
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies InlineHighlightTextProps
          }
        />
        <Composition
          component={SequentialWordTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="SequentialWordText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              durationInFrames: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 72,
              holdDuration: 30,
              staggerDelay: 10,
              startFrame: 0,
              text: "THANK YOU FOR WATCHING",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies SequentialWordTextProps
          }
        />
        <Composition
          component={SimpleFadeTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="SimpleFadeText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              durationInFrames: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 72,
              holdDuration: 30,
              slideY: 20,
              startFrame: 0,
              text: "INSPIRED BY CURIOSITY",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies SimpleFadeTextProps
          }
        />
        <Composition
          component={SingleWordZoomTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="SingleWordZoomText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              durationInFrames: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 120,
              fontWeight: 700,
              holdDuration: 30,
              overshoot: 1.15,
              scaleStart: 0.3,
              startFrame: 0,
              text: "WORDS",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies SingleWordZoomTextProps
          }
        />
        <Composition
          component={StackedLineTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="StackedLineText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              durationInFrames: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 72,
              holdDuration: 30,
              lineGap: 16,
              lines: ["FULL SCREEN", "POWERFUL", "TYPOGRAPHY"],
              staggerDelay: 10,
              startFrame: 0,
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies StackedLineTextProps
          }
        />
        <Composition
          component={TypewriterGlitchTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="TypewriterGlitchText"
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              blinkingCursor: true,
              cursorColor: "#3b82f6",
              cursorWidth: 3,
              durationInFrames: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 72,
              glitchColor1: "#00f0ff",
              glitchColor2: "#ff0080",
              holdDuration: 20,
              scrambleIntensity: 0.8,
              startFrame: 0,
              text: "TYPEWRITER GLITCH",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies TypewriterGlitchTextProps
          }
        />
        <Composition
          component={WordSlideTextComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="WordSlideText"
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              durationInFrames: 120,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 25,
              fontSize: 72,
              holdDuration: 30,
              slideDistance: 80,
              staggerDelay: 8,
              startFrame: 0,
              text: "WORDS APPEAR AT THE RIGHT TIME",
              textColor: "#ffffff",
              textTransform: "uppercase",
            } satisfies WordSlideTextProps
          }
        />
      </Folder>
      <Folder name="list-points">
        <Composition
          component={PillTagListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="PillTagList"
          schema={PillTagListSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              borderColor: "#ffffff",
              dimOpacity: 0.35,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              focusDuration: 45,
              fontFamily: "Anton",
              fontSize: 32,
              fontWeight: 400,
              highlightBgColor: "#ffffff",
              highlightTextColor: "#000000",
              holdDuration: 30,
              itemGap: 12,
              pillPaddingX: 28,
              pillPaddingY: 12,
              pillRadius: 32,
              startFrame: 0,
              textColor: "#ffffff",
              textTransform: "none",
              items: [
                "Marketing",
                "Data Analyses",
                "Design",
                "Financial Aid",
                "Internet Sale",
              ],
            } satisfies PillTagListProps
          }
        />
        <Composition
          component={BulletFocusListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="BulletFocusList"
          schema={BulletFocusListSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              bulletColor: "#ffffff",
              bulletLength: 20,
              bulletThickness: 2,
              dimOpacity: 0.25,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              focusDuration: 40,
              fontFamily: "Anton",
              fontSize: 28,
              fontWeight: 400,
              holdDuration: 30,
              itemGap: 16,
              startFrame: 0,
              textColor: "#ffffff",
              textTransform: "none",
              items: [
                "Urban Jungle Café",
                "Digital Nomad Studio",
                "Pop-Up Experience Store",
                "Mindful Movement Hub",
                "Smart Home Solutions",
                "Zero-Waste Grocery",
                "Interactive Art Gallery",
                "Virtual Fashion Closet",
                "Eco-Friendly Packaging Lab",
              ],
            } satisfies BulletFocusListProps
          }
        />
        <Composition
          component={FocusStackListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="FocusStackList"
          schema={FocusStackListSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              dimOpacity: 0.2,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              focusDuration: 50,
              fontFamily: "Anton",
              fontSize: 48,
              fontWeight: 400,
              holdDuration: 30,
              itemGap: 8,
              scaleStep: 0.15,
              startFrame: 0,
              textColor: "#ffffff",
              textTransform: "none",
              items: [
                "Designer",
                "Developer",
                "Analyser",
                "Engineer",
                "Animator",
              ],
            } satisfies FocusStackListProps
          }
        />
        <Composition
          component={BigTextStackComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="BigTextStack"
          schema={BigTextStackSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              driftSpeed: 0.3,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 96,
              fontWeight: 700,
              holdDuration: 30,
              itemGap: 0,
              lineHeight: 1,
              scrollSpeed: 40,
              startFrame: 0,
              textColor: "#ffffff",
              textTransform: "uppercase",
              items: [
                "SELÇUK ONUR",
                "AHMAD OMAR",
                "ARON WILLIAM",
                "MOYSES NOBEL",
                "NICOLAS SMITH",
                "MERLIN TOPALES",
                "STIVEN BILL",
              ],
            } satisfies BigTextStackProps
          }
        />
        <Composition
          component={CylinderRolodexListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="CylinderRolodexList"
          schema={CylinderRolodexListSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              dimOpacity: 0.15,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 48,
              fontWeight: 400,
              holdDuration: 30,
              itemGap: 60,
              perspective: 800,
              rotationSpeed: 30,
              startFrame: 0,
              textColor: "#ffffff",
              textTransform: "none",
              visibleCount: 5,
              items: [
                "Tbilisi, Georgia",
                "Madrid, Spain",
                "Berlin, Germany",
                "Beijing, China",
                "Mexico, Mexico",
                "Warsaw, Poland",
                "London, UK",
                "Lisbon, Portugal",
              ],
            } satisfies CylinderRolodexListProps
          }
        />
        <Composition
          component={StickyNoteScatterComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="StickyNoteScatter"
          schema={StickyNoteScatterSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 24,
              fontWeight: 400,
              holdDuration: 30,
              itemGap: 20,
              maxRotation: 15,
              noteColor: "#fbbf24",
              noteHeight: 80,
              notePadding: 16,
              noteWidth: 200,
              scatterSeed: 42,
              startFrame: 0,
              textColor: "#000000",
              textTransform: "uppercase",
              items: [
                "MALDIVES",
                "DOHA",
                "MADRID",
                "BARCELONA",
                "DUBAI",
                "SI PETERSBURG",
              ],
            } satisfies StickyNoteScatterProps
          }
        />
        <Composition
          component={KineticTextMorphComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="KineticTextMorph"
          schema={KineticTextMorphSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 40,
              dimOpacity: 0.15,
              easing: [0.22, 1, 0.36, 1],
              exitDuration: 25,
              fontFamily: "Anton",
              fontSize: 72,
              fontWeight: 400,
              gradientColors: ["#f472b6", "#a78bfa", "#06b6d4"],
              holdDuration: 30,
              itemGap: 8,
              items: ["Impactful", "Dynamic", "Original", "Creative", "Bold"],
              morphBlur: 8,
              morphDuration: 30,
              prefixText: "You are",
              prefixTextColor: "#ffffff",
              startFrame: 0,
              textColor: "#ffffff",
              textTransform: "none",
            } satisfies KineticTextMorphProps
          }
        />
        <Composition
          component={StarPointListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="StarPointList"
          width={1280}
          defaultProps={
            {
              accentColor: "#86efac",
              activeIndex: 0,
              backgroundColor: "#000000",
              easing: [0.16, 1, 0.3, 1],
              enterDuration: 30,
              exitDuration: 20,
              holdDuration: 45,
              staggerDelay: 10,
              starColor: "#e0f2fe",
              starSize: 32,
              title: "Introducing Numbered List Animator Pro",
              titleColor: "#7dd3fc",
              items: [
                "Chapter 1 - REPLACE",
                "Chapter 2 - CHOOSE",
                "Chapter 3 - RENDER",
              ],
            } satisfies StarPointListProps
          }
        />
        <Composition
          component={PillBarListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="PillBarList"
          width={1280}
          defaultProps={
            {
              borderRadius: 60,
              direction: "up",
              easing: [0.34, 1.56, 0.64, 1],
              enterDuration: 25,
              exitDuration: 20,
              holdDuration: 40,
              pillBorderColor: "#fbbf24",
              pillColor: "#c2410c",
              staggerDelay: 12,
              textColor: "#ffffff",
              items: [
                "YOUR LISTS ARE BORING",
                "It's time to change that.",
                "Say hello to Numbered List",
                "your secret weapon",
              ],
            } satisfies PillBarListProps
          }
        />
        <Composition
          component={FocusHighlightListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="FocusHighlightList"
          width={1280}
          defaultProps={
            {
              activeIndex: 2,
              dimColor: "#475569",
              dimOpacity: 0.25,
              direction: "vertical",
              easing: [0.16, 1, 0.3, 1],
              enterDuration: 30,
              exitDuration: 20,
              highlightColor: "#3b82f6",
              holdDuration: 45,
              label: "Ad Script",
              labelColor: "#ffffff",
              staggerDelay: 8,
              items: [
                "Boring Lists?",
                "Numbered List Animator Pro!",
                "1-Click Colors",
                "ZERO Skills Needed",
                "Make Lists People",
                "Actually WATCH",
                "Get it now!",
              ],
            } satisfies FocusHighlightListProps
          }
        />
        <Composition
          component={GradientCarouselListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="GradientCarouselList"
          width={1280}
          defaultProps={
            {
              direction: "left",
              easing: [0.16, 1, 0.3, 1],
              enterDuration: 30,
              exitDuration: 20,
              gradientColors: ["#a855f7", "#6366f1"],
              holdDuration: 45,
              label: "YOUR NEW CONTENT",
              labelColor: "#ffffff",
              scrollSpeed: 1,
              items: [
                "Instant Animated Lists",
                "Global Color Control",
                "Built for Loops",
                "15-Second Setup",
              ],
            } satisfies GradientCarouselListProps
          }
        />
        <Composition
          component={GoldGradientStackListComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="GoldGradientStackList"
          width={1280}
          defaultProps={
            {
              dimOpacity: 0.15,
              easing: [0.16, 1, 0.3, 1],
              enterDuration: 30,
              exitDuration: 20,
              focusIndex: 1,
              fontSize: 96,
              gradientColors: ["#fef08a", "#ca8a04"],
              holdDuration: 45,
              items: ["ANIMATOR", "TEMPLATE", "CHOOSE", "RENDER"],
              shiftOffset: 120,
            } satisfies GoldGradientStackListProps
          }
        />
      </Folder>
      <Folder name="data-visualizations">
        <Composition
          component={AnimatedLineChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="AnimatedLineChart"
          schema={AnimatedLineChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              dotLabels: true,
              dotStagger: 3,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              lineColor: "#3b82f6",
              showCard: true,
              suffix: "",
              title: "Revenue Trend",
              titleColor: "#ffffff",
              totalLabel: "Total Revenue",
              totalPrefix: "$",
              data: [
                { label: "Jan", value: 12000 },
                { label: "Feb", value: 19000 },
                { label: "Mar", value: 15000 },
                { label: "Apr", value: 22000 },
                { label: "May", value: 28000 },
                { label: "Jun", value: 24000 },
              ],
            } satisfies AnimatedLineChartProps
          }
        />
        <Composition
          component={AreaChartGlowComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="AreaChartGlow"
          schema={AreaChartGlowSchema}
          width={1280}
          defaultProps={
            {
              accentLabel: "Total expenditure for 10 years",
              animationDuration: 90,
              areaColor: "#3b82f6",
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              glowColor: "#3b82f6",
              showCard: true,
              suffix: "",
              title: "Expenditure Overview",
              titleColor: "#ffffff",
              totalPrefix: "$",
              verticalLineColor: "#2a2a3a",
              data: [
                { label: "2014", value: 45000 },
                { label: "2015", value: 52000 },
                { label: "2016", value: 48000 },
                { label: "2017", value: 61000 },
                { label: "2018", value: 58000 },
                { label: "2019", value: 72000 },
                { label: "2020", value: 69000 },
                { label: "2021", value: 85000 },
                { label: "2022", value: 92000 },
                { label: "2023", value: 88000 },
              ],
            } satisfies AreaChartGlowProps
          }
        />
        <Composition
          component={CandlestickChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="CandlestickChart"
          schema={CandlestickChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              negativeColor: "#ef4444",
              positiveColor: "#22c55e",
              showCard: true,
              showLabels: true,
              title: "BITCOIN",
              titleColor: "#ffffff",
              data: [
                { label: "Mon", secondaryValue: 42, value: 45 },
                { label: "Tue", secondaryValue: 45, value: 48 },
                { label: "Wed", secondaryValue: 48, value: 44 },
                { label: "Thu", secondaryValue: 44, value: 50 },
                { label: "Fri", secondaryValue: 50, value: 47 },
                { label: "Sat", secondaryValue: 47, value: 52 },
                { label: "Sun", secondaryValue: 52, value: 49 },
              ],
            } satisfies CandlestickChartProps
          }
        />
        <Composition
          component={DataTableCardComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="DataTableCard"
          schema={DataTableCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              badgeColor: "#22c55e",
              badgeText: "Live",
              cardBorderRadius: 16,
              cardPadding: 24,
              enterEasing: [0.16, 1, 0.3, 1],
              exitDuration: 20,
              headerColor: "#2a2a3a",
              holdDuration: 60,
              metricLabel: "Total Market Cap",
              metricPrefix: "$",
              metricSuffix: "B",
              metricValue: 2450,
              rowGap: 8,
              showHeader: true,
              showIndex: true,
              staggerDelay: 5,
              subtitle: "Real-time cryptocurrency market data",
              theme: "dark",
              title: "Market Analytics",
              columns: [
                { align: "left", key: "name", label: "Asset", width: "120px" },
                {
                  align: "right",
                  key: "price",
                  label: "Price",
                  width: "100px",
                },
                {
                  align: "right",
                  key: "change",
                  label: "24h %",
                  width: "80px",
                },
                {
                  align: "right",
                  key: "volume",
                  label: "Volume",
                  width: "120px",
                },
              ],
              data: [
                {
                  change: 5.2,
                  name: "Bitcoin",
                  price: 64230,
                  volume: 28400000000,
                },
                {
                  change: -2.1,
                  name: "Ethereum",
                  price: 3450,
                  volume: 15200000000,
                },
                { change: 8.7, name: "Solana", price: 142, volume: 3200000000 },
                {
                  change: -0.5,
                  name: "Cardano",
                  price: 0.45,
                  volume: 450000000,
                },
                {
                  change: 12.3,
                  name: "Polkadot",
                  price: 7.2,
                  volume: 890000000,
                },
              ],
            } satisfies DataTableCardProps
          }
        />
        <Composition
          component={DivergingBarChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="DivergingBarChart"
          schema={DivergingBarChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              backgroundColor: "#0a0a14",
              barWidth: 24,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 30,
              gridColor: "#2a2a3a",
              holdDuration: 60,
              labelColor: "#a0a0b0",
              negativeColor: "#ef4444",
              positiveColor: "#22c55e",
              showLabels: true,
              staggerDelay: 4,
              subtitle: "Performance comparison across categories",
              subtitleColor: "#a0a0b0",
              textColor: "#ffffff",
              title: "Net Performance",
              titleColor: "#ffffff",
              yMax: 100,
              data: [
                { label: "Product A", value: 85 },
                { label: "Product B", value: -45 },
                { label: "Product C", value: 62 },
                { label: "Product D", value: -30 },
                { label: "Product E", value: 78 },
                { label: "Product F", value: -55 },
              ],
            } satisfies DivergingBarChartProps
          }
        />
        <Composition
          component={DonutBreakdownCardComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="DonutBreakdownCard"
          schema={DonutBreakdownCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              badgeColor: "#f97316",
              badgeText: "Q3 2024",
              cardBorderRadius: 16,
              cardPadding: 24,
              centerSubtext: "Total Budget",
              centerText: "$2.4M",
              colors: ["#ec4899", "#fbbf24", "#8b5cf6", "#22c55e", "#f97316"],
              donutWidth: 16,
              enterEasing: [0.16, 1, 0.3, 1],
              exitDuration: 20,
              holdDuration: 60,
              metricLabel: "Allocated Budget",
              metricPrefix: "$",
              metricSuffix: "M",
              metricValue: 2.4,
              showLegend: true,
              size: 160,
              staggerDelay: 5,
              subtitle: "Budget allocation by department",
              theme: "dark",
              title: "Budget Breakdown",
              segments: [
                { color: "#ec4899", label: "Marketing", percentage: 35 },
                { color: "#fbbf24", label: "Engineering", percentage: 28 },
                { color: "#8b5cf6", label: "Design", percentage: 15 },
                { color: "#22c55e", label: "Operations", percentage: 12 },
                { color: "#f97316", label: "Sales", percentage: 10 },
              ],
            } satisfies DonutBreakdownCardProps
          }
        />
        <Composition
          component={DonutChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="DonutChart"
          schema={DonutChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              backgroundColor: "#0a0a14",
              badgeColor: "#3b82f6",
              badgeRadius: 4,
              donutRadius: 80,
              donutWidth: 20,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 30,
              holdDuration: 60,
              labelColor: "#a0a0b0",
              showPercentages: true,
              staggerDelay: 4,
              subtitle: "Traffic sources breakdown",
              subtitleColor: "#a0a0b0",
              textColor: "#ffffff",
              title: "Traffic Sources",
              titleColor: "#ffffff",
              data: [
                { color: "#ec4899", label: "Direct", value: 35 },
                { color: "#8b5cf6", label: "Social", value: 25 },
                { color: "#3b82f6", label: "Organic", value: 20 },
                { color: "#22c55e", label: "Referral", value: 15 },
                { color: "#fbbf24", label: "Email", value: 5 },
              ],
            } satisfies DonutChartProps
          }
        />
        <Composition
          component={DualGaugeChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="DualGaugeChart"
          schema={DualGaugeChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              title: "System Metrics",
              titleColor: "#ffffff",
              gauge1: {
                color: "#3b82f6",
                label: "CPU Usage",
                max: 100,
                value: 72,
              },
              gauge2: {
                color: "#22c55e",
                label: "Memory",
                max: 100,
                value: 58,
              },
            } satisfies DualGaugeChartProps
          }
        />
        <Composition
          component={GroupedBarChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="GroupedBarChart"
          schema={GroupedBarChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              backgroundColor: "#0a0a14",
              barWidth: 20,
              description: "Quarterly revenue by product line",
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 30,
              gridColor: "#2a2a3a",
              groupGap: 24,
              holdDuration: 60,
              labelColor: "#a0a0b0",
              legendStaggerDelay: 4,
              staggerDelay: 4,
              subtitle: "Revenue comparison",
              subtitleColor: "#a0a0b0",
              textColor: "#ffffff",
              title: "Total Sales",
              titleColor: "#ffffff",
              xLabels: ["Q1", "Q2", "Q3", "Q4"],
              yMax: 250,
              series: [
                {
                  color: "#3b82f6",
                  name: "Product A",
                  values: [120, 150, 180, 200],
                },
                {
                  color: "#ec4899",
                  name: "Product B",
                  values: [90, 110, 140, 160],
                },
                {
                  color: "#22c55e",
                  name: "Product C",
                  values: [60, 80, 100, 120],
                },
              ],
            } satisfies GroupedBarChartProps
          }
        />
        <Composition
          component={GroupedBarChartCardComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="GroupedBarChartCard"
          schema={GroupedBarChartCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              badgeColor: "#3b82f6",
              badgeText: "2024",
              barGap: 2,
              barWidth: 8,
              cardBorderRadius: 16,
              cardPadding: 24,
              colors: ["#8b5cf6", "#f97316", "#ec4899", "#fbbf24"],
              enterEasing: [0.16, 1, 0.3, 1],
              exitDuration: 20,
              gridLines: true,
              groupGap: 16,
              holdDuration: 60,
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              metricLabel: "Total Revenue",
              metricPrefix: "$",
              metricSuffix: "K",
              metricValue: 1250,
              seriesNames: ["Enterprise", "Pro", "Starter", "Free"],
              showLegend: true,
              staggerDelay: 5,
              subtitle: "Monthly revenue by plan tier",
              theme: "dark",
              title: "Revenue Breakdown",
              data: [
                { label: "Jan", values: [65, 45, 30, 20] },
                { label: "Feb", values: [70, 50, 35, 25] },
                { label: "Mar", values: [75, 55, 40, 30] },
                { label: "Apr", values: [80, 60, 45, 35] },
                { label: "May", values: [85, 65, 50, 40] },
                { label: "Jun", values: [90, 70, 55, 45] },
              ],
            } satisfies GroupedBarChartCardProps
          }
        />
        <Composition
          component={HorizontalBarChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="HorizontalBarChart"
          schema={HorizontalBarChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              showLegend: true,
              title: "Platform Usage",
              titleColor: "#ffffff",
              data: [
                {
                  color: "#3b82f6",
                  name: "2023",
                  data: [
                    { label: "Desktop", value: 65 },
                    { label: "Mobile", value: 45 },
                    { label: "Tablet", value: 30 },
                    { label: "Other", value: 15 },
                  ],
                },
                {
                  color: "#ec4899",
                  name: "2024",
                  data: [
                    { label: "Desktop", value: 55 },
                    { label: "Mobile", value: 55 },
                    { label: "Tablet", value: 25 },
                    { label: "Other", value: 20 },
                  ],
                },
              ],
            } satisfies HorizontalBarChartProps
          }
        />
        <Composition
          component={HorizontalBarChartCardComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="HorizontalBarChartCard"
          schema={HorizontalBarChartCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              badgeColor: "#8b5cf6",
              badgeText: "Annual",
              barHeight: 16,
              barRadius: 8,
              cardBorderRadius: 16,
              cardPadding: 24,
              enterEasing: [0.16, 1, 0.3, 1],
              exitDuration: 20,
              gridLines: false,
              holdDuration: 60,
              metricLabel: "Total Allocation",
              metricPrefix: "",
              metricSuffix: "%",
              metricValue: 248,
              showPercentages: true,
              showValues: true,
              staggerDelay: 5,
              subtitle: "Department budget allocation percentages",
              theme: "dark",
              title: "Budget Distribution",
              trackColor: "#333333",
              data: [
                {
                  color: "#ec4899",
                  label: "Infrastructure",
                  maxValue: 100,
                  value: 78,
                },
                {
                  color: "#f97316",
                  label: "Marketing",
                  maxValue: 100,
                  value: 62,
                },
                { color: "#fbbf24", label: "R&D", maxValue: 100, value: 45 },
                {
                  color: "#8b5cf6",
                  label: "Operations",
                  maxValue: 100,
                  value: 38,
                },
                {
                  color: "#22c55e",
                  label: "Support",
                  maxValue: 100,
                  value: 25,
                },
              ],
            } satisfies HorizontalBarChartCardProps
          }
        />
        <Composition
          component={PillBounceChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="PillBounceChart"
          schema={PillBounceChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              backgroundColor: "#0a0a14",
              ballColor: "#3b82f6",
              ballSize: 16,
              bounceDamping: 10,
              bounceMass: 0.8,
              bounceStiffness: 100,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 30,
              holdDuration: 60,
              labelColor: "#a0a0b0",
              pillColor: "#1e1e2e",
              pillHeight: 60,
              pillWidth: 200,
              staggerDelay: 8,
              subtitle: "Key performance indicators",
              subtitleColor: "#a0a0b0",
              textColor: "#ffffff",
              title: "KPI Overview",
              titleColor: "#ffffff",
              pills: [
                { color: "#3b82f6", label: "Users", number: "12K" },
                { color: "#ec4899", label: "Revenue", number: "$840K" },
                { color: "#22c55e", label: "Growth", number: "+24%" },
                { color: "#fbbf24", label: "Retention", number: "92%" },
              ],
            } satisfies PillBounceChartProps
          }
        />
        <Composition
          component={RadarChartCardComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="RadarChartCard"
          schema={RadarChartCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              badgeColor: "#ec4899",
              badgeText: "Analysis",
              cardBorderRadius: 16,
              cardPadding: 24,
              enterEasing: [0.16, 1, 0.3, 1],
              exitDuration: 20,
              fillOpacity: 0.2,
              gridLines: true,
              holdDuration: 60,
              lineWidth: 2,
              maxValue: 100,
              metricLabel: "Overall Score",
              metricSuffix: "/100",
              metricValue: 85,
              pointRadius: 4,
              size: 180,
              staggerDelay: 5,
              subtitle: "Performance metrics across all categories",
              theme: "dark",
              title: "System Performance",
              colors: [
                "#ec4899",
                "#8b5cf6",
                "#22c55e",
                "#fbbf24",
                "#f97316",
                "#06b6d4",
              ],
              data: [
                { color: "#ec4899", label: "Speed", value: 85 },
                { color: "#8b5cf6", label: "Reliability", value: 92 },
                { color: "#22c55e", label: "Scalability", value: 78 },
                { color: "#fbbf24", label: "Security", value: 88 },
                { color: "#f97316", label: "Usability", value: 95 },
                { color: "#06b6d4", label: "Cost", value: 72 },
              ],
            } satisfies RadarChartCardProps
          }
        />
        <Composition
          component={RadialRingChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="RadialRingChart"
          schema={RadialRingChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              backgroundColor: "#0a0a14",
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 30,
              holdDuration: 60,
              labelColor: "#a0a0b0",
              legendGap: 16,
              legendStaggerDelay: 4,
              maxValue: 100,
              ringGap: 12,
              showLegend: true,
              staggerDelay: 4,
              subtitle: "Project status overview",
              subtitleColor: "#a0a0b0",
              textColor: "#ffffff",
              title: "Task Completion",
              titleColor: "#ffffff",
              rings: [
                { color: "#3b82f6", label: "Completed", value: 78 },
                { color: "#ec4899", label: "In Progress", value: 45 },
                { color: "#22c55e", label: "Planned", value: 32 },
                { color: "#fbbf24", label: "Backlog", value: 15 },
              ],
            } satisfies RadialRingChartProps
          }
        />
        <Composition
          component={SalesReportCardComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="SalesReportCard"
          schema={SalesReportCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              areaColor: "#8b5cf6",
              areaOpacity: 0.3,
              badgeColor: "#22c55e",
              badgeText: "+12.5%",
              cardBorderRadius: 16,
              cardPadding: 24,
              enterEasing: [0.16, 1, 0.3, 1],
              exitDuration: 20,
              gridLines: true,
              holdDuration: 60,
              lineColor: "#8b5cf6",
              lineWidth: 2,
              metricLabel: "Total Sales",
              metricPrefix: "$",
              metricSuffix: "",
              metricValue: 820000,
              showDots: true,
              showGradient: true,
              staggerDelay: 5,
              subtitle: "Monthly revenue performance",
              theme: "dark",
              title: "Sales Report",
              data: [
                42000, 55000, 48000, 61000, 72000, 68000, 85000, 92000, 88000,
                95000, 102000, 98000,
              ],
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            } satisfies SalesReportCardProps
          }
        />
        <Composition
          component={SemiCircleGaugeCardComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="SemiCircleGaugeCard"
          schema={SemiCircleGaugeCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              badgeColor: "#3b82f6",
              badgeText: "Live",
              cardBorderRadius: 16,
              cardPadding: 24,
              centerLabel: "Completion Rate",
              colors: ["#8b5cf6", "#fbbf24", "#f97316"],
              enterEasing: [0.16, 1, 0.3, 1],
              exitDuration: 20,
              gaugeWidth: 12,
              holdDuration: 60,
              metricLabel: "Overall Progress",
              metricSuffix: "%",
              metricValue: 78,
              showLegend: true,
              staggerDelay: 5,
              subtitle: "Project milestone tracking",
              theme: "dark",
              title: "Project Status",
              segments: [
                { color: "#8b5cf6", label: "Completed", percentage: 55 },
                { color: "#fbbf24", label: "In Progress", percentage: 30 },
                { color: "#f97316", label: "Pending", percentage: 15 },
              ],
            } satisfies SemiCircleGaugeCardProps
          }
        />
        <Composition
          component={StackedBarChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="StackedBarChart"
          schema={StackedBarChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 60,
              backgroundColor: "#0a0a14",
              barColor: "#3b82f6",
              barWidth: 40,
              easing: [0.16, 1, 0.3, 1],
              exitDuration: 30,
              gridColor: "#2a2a3a",
              holdDuration: 60,
              labelColor: "#a0a0b0",
              secondaryColor: "#ec4899",
              showValues: true,
              staggerDelay: 4,
              subtitle: "Cashflow breakdown by month",
              subtitleColor: "#a0a0b0",
              textColor: "#ffffff",
              title: "Total Cashflow",
              titleColor: "#ffffff",
              valueColor: "#ffffff",
              yMax: 100,
              data: [
                { label: "Jan", secondaryValue: 20, value: 45 },
                { label: "Feb", secondaryValue: 25, value: 55 },
                { label: "Mar", secondaryValue: 30, value: 50 },
                { label: "Apr", secondaryValue: 22, value: 65 },
                { label: "May", secondaryValue: 35, value: 70 },
                { label: "Jun", secondaryValue: 28, value: 60 },
              ],
            } satisfies StackedBarChartProps
          }
        />
        <Composition
          component={StackedBarChartCardComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="StackedBarChartCard"
          schema={StackedBarChartCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 30,
              badgeColor: "#ec4899",
              badgeText: "YoY +18%",
              barGap: 8,
              barWidth: 24,
              cardBorderRadius: 16,
              cardPadding: 24,
              colors: ["#ec4899", "#f97316", "#8b5cf6"],
              enterEasing: [0.16, 1, 0.3, 1],
              exitDuration: 20,
              gridLines: true,
              holdDuration: 60,
              labels: ["Q1", "Q2", "Q3", "Q4"],
              metricLabel: "Total Revenue",
              metricPrefix: "$",
              metricSuffix: "K",
              metricValue: 495,
              seriesNames: ["Product A", "Product B", "Product C"],
              showLegend: true,
              staggerDelay: 5,
              subtitle: "Quarterly revenue by product line",
              theme: "dark",
              title: "Revenue Stack",
              data: [
                { label: "Q1", values: [45, 30, 25] },
                { label: "Q2", values: [55, 35, 28] },
                { label: "Q3", values: [50, 40, 32] },
                { label: "Q4", values: [65, 45, 35] },
              ],
            } satisfies StackedBarChartCardProps
          }
        />
        <Composition
          component={CircularRadialGaugeComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="CircularRadialGauge"
          schema={CircularRadialGaugeSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              gradientColors: ["#7c3aed", "#3b82f6"],
              max: 100,
              showCard: true,
              value: 62,
            } satisfies CircularRadialGaugeProps
          }
        />
        <Composition
          component={DonutChartSetComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="DonutChartSet"
          schema={DonutChartSetSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              charts: [
                { color: "#22c55e", label: "Income", max: 100, value: 42 },
                { color: "#3b82f6", label: "Expenses", max: 100, value: 67 },
                { color: "#f59e0b", label: "Profit", max: 100, value: 77 },
              ],
            } satisfies DonutChartSetProps
          }
        />
        <Composition
          component={NestedArcChartComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="NestedArcChart"
          schema={NestedArcChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#e8e8e8",
              cardBackgroundColor: "#f5f5f5",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              titleColor: "#333333",
              data: [
                { color: "#1e3a5f", label: "Graphic Design", value: 80 },
                { color: "#2d5a8a", label: "Organization", value: 63 },
                { color: "#3b82f6", label: "Copywriting", value: 74 },
              ],
            } satisfies NestedArcChartProps
          }
        />
        <Composition
          component={ActivityRingsComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="ActivityRings"
          schema={ActivityRingsSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              rings: [
                { color: "#ec4899", label: "Move", max: 600, value: 420 },
                { color: "#a3e635", label: "Exercise", max: 60, value: 35 },
                { color: "#06b6d4", label: "Stand", max: 12, value: 8 },
              ],
            } satisfies ActivityRingsProps
          }
        />
        <Composition
          component={ProgressBarCardComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="ProgressBarCard"
          schema={ProgressBarCardSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#e8e8e8",
              barColors: ["#ef4444", "#f97316", "#eab308", "#22c55e"],
              cardBackgroundColor: "#f0f0f0",
              cardBorderRadius: 12,
              cardPadding: 40,
              currentValue: 10000,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              maxValue: 10000,
              prefix: "$",
              showCard: true,
              suffix: "",
              title: "COMPANY CAPITAL",
              titleColor: "#888888",
            } satisfies ProgressBarCardProps
          }
        />
        <Composition
          component={LoadingProgressComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="LoadingProgress"
          schema={LoadingProgressSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              barColor: "#f87171",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 0,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              label: "Movie loading...",
              showCard: true,
              value: 78,
            } satisfies LoadingProgressProps
          }
        />
        <Composition
          component={SplitPercentageDisplayComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="SplitPercentageDisplay"
          schema={SplitPercentageDisplaySchema}
          width={1280}
          defaultProps={
            {
              accentColor: "#ef4444",
              animationDuration: 90,
              backgroundColor: "#ef4444",
              bottomColor: "#1f2937",
              cardBackgroundColor: "transparent",
              cardBorderRadius: 0,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              suffix: "%",
              value: 62,
            } satisfies SplitPercentageDisplayProps
          }
        />
        <Composition
          component={DemographicIconsComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="DemographicIcons"
          schema={DemographicIconsSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              groups: [
                { color: "#06b6d4", icon: "person", label: "MEN", value: 86 },
                { color: "#ec4899", icon: "woman", label: "WOMEN", value: 14 },
              ],
            } satisfies DemographicIconsProps
          }
        />
        <Composition
          component={PyramidChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="PyramidChart"
          schema={PyramidChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              data: [
                { color: "#4c1d95", label: "PHYSIOLOGICAL", value: 100 },
                { color: "#7c3aed", label: "SAFETY", value: 100 },
                { color: "#c026d3", label: "LOVE / BELONGING", value: 100 },
                { color: "#ec4899", label: "ESTEEM", value: 100 },
              ],
            } satisfies PyramidChartProps
          }
        />
        <Composition
          component={IconStatGridComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="IconStatGrid"
          schema={IconStatGridSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              title: "Account Statistic",
              titleColor: "#ffffff",
              items: [
                { color: "#ec4899", icon: "heart", label: "likes", value: 2 },
                {
                  color: "#8b5cf6",
                  icon: "user",
                  label: "followers",
                  value: 0,
                },
                {
                  color: "#3b82f6",
                  icon: "comment",
                  label: "comments",
                  value: 0,
                },
              ],
            } satisfies IconStatGridProps
          }
        />
        <Composition
          component={RadarChartComposition}
          durationInFrames={6 * FPS}
          fps={FPS}
          height={720}
          id="RadarChart"
          schema={RadarChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#e8e8e8",
              cardBackgroundColor: "#f5f5f5",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              gradientColors: ["#a855f7", "#f97316"],
              showCard: true,
              titleColor: "#333333",
              data: [
                { label: "Interaction Design", value: 85 },
                { label: "Information Design", value: 72 },
                { label: "Creative Coding", value: 65 },
                { label: "Front-end Development", value: 90 },
                { label: "Information Architecture", value: 78 },
                { label: "Interaction Design", value: 88 },
              ],
            } satisfies RadarChartProps
          }
        />
        <Composition
          component={DotScatterChartComposition}
          durationInFrames={5 * FPS}
          fps={FPS}
          height={720}
          id="DotScatterChart"
          schema={DotScatterChartSchema}
          width={1280}
          defaultProps={
            {
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              data: [
                { color: "#93c5fd", label: "Leadership", value: 85 },
                { color: "#a3e635", label: "Goal Oriented", value: 72 },
                { color: "#f472b6", label: "Teamwork", value: 90 },
              ],
            } satisfies DotScatterChartProps
          }
        />
        <Composition
          component={TrafficLightDotsComposition}
          durationInFrames={4 * FPS}
          fps={FPS}
          height={720}
          id="TrafficLightDots"
          schema={TrafficLightDotsSchema}
          width={1280}
          defaultProps={
            {
              activeIndex: 0,
              animationDuration: 90,
              backgroundColor: "#0a0a14",
              cardBackgroundColor: "#141420",
              cardBorderRadius: 16,
              cardPadding: 40,
              easing: [0.16, 1, 0.3, 1],
              fontFamily: "Inter",
              showCard: true,
              dots: [
                { color: "#ef4444", label: "Critical" },
                { color: "#eab308", label: "Warning" },
                { color: "#22c55e", label: "Normal" },
              ],
            } satisfies TrafficLightDotsProps
          }
        />
      </Folder>

    </>
  );
};
