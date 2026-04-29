import React from "react";

import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import {
	BaseChartProps,
	defaultDarkTheme,
	ChartTheme,
} from "./types";
import { useAnimatedCounter } from "./utils/animations";

export type LoadingProgressProps = BaseChartProps & {
	barColor?: string;
	label?: string;
	value: number;
};

export const LoadingProgress: React.FC<LoadingProgressProps> = ({
	animationDuration: _animationDuration = 90,
	backgroundColor = "#0a0a14",
	barColor = "#f87171",
	cardBackgroundColor = "#141420",
	cardBorderRadius = 0,
	cardPadding = 40,
	easing: _easing = [0.16, 1, 0.3, 1],
	fontFamily = "Inter",
	label = "Movie loading...",
	showCard = true,
	theme: themeOverride,
	value,
}) => {
	useInter();
	const frame = useCurrentFrame();
	const { durationInFrames, height, width } = useVideoConfig();

	const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

	const counter = useAnimatedCounter({
		delay: 10,
		duration: 80,
		end: value,
	});

	const barProgress = interpolate(
		frame,
		[15, 90],
		[0, value / 100],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	const exitProgress = interpolate(
		frame,
		[durationInFrames - 20, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp" },
	);

	const innerContent = (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<div
				style={{
					marginBottom: 40,
					opacity: interpolate(frame, [0, 15], [0, 1], {
						extrapolateLeft: "clamp",
					}),
				}}
			>
				<div
					style={{
						color: theme.secondaryTextColor,
						fontFamily,
						fontSize: 14,
						marginBottom: 4,
					}}
				>
					{label}
				</div>
				<div
					style={{
						color: "#ffffff",
						fontFamily,
						fontSize: 48,
						fontWeight: 700,
					}}
				>
					{Math.round(counter)}%
				</div>
			</div>

			{/* Progress bar */}
			<div
				style={{
					height: 24,
					position: "relative",
					width: "100%",
				}}
			>
				<div
					style={{
						backgroundColor: barColor,
						height: "100%",
						transform: `scaleX(${barProgress})`,
						transformOrigin: "left",
						width: "100%",
					}}
				/>
			</div>

			{/* Giant outline number */}
			<div
				style={{
					bottom: -20,
					left: 0,
					position: "absolute",
					width: "100%",
					zIndex: 0,
				}}
			>
				<svg
					height={height * 0.5}
					viewBox={`0 0 ${width} ${height * 0.5}`}
					width={width}
				>
					<text
						fill="none"
						fontFamily={fontFamily}
						fontSize={height * 0.45}
						fontWeight={700}
						stroke="rgba(255,255,255,0.1)"
						strokeWidth={2}
						textAnchor="middle"
						x={width / 2}
						y={height * 0.4}
					>
						{Math.round(counter)}
					</text>
				</svg>
			</div>
		</div>
	);

	if (!showCard) {
		return (
			<AbsoluteFill
				style={{
					alignItems: "center",
					backgroundColor,
					display: "flex",
					justifyContent: "center",
					padding: 40,
				}}
			>
				<div style={{ opacity: exitProgress, width: "100%" }}>
					{innerContent}
				</div>
			</AbsoluteFill>
		);
	}

	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				backgroundColor,
				display: "flex",
				justifyContent: "center",
				padding: 40,
			}}
		>
			<div
				style={{
					backgroundColor: cardBackgroundColor,
					borderRadius: cardBorderRadius,
					height: height - 80,
					opacity: exitProgress,
					overflow: "hidden",
					padding: cardPadding,
					position: "relative",
					width: width - 80,
				}}
			>
				{innerContent}
			</div>
		</AbsoluteFill>
	);
};
