import React from "react";

import "./index.css";

import { Composition, Folder } from "remotion";

import { MyComposition } from "./Composition";
import {
	ArchitecturalWireframeBackgroundProps,
	AtmosphericFogBackgroundProps,
	AuroraFlowBackgroundProps,
	BokehLightsBackgroundProps,
	CinematicVignetteOverlayProps,
	CornerGlowBackgroundProps,
	DarkGradientBackgroundProps,
	DepthFogBackgroundProps,
	DiagonalSpectrumBackgroundProps,
	FlowWaveBackgroundProps,
	GeometricGridBackgroundProps,
	GeometricTessellationBackgroundProps,
	HaloVignetteBackgroundProps,
	LightGradientBackgroundProps,
	MonochromeDriftBackgroundProps,
	MorphingMeshBackgroundProps,
	NeonPulseBackgroundProps,
	NodeScatterBackgroundProps,
	PaperTextureBackgroundProps,
	PlexusNetworkBackgroundProps,
	RadialSpotlightBackgroundProps,
	StarfieldBackgroundProps,
	SunsetOrbitBackgroundProps,
	SweepArcBackgroundProps,
	WarmDriftBackgroundProps,
	WaveCurveBackgroundProps,
} from "./shared/presets/backgrounds";
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
import {
	ArchitecturalWireframeBackgroundSchema,
	AtmosphericFogBackgroundSchema,
	AuroraFlowBackgroundSchema,
	BokehLightsBackgroundSchema,
	CinematicVignetteOverlaySchema,
	CornerGlowBackgroundSchema,
	DarkGradientBackgroundSchema,
	DepthFogBackgroundSchema,
	DiagonalSpectrumBackgroundSchema,
	FlowWaveBackgroundSchema,
	GeometricGridBackgroundSchema,
	GeometricTessellationBackgroundSchema,
	HaloVignetteBackgroundSchema,
	LightGradientBackgroundSchema,
	MonochromeDriftBackgroundSchema,
	MorphingMeshBackgroundSchema,
	NeonPulseBackgroundSchema,
	NodeScatterBackgroundSchema,
	PaperTextureBackgroundSchema,
	PlexusNetworkBackgroundSchema,
	RadialSpotlightBackgroundSchema,
	StarfieldBackgroundSchema,
	SunsetOrbitBackgroundSchema,
	SweepArcBackgroundSchema,
	WarmDriftBackgroundSchema,
	WaveCurveBackgroundSchema,
} from "./shared/presets/backgrounds";
import { FPS } from "./shared/constatns/fps";
import {
	BoldRightTitleProps,
	CardFillTitleProps,
	ControllersUnderlineTitleProps,
	DoubleFrameTitleProps,
	ExclusiveLabelTitleProps,
	GeometricMaskTitleProps,
	GiantInitialTitleProps,
	GlitchStrokeTitleProps,
	GradientTrailTitleProps,
	HeavyStackTitleProps,
	HeroSubtitleTitleProps,
	HighlightBarTitleProps,
	LabelStackTitleProps,
	LetterSpacingRevealTitleProps,
	MinimalDuoTitleProps,
	MinimalStyleTitleProps,
	MixedEmphasisTitleProps,
	ModernRightTitleProps,
	NumberFrameTitleProps,
	OffsetFramesTitleProps,
	OutlineBoxTitleProps,
	OutlineFillTitleProps,
	OverlineUnderlineTitleProps,
	RoundedBoxTitleProps,
	QuoteBlockTitleProps,
	SandwichLabelTitleProps,
	ShadowDepthTitleProps,
	SplitHighlightTitleProps,
	StackedCenterTitleProps,
	StackedRightTitleProps,
	StackedTrioCenterTitleProps,
	StrikethroughBadgeTitleProps,
	VerticalAccentTitleProps,
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
	RoundedBoxTitleComposition,
	QuoteBlockTitleComposition,
	SandwichLabelTitleComposition,
	ShadowDepthTitleComposition,
	SplitHighlightTitleComposition,
	StackedCenterTitleComposition,
	StackedRightTitleComposition,
	StackedTrioCenterTitleComposition,
	StrikethroughBadgeTitleComposition,
	VerticalAccentTitleComposition,
} from "./shared/presets/titles/compositions";
import {
	BoldRightTitleSchema,
	CardFillTitleSchema,
	ControllersUnderlineTitleSchema,
	DoubleFrameTitleSchema,
	ExclusiveLabelTitleSchema,
	GeometricMaskTitleSchema,
	GiantInitialTitleSchema,
	GlitchStrokeTitleSchema,
	GradientTrailTitleSchema,
	HeavyStackTitleSchema,
	HeroSubtitleTitleSchema,
	HighlightBarTitleSchema,
	LabelStackTitleSchema,
	LetterSpacingRevealTitleSchema,
	MinimalDuoTitleSchema,
	MinimalStyleTitleSchema,
	MixedEmphasisTitleSchema,
	ModernRightTitleSchema,
	NumberFrameTitleSchema,
	OffsetFramesTitleSchema,
	OutlineBoxTitleSchema,
	OutlineFillTitleSchema,
	OverlineUnderlineTitleSchema,
	RoundedBoxTitleSchema,
	QuoteBlockTitleSchema,
	SandwichLabelTitleSchema,
	ShadowDepthTitleSchema,
	SplitHighlightTitleSchema,
	StackedCenterTitleSchema,
	StackedRightTitleSchema,
	StackedTrioCenterTitleSchema,
	StrikethroughBadgeTitleSchema,
	VerticalAccentTitleSchema,
} from "./shared/presets/titles";
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
							bokehColors: ["#f472b6", "#a78bfa", "#60a5fa", "#fbbf24", "#34d399"],
							bokehCount: 18,
							bokehOpacity: 0.55,
							driftAmount: 0.4,
							easing: [0.45, 0, 0.55, 1],
							grainAmount: 0.3,
							grainOpacity: 0.03,
							hexShape: false,
							lightSize: 1.0,
							vignetteStrength: 0.4,
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
							{ color: "#a0a0a0", fontSize: 72, fontStyle: "italic", text: "IS" },
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
					defaultProps={{
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
					} satisfies ScalePopTextProps}
				/>
				<Composition
					component={GlitchRevealTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="GlitchRevealText"
					width={1280}
					defaultProps={{
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
					} satisfies GlitchRevealTextProps}
				/>
				<Composition
					component={WaveTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="WaveText"
					width={1280}
					defaultProps={{
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
					} satisfies WaveTextProps}
				/>
				<Composition
					component={TypewriterTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="TypewriterText"
					width={1280}
					defaultProps={{
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
					} satisfies TypewriterTextProps}
				/>
				<Composition
					component={LetterSpacingRevealTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="LetterSpacingRevealText"
					width={1280}
					defaultProps={{
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
					} satisfies LetterSpacingRevealTextProps}
				/>
				<Composition
					component={WiggleTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="WiggleText"
					width={1280}
					defaultProps={{
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
					} satisfies WiggleTextProps}
				/>
				<Composition
					component={BlurRevealTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="BlurRevealText"
					width={1280}
					defaultProps={{
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
					} satisfies BlurRevealTextProps}
				/>
				<Composition
					component={CascadeLetterTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="CascadeLetterText"
					width={1280}
					defaultProps={{
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
					} satisfies CascadeLetterTextProps}
				/>
				<Composition
					component={FocusShiftTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="FocusShiftText"
					width={1280}
					defaultProps={{
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
					} satisfies FocusShiftTextProps}
				/>
				<Composition
					component={MixedWeightSlideTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="MixedWeightSlideText"
					width={1280}
					defaultProps={{
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
					} satisfies MixedWeightSlideTextProps}
				/>
				<Composition
					component={StackedRepeatTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="StackedRepeatText"
					width={1280}
					defaultProps={{
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
					} satisfies StackedRepeatTextProps}
				/>
				<Composition
					component={WordSwapTextComposition}
					durationInFrames={6 * FPS}
					fps={FPS}
					height={720}
					id="WordSwapText"
					width={1280}
					defaultProps={{
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
					} satisfies WordSwapTextProps}
				/>
				<Composition
					component={ColorStackTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="ColorStackText"
					width={1280}
					defaultProps={{
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
					} satisfies ColorStackTextProps}
				/>
				<Composition
					component={InlineHighlightTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="InlineHighlightText"
					width={1280}
					defaultProps={{
						animationDuration: 40,
						durationInFrames: 120,
						easing: [0.16, 1, 0.3, 1],
						exitDuration: 25,
						fontSize: 72,
						holdDuration: 30,
						startFrame: 0,
						textColor: "#ffffff",
						textTransform: "uppercase",
						segments: [
							{ color: "#ef4444", text: "e" },
							{ text: "Patmos" },
						],
					} satisfies InlineHighlightTextProps}
				/>
				<Composition
					component={SequentialWordTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="SequentialWordText"
					width={1280}
					defaultProps={{
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
					} satisfies SequentialWordTextProps}
				/>
				<Composition
					component={SimpleFadeTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="SimpleFadeText"
					width={1280}
					defaultProps={{
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
					} satisfies SimpleFadeTextProps}
				/>
				<Composition
					component={SingleWordZoomTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="SingleWordZoomText"
					width={1280}
					defaultProps={{
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
					} satisfies SingleWordZoomTextProps}
				/>
				<Composition
					component={StackedLineTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="StackedLineText"
					width={1280}
					defaultProps={{
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
					} satisfies StackedLineTextProps}
				/>
				<Composition
					component={TypewriterGlitchTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="TypewriterGlitchText"
					width={1280}
					defaultProps={{
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
					} satisfies TypewriterGlitchTextProps}
				/>
				<Composition
					component={WordSlideTextComposition}
					durationInFrames={4 * FPS}
					fps={FPS}
					height={720}
					id="WordSlideText"
					width={1280}
					defaultProps={{
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
					} satisfies WordSlideTextProps}
				/>
			</Folder>
		</>
	);
};
