import React from "react";

import "./index.css";

import { Composition, Folder } from "remotion";

import { MyComposition } from "./Composition";
import {
	AtmosphericFogBackgroundProps,
	BokehLightsBackgroundProps,
	CinematicVignetteOverlayProps,
	DarkGradientBackgroundProps,
	DepthFogBackgroundProps,
	FlowWaveBackgroundProps,
	GeometricGridBackgroundProps,
	HaloVignetteBackgroundProps,
	LightGradientBackgroundProps,
	MonochromeDriftBackgroundProps,
	MorphingMeshBackgroundProps,
	NeonPulseBackgroundProps,
	PaperTextureBackgroundProps,
	StarfieldBackgroundProps,
	SunsetOrbitBackgroundProps,
	SweepArcBackgroundProps,
	WarmDriftBackgroundProps,
} from "./shared/presets/backgrounds";
import { FPS } from "./shared/constatns/fps";
import { AtmosphericFogBackgroundComposition } from "./shared/presets/backgrounds/compositions/AtmosphericFogBackgroundComposition";
import { BackgroundComposition } from "./shared/presets/backgrounds/compositions/BackgroundComposition";
import { BokehLightsBackgroundComposition } from "./shared/presets/backgrounds/compositions/BokehLightsBackgroundComposition";
import { CinematicVignetteOverlayComposition } from "./shared/presets/backgrounds/compositions/CinematicVignetteOverlayComposition";
import { DepthFogBackgroundComposition } from "./shared/presets/backgrounds/compositions/DepthFogBackgroundComposition";
import { FlowWaveBackgroundComposition } from "./shared/presets/backgrounds/compositions/FlowWaveBackgroundComposition";
import { GeometricGridBackgroundComposition } from "./shared/presets/backgrounds/compositions/GeometricGridBackgroundComposition";
import { HaloVignetteBackgroundComposition } from "./shared/presets/backgrounds/compositions/HaloVignetteBackgroundComposition";
import { LightGradientBackgroundComposition } from "./shared/presets/backgrounds/compositions/LightGradientBackgroundComposition";
import { MonochromeDriftBackgroundComposition } from "./shared/presets/backgrounds/compositions/MonochromeDriftBackgroundComposition";
import { MorphingMeshBackgroundComposition } from "./shared/presets/backgrounds/compositions/MorphingMeshBackgroundComposition";
import { NeonPulseBackgroundComposition } from "./shared/presets/backgrounds/compositions/NeonPulseBackgroundComposition";
import { PaperTextureBackgroundComposition } from "./shared/presets/backgrounds/compositions/PaperTextureBackgroundComposition";
import { StarfieldBackgroundComposition } from "./shared/presets/backgrounds/compositions/StarfieldBackgroundComposition";
import { SunsetOrbitBackgroundComposition } from "./shared/presets/backgrounds/compositions/SunsetOrbitBackgroundComposition";
import { SweepArcBackgroundComposition } from "./shared/presets/backgrounds/compositions/SweepArcBackgroundComposition";
import { WarmDriftBackgroundComposition } from "./shared/presets/backgrounds/compositions/WarmDriftBackgroundComposition";
import {
	CardFillTitleProps,
	ControllersUnderlineTitleProps,
	DoubleFrameTitleProps,
	ExclusiveLabelTitleProps,
	GiantInitialTitleProps,
	LabelStackTitleProps,
	NumberFrameTitleProps,
	OffsetFramesTitleProps,
	OutlineBoxTitleProps,
	OverlineUnderlineTitleProps,
	SplitHighlightTitleProps,
	StackedCenterTitleProps,
	BoldRightTitleProps,
	MinimalStyleTitleProps,
	HeroSubtitleTitleProps,
	StackedRightTitleProps,
	MinimalDuoTitleProps,
	StackedTrioCenterTitleProps,
	ModernRightTitleProps,
	StrikethroughBadgeTitleProps,
	VerticalAccentTitleProps,
} from "./shared/presets/titles";
import { CardFillTitleComposition } from "./shared/presets/titles/compositions/CardFillTitleComposition";
import { ControllersUnderlineTitleComposition } from "./shared/presets/titles/compositions/ControllersUnderlineTitleComposition";
import { DoubleFrameTitleComposition } from "./shared/presets/titles/compositions/DoubleFrameTitleComposition";
import { ExclusiveLabelTitleComposition } from "./shared/presets/titles/compositions/ExclusiveLabelTitleComposition";
import { GiantInitialTitleComposition } from "./shared/presets/titles/compositions/GiantInitialTitleComposition";
import { LabelStackTitleComposition } from "./shared/presets/titles/compositions/LabelStackTitleComposition";
import { NumberFrameTitleComposition } from "./shared/presets/titles/compositions/NumberFrameTitleComposition";
import { OffsetFramesTitleComposition } from "./shared/presets/titles/compositions/OffsetFramesTitleComposition";
import { OutlineBoxTitleComposition } from "./shared/presets/titles/compositions/OutlineBoxTitleComposition";
import { OverlineUnderlineTitleComposition } from "./shared/presets/titles/compositions/OverlineUnderlineTitleComposition";
import { SplitHighlightTitleComposition } from "./shared/presets/titles/compositions/SplitHighlightTitleComposition";
import { StackedCenterTitleComposition } from "./shared/presets/titles/compositions/StackedCenterTitleComposition";
import { BoldRightTitleComposition } from "./shared/presets/titles/compositions/BoldRightTitleComposition";
import { MinimalStyleTitleComposition } from "./shared/presets/titles/compositions/MinimalStyleTitleComposition";
import { HeroSubtitleTitleComposition } from "./shared/presets/titles/compositions/HeroSubtitleTitleComposition";
import { StackedRightTitleComposition } from "./shared/presets/titles/compositions/StackedRightTitleComposition";
import { MinimalDuoTitleComposition } from "./shared/presets/titles/compositions/MinimalDuoTitleComposition";
import { StackedTrioCenterTitleComposition } from "./shared/presets/titles/compositions/StackedTrioCenterTitleComposition";
import { ModernRightTitleComposition } from "./shared/presets/titles/compositions/ModernRightTitleComposition";
import { StrikethroughBadgeTitleComposition } from "./shared/presets/titles/compositions/StrikethroughBadgeTitleComposition";
import { VerticalAccentTitleComposition } from "./shared/presets/titles/compositions/VerticalAccentTitleComposition";

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
					component={BackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="BackgroundComposition"
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
					component={LightGradientBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="LightGradientBackground"
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
					component={MorphingMeshBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="MorphingMeshBackground"
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
					component={MonochromeDriftBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="MonochromeDriftBackground"
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
					component={SunsetOrbitBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="SunsetOrbitBackground"
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
					component={FlowWaveBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="FlowWaveBackground"
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
					component={HaloVignetteBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="HaloVignetteBackground"
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
					component={StarfieldBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="StarfieldBackground"
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
					component={SweepArcBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="SweepArcBackground"
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
					component={AtmosphericFogBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="AtmosphericFogBackground"
					width={1280}
					defaultProps={
						{
							animationDuration: 30,
							baseColor: "#0a0a12",
							bandBlur: 100,
							bandCount: 4,
							bandOpacity: 0.35,
							easing: [0.45, 0, 0.55, 1],
							fogColors: ["#334155", "#475569", "#64748b", "#94a3b8"],
							grainAmount: 0.3,
							grainOpacity: 0.04,
							vignetteStrength: 0.45,
						} satisfies AtmosphericFogBackgroundProps
					}
				/>
				<Composition
					component={BokehLightsBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="BokehLightsBackground"
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
					component={DepthFogBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="DepthFogBackground"
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
					component={PaperTextureBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="PaperTextureBackground"
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
					component={CinematicVignetteOverlayComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="CinematicVignetteOverlay"
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
			</Folder>

			<Folder name="titles">
				<Composition
					component={LabelStackTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="LabelStackTitle"
					width={1280}
					defaultProps={
						{
							align: "left",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [36, 96],
							fontWeight: [400, 700],
							gap: 8,
							letterSpacing: [0.15, 0.02],
							lines: ["TITLES KIT", "DYNAMIC"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies LabelStackTitleProps
					}
				/>
				<Composition
					component={StackedCenterTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="StackedCenterTitle"
					width={1280}
					defaultProps={
						{
							align: "center",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [72, 96, 72],
							fontWeight: 700,
							gap: 12,
							letterSpacing: 0.02,
							lines: ["CREATIVE", "DESIGN", "STUDIO"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies StackedCenterTitleProps
					}
				/>
				<Composition
					component={BoldRightTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="BoldRightTitle"
					width={1280}
					defaultProps={
						{
							align: "right",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [72, 96],
							fontWeight: 700,
							gap: 12,
							letterSpacing: 0.02,
							lines: ["BOLD IDEAS", "MATTER"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies BoldRightTitleProps
					}
				/>
				<Composition
					component={MinimalStyleTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="MinimalStyleTitle"
					width={1280}
					defaultProps={
						{
							align: "left",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [28, 96, 28],
							fontWeight: [400, 700, 400],
							gap: 8,
							letterSpacing: [0.15, 0.02, 0.15],
							lines: ["MINIMAL", "STYLE", "CONCEPT"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies MinimalStyleTitleProps
					}
				/>
				<Composition
					component={HeroSubtitleTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="HeroSubtitleTitle"
					width={1280}
					defaultProps={
						{
							align: "center",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [96, 36],
							fontWeight: [700, 400],
							gap: 12,
							letterSpacing: [0.02, 0.1],
							lines: ["DYNAMIC", "Titles Kit"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies HeroSubtitleTitleProps
					}
				/>
				<Composition
					component={StackedRightTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="StackedRightTitle"
					width={1280}
					defaultProps={
						{
							align: "right",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [72, 96, 72],
							fontWeight: 700,
							gap: 12,
							letterSpacing: 0.02,
							lines: ["CREATIVE", "TYPOGRAPHY", "PACK"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies StackedRightTitleProps
					}
				/>
				<Composition
					component={MinimalDuoTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="MinimalDuoTitle"
					width={1280}
					defaultProps={
						{
							align: "left",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [28, 96],
							fontWeight: [400, 700],
							gap: 8,
							letterSpacing: [0.15, 0.02],
							lines: ["MINIMAL", "TITLES"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies MinimalDuoTitleProps
					}
				/>
				<Composition
					component={StackedTrioCenterTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="StackedTrioCenterTitle"
					width={1280}
					defaultProps={
						{
							align: "center",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [72, 96, 72],
							fontWeight: 700,
							gap: 12,
							letterSpacing: 0.02,
							lines: ["DIGITAL", "MARKETING", "WEEK"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies StackedTrioCenterTitleProps
					}
				/>
				<Composition
					component={ModernRightTitleComposition}
					durationInFrames={1  * FPS}
					fps={FPS}
					height={720}
					id="ModernRightTitle"
					width={1280}
					defaultProps={
						{
							align: "right",
							animationDuration: 45,
							color: "#ffffff",
							easing: [0.16, 1, 0.3, 1],
							entranceDirection: "up",
							fontSize: [96, 48],
							fontWeight: [700, 400],
							gap: 12,
							letterSpacing: [0.02, 0.08],
							lines: ["MODERN", "TEXT REVEAL"],
							staggerDelay: 12,
							startFrame: 0,
						} satisfies ModernRightTitleProps
					}
				/>
				<Composition
					component={ExclusiveLabelTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="ExclusiveLabelTitle"
					width={1280}
					defaultProps={
						{
							accentColor: "#dc2626",
							accentThickness: 2,
							accentWidth: 120,
							animationDuration: 45,
							easing: [0.16, 1, 0.3, 1],
							label: "EXCLUSIVE",
							lines: ["DYNAMIC TITLES"],
						} satisfies ExclusiveLabelTitleProps
					}
				/>
				<Composition
					component={ControllersUnderlineTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="ControllersUnderlineTitle"
					width={1280}
					defaultProps={
						{
							accentColor: "#dc2626",
							accentThickness: 3,
							animationDuration: 45,
							easing: [0.16, 1, 0.3, 1],
							lines: ["CONTROLLERS"],
							subtitle: "Premium Gaming Gear",
						} satisfies ControllersUnderlineTitleProps
					}
				/>
				<Composition
					component={CardFillTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="CardFillTitle"
					width={1280}
					defaultProps={
						{
							animationDuration: 45,
							cardColor: "#ffffff",
							cardPadding: 48,
							cardWidth: 700,
							easing: [0.16, 1, 0.3, 1],
							lines: ["CARD FILL"],
							subtitle: "Premium Collection",
						} satisfies CardFillTitleProps
					}
				/>
				<Composition
					component={VerticalAccentTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="VerticalAccentTitle"
					width={1280}
					defaultProps={
						{
							accentColor: "#dc2626",
							accentHeight: 180,
							accentThickness: 3,
							animationDuration: 45,
							easing: [0.16, 1, 0.3, 1],
							lines: ["VERTICAL", "ACCENT"],
						} satisfies VerticalAccentTitleProps
					}
				/>
				<Composition
					component={SplitHighlightTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="SplitHighlightTitle"
					width={1280}
					defaultProps={
						{
							animationDuration: 45,
							boxColor: "#dc2626",
							boxHeight: 160,
							boxWidth: 100,
							easing: [0.16, 1, 0.3, 1],
							lines: ["HIGHLIGHT"],
							subtitle: "FEATURED",
						} satisfies SplitHighlightTitleProps
					}
				/>
				<Composition
					component={OverlineUnderlineTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="OverlineUnderlineTitle"
					width={1280}
					defaultProps={
						{
							accentColor: "#dc2626",
							accentThickness: 3,
							animationDuration: 45,
							easing: [0.16, 1, 0.3, 1],
							lines: ["OVERLINE"],
							overline: "EST. 2024",
						} satisfies OverlineUnderlineTitleProps
					}
				/>
				<Composition
					component={StrikethroughBadgeTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="StrikethroughBadgeTitle"
					width={1280}
					defaultProps={
						{
							animationDuration: 45,
							badge: "NEW",
							badgeColor: "#dc2626",
							easing: [0.16, 1, 0.3, 1],
							lines: ["STRIKETHROUGH"],
						} satisfies StrikethroughBadgeTitleProps
					}
				/>
				<Composition
					component={OutlineBoxTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="OutlineBoxTitle"
					width={1280}
					defaultProps={
						{
							animationDuration: 45,
							boxBorderColor: "#dc2626",
							boxBorderThickness: 3,
							boxPadding: 48,
							boxWidth: 600,
							easing: [0.16, 1, 0.3, 1],
							lines: ["OUTLINE BOX"],
							subtitle: "Premium Design",
						} satisfies OutlineBoxTitleProps
					}
				/>
				<Composition
					component={NumberFrameTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="NumberFrameTitle"
					width={1280}
					defaultProps={
						{
							animationDuration: 45,
							easing: [0.16, 1, 0.3, 1],
							frameColor: "#dc2626",
							frameSize: 100,
							lines: ["FRAME TITLE"],
							number: "01",
						} satisfies NumberFrameTitleProps
					}
				/>
				<Composition
					component={DoubleFrameTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="DoubleFrameTitle"
					width={1280}
					defaultProps={
						{
							animationDuration: 45,
							borderThickness: 2,
							boxPadding: 48,
							boxWidth: 600,
							easing: [0.16, 1, 0.3, 1],
							lines: ["DOUBLE FRAME"],
							subtitle: "PREMIUM",
						} satisfies DoubleFrameTitleProps
					}
				/>
				<Composition
					component={GiantInitialTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="GiantInitialTitle"
					width={1280}
					defaultProps={
						{
							animationDuration: 45,
							easing: [0.16, 1, 0.3, 1],
							initial: "G",
							initialColor: "#dc2626",
							initialFontSize: 180,
							lines: ["GIANT INITIAL"],
						} satisfies GiantInitialTitleProps
					}
				/>
				<Composition
					component={OffsetFramesTitleComposition}
					durationInFrames={1 * FPS}
					fps={FPS}
					height={720}
					id="OffsetFramesTitle"
					width={1280}
					defaultProps={
						{
							animationDuration: 45,
							easing: [0.16, 1, 0.3, 1],
							frame1Color: "#dc2626",
							frame2Color: "#ffffff",
							frameHeight: 140,
							frameOffset: 16,
							frameWidth: 450,
							lines: ["OFFSET FRAMES"],
							subtitle: "DYNAMIC LAYOUT",
						} satisfies OffsetFramesTitleProps
					}
				/>
			</Folder>
		</>
	);
};
