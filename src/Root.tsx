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
			</Folder>
		</>
	);
};
