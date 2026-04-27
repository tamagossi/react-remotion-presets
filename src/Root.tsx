import React from "react";

import "./index.css";

import { Composition, Folder } from "remotion";

import { MyComposition } from "./Composition";
import {
	DarkGradientBackgroundProps,
	LightGradientBackgroundProps,
	MorphingMeshBackgroundProps,
	NeonPulseBackgroundProps,
	MonochromeDriftBackgroundProps,
	SunsetOrbitBackgroundProps,
	GeometricGridBackgroundProps,
	StarfieldBackgroundProps,
	RadialSpotlightBackgroundProps,
	WaveCurveBackgroundProps,
	CornerGlowBackgroundProps,
	DiagonalSpectrumBackgroundProps,
	AuroraFlowBackgroundProps,
} from "./shared/presets/backgrounds";
import { FPS } from "./shared/constatns/fps";
import { BackgroundComposition } from "./shared/presets/backgrounds/compositions/BackgroundComposition";
import { LightGradientBackgroundComposition } from "./shared/presets/backgrounds/compositions/LightGradientBackgroundComposition";
import { MorphingMeshBackgroundComposition } from "./shared/presets/backgrounds/compositions/MorphingMeshBackgroundComposition";
import { NeonPulseBackgroundComposition } from "./shared/presets/backgrounds/compositions/NeonPulseBackgroundComposition";
import { MonochromeDriftBackgroundComposition } from "./shared/presets/backgrounds/compositions/MonochromeDriftBackgroundComposition";
import { SunsetOrbitBackgroundComposition } from "./shared/presets/backgrounds/compositions/SunsetOrbitBackgroundComposition";
import { GeometricGridBackgroundComposition } from "./shared/presets/backgrounds/compositions/GeometricGridBackgroundComposition";
import { StarfieldBackgroundComposition } from "./shared/presets/backgrounds/compositions/StarfieldBackgroundComposition";
import { RadialSpotlightBackgroundComposition } from "./shared/presets/backgrounds/compositions/RadialSpotlightBackgroundComposition";
import { WaveCurveBackgroundComposition } from "./shared/presets/backgrounds/compositions/WaveCurveBackgroundComposition";
import { CornerGlowBackgroundComposition } from "./shared/presets/backgrounds/compositions/CornerGlowBackgroundComposition";
import { DiagonalSpectrumBackgroundComposition } from "./shared/presets/backgrounds/compositions/DiagonalSpectrumBackgroundComposition";
import { AuroraFlowBackgroundComposition } from "./shared/presets/backgrounds/compositions/AuroraFlowBackgroundComposition";
import {
	LabelStackTitleProps,
	StackedCenterTitleProps,
	BoldRightTitleProps,
	MinimalStyleTitleProps,
	HeroSubtitleTitleProps,
	StackedRightTitleProps,
	MinimalDuoTitleProps,
	StackedTrioCenterTitleProps,
	ModernRightTitleProps,
} from "./shared/presets/titles";
import { LabelStackTitleComposition } from "./shared/presets/titles/compositions/LabelStackTitleComposition";
import { StackedCenterTitleComposition } from "./shared/presets/titles/compositions/StackedCenterTitleComposition";
import { BoldRightTitleComposition } from "./shared/presets/titles/compositions/BoldRightTitleComposition";
import { MinimalStyleTitleComposition } from "./shared/presets/titles/compositions/MinimalStyleTitleComposition";
import { HeroSubtitleTitleComposition } from "./shared/presets/titles/compositions/HeroSubtitleTitleComposition";
import { StackedRightTitleComposition } from "./shared/presets/titles/compositions/StackedRightTitleComposition";
import { MinimalDuoTitleComposition } from "./shared/presets/titles/compositions/MinimalDuoTitleComposition";
import { StackedTrioCenterTitleComposition } from "./shared/presets/titles/compositions/StackedTrioCenterTitleComposition";
import { ModernRightTitleComposition } from "./shared/presets/titles/compositions/ModernRightTitleComposition";

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
							baseColor: "#060d18",
							blobCount: 3,
							blobOpacity: 0.6,
							blobSize: 1.4,
							blurAmount: 140,
							colors: ["#3a6fa5", "#9b59b6", "#e74c3c"],
							easing: [0.45, 0, 0.55, 1],
							grainAmount: 0.3,
							grainOpacity: 0.04,
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
							baseColor: "#f5f7ff",
							blobCount: 3,
							blobOpacity: 0.7,
							blobSize: 1.4,
							blurAmount: 160,
							colors: ["#ff7eb3", "#5b9cfc", "#4facfe"],
							easing: [0.45, 0, 0.55, 1],
							grainAmount: 0.3,
							grainOpacity: 0.03,
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
							colors: ["#4a00e0", "#8e2de2", "#da22ff", "#1fddff", "#ff006e"],
							driftAmount: 0.6,
							easing: [0.45, 0, 0.55, 1],
							grainAmount: 0.3,
							grainOpacity: 0.04,
							morphStiffness: 1.0,
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
							colors: ["#ff006e", "#8338ec", "#3a86ff", "#06ffa5", "#ffbe0b"],
							easing: [0.4, 0, 0.6, 1],
							grainAmount: 0.3,
							grainOpacity: 0.03,
							pulseIntensity: 0.6,
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
							baseColor: "#1a0a0a",
							blobCount: 3,
							blobOpacity: 0.4,
							blobSize: 1.5,
							blurAmount: 150,
							colors: ["#ff512f", "#dd2476", "#ff9966", "#f09819"],
							easing: [0.37, 0, 0.63, 1],
							grainAmount: 0.3,
							grainOpacity: 0.03,
						} satisfies SunsetOrbitBackgroundProps
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
							gridDensity: 12,
							lineColor: "#4a7fcf",
							lineOpacity: 0.6,
							lineWidth: 1,
							perspective: 600,
						} satisfies GeometricGridBackgroundProps
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
							starColor: "#ffffff",
							starCount: 120,
							starOpacity: 0.8,
						} satisfies StarfieldBackgroundProps
					}
				/>
				<Composition
					component={RadialSpotlightBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="RadialSpotlightBackground"
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
						} satisfies RadialSpotlightBackgroundProps
					}
				/>
				<Composition
					component={WaveCurveBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="WaveCurveBackground"
					width={1280}
					defaultProps={
						{
							animationDuration: 18,
							baseColor: "#1a0218",
							easing: [0.45, 0, 0.55, 1],
							flowSpeed: 1,
							grainAmount: 0.3,
							grainOpacity: 0.04,
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
					component={CornerGlowBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="CornerGlowBackground"
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
						} satisfies CornerGlowBackgroundProps
					}
				/>
				<Composition
					component={DiagonalSpectrumBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="DiagonalSpectrumBackground"
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
						} satisfies DiagonalSpectrumBackgroundProps
					}
				/>
				<Composition
					component={AuroraFlowBackgroundComposition}
					durationInFrames={20 * FPS}
					fps={FPS}
					height={720}
					id="AuroraFlowBackground"
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
							zoneOpacity: 0.65,
							zoneSize: 1.3,
						} satisfies AuroraFlowBackgroundProps
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
			</Folder>
		</>
	);
};
