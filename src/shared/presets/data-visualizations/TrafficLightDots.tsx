import React from "react";

import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import {
	BaseChartProps,
	defaultDarkTheme,
	ChartTheme,
} from "./types";

export type TrafficLightDotsProps = BaseChartProps & {
	activeIndex?: number;
	dots: {
		color: string;
		label?: string;
	}[];
};

export const TrafficLightDots: React.FC<TrafficLightDotsProps> = ({
	activeIndex = 0,
	animationDuration: _animationDuration = 90,
	backgroundColor = "#0a0a14",
	cardBackgroundColor = "#141420",
	cardBorderRadius = 16,
	cardPadding = 40,
	dots,
	easing: _easing = [0.16, 1, 0.3, 1],
	fontFamily = "Inter",
	showCard = true,
	theme: themeOverride,
}) => {
	useInter();
	const frame = useCurrentFrame();
	const { durationInFrames, fps, height, width } = useVideoConfig();

	const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

	const chartWidth = width - (showCard ? cardPadding * 2 : 80);
	const chartHeight = height - (showCard ? cardPadding * 2 : 80);
	const centerX = chartWidth / 2;
	const centerY = chartHeight / 2;
	const gap = 60;

	const exitProgress = interpolate(
		frame,
		[durationInFrames - 20, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp" },
	);

	const innerContent = (
		<svg
			height={chartHeight}
			viewBox={`0 0 ${chartWidth} ${chartHeight}`}
			width={chartWidth}
		>
			{dots.map((dot, i) => {
				const delay = i * 8;
				const scale = spring({
					config: { damping: 12, mass: 0.5, stiffness: 100 },
					fps,
					frame: Math.max(0, frame - delay),
					from: 0,
					to: 1,
				});

				const isActive = i === activeIndex;
				const pulse = isActive
					? 1 + Math.sin((frame * Math.PI) / 15) * 0.1
					: 1;

				const cy = centerY + (i - (dots.length - 1) / 2) * gap;

				return (
					<g key={`dot-${i}`}>
						{/* Glow for active */}
						{isActive && (
							<circle
								cx={centerX}
								cy={cy}
								fill={dot.color}
								opacity={0.3}
								r={20 * pulse}
							/>
						)}

						{/* Dot */}
						<circle
							cx={centerX}
							cy={cy}
							fill={dot.color}
							r={14 * scale * (isActive ? pulse : 1)}
						/>

						{/* Label */}
						{dot.label && (
						<text
							fill={theme.primaryTextColor}
							fontFamily={fontFamily}
							fontSize={14}
							fontWeight={500}
							x={centerX + 30}
							y={cy + 5}
							opacity={interpolate(
								frame,
								[delay + 10, delay + 25],
								[0, 1],
								{ extrapolateLeft: "clamp" },
							)}
						>
								{dot.label}
							</text>
						)}
					</g>
				);
			})}
		</svg>
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
					border: `1px solid ${theme.cardBorderColor}`,
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
