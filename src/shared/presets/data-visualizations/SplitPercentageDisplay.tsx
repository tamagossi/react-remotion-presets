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
} from "./types";
import { useAnimatedCounter } from "./utils/animations";

export type SplitPercentageDisplayProps = BaseChartProps & {
	accentColor?: string;
	bottomColor?: string;
	suffix?: string;
	value: number;
};

export const SplitPercentageDisplay: React.FC<
	SplitPercentageDisplayProps
> = ({
	accentColor: _accentColor = "#ef4444",
	animationDuration: _animationDuration = 90,
	backgroundColor = "#ef4444",
	bottomColor = "#1f2937",
	cardBackgroundColor = "transparent",
	cardBorderRadius = 0,
	cardPadding = 40,
	easing: _easing = [0.16, 1, 0.3, 1],
	fontFamily = "Inter",
	showCard = true,
	suffix = "%",
	theme: _themeOverride,
	value,
}) => {
	useInter();
	const frame = useCurrentFrame();
	const { durationInFrames, height, width } = useVideoConfig();

	const counter = useAnimatedCounter({
		delay: 15,
		duration: 70,
		end: value,
	});

	const wipeProgress = interpolate(frame, [10, 50], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const scaleProgress = interpolate(frame, [0, 20], [0.85, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const exitProgress = interpolate(
		frame,
		[durationInFrames - 20, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp" },
	);

	const displayValue = `${Math.round(counter)}${suffix}`;

	const innerContent = (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				height: "100%",
				justifyContent: "center",
				position: "relative",
				width: "100%",
			}}
		>
			{/* Decorative circles */}
			<div
				style={{
					backgroundColor: "rgba(255,255,255,0.08)",
					borderRadius: "50%",
					height: height * 0.7,
					position: "absolute",
					width: height * 0.7,
				}}
			/>

			{/* Giant split text */}
			<div
				style={{
					position: "relative",
					transform: `scale(${scaleProgress})`,
				}}
			>
				<svg
					height={height * 0.55}
					viewBox={`0 0 ${width} ${height * 0.55}`}
					width={width}
				>
					<defs>
						<clipPath id="topClip">
							<rect
								height={height * 0.55 * 0.5}
								width={width * wipeProgress}
								x={0}
								y={0}
							/>
						</clipPath>
						<clipPath id="bottomClip">
							<rect
								height={height * 0.55 * 0.5}
								width={width * wipeProgress}
								x={0}
								y={height * 0.55 * 0.5}
							/>
						</clipPath>
					</defs>

					{/* Top half (white) */}
					<text
						clipPath="url(#topClip)"
						fill="#ffffff"
						fontFamily={fontFamily}
						fontSize={height * 0.5}
						fontWeight={800}
						textAnchor="middle"
						x={width / 2}
						y={height * 0.42}
					>
						{displayValue}
					</text>

					{/* Bottom half (dark) */}
					<text
						clipPath="url(#bottomClip)"
						fill={bottomColor}
						fontFamily={fontFamily}
						fontSize={height * 0.5}
						fontWeight={800}
						textAnchor="middle"
						x={width / 2}
						y={height * 0.42}
					>
						{displayValue}
					</text>

					{/* Horizontal line */}
					<line
						stroke="rgba(255,255,255,0.4)"
						strokeWidth={2}
						x1={width * 0.15}
						x2={width * 0.85}
						y1={height * 0.275}
						y2={height * 0.275}
					/>

					{/* End dots */}
					<circle
						cx={width * 0.15}
						cy={height * 0.275}
						fill="none"
						r={4}
						stroke="rgba(255,255,255,0.6)"
						strokeWidth={2}
					/>
					<circle
						cx={width * 0.85}
						cy={height * 0.275}
						fill="none"
						r={4}
						stroke="rgba(255,255,255,0.6)"
						strokeWidth={2}
					/>
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
					width: width - 80,
				}}
			>
				{innerContent}
			</div>
		</AbsoluteFill>
	);
};
