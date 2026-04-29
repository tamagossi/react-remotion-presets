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

export type ActivityRingsProps = BaseChartProps & {
	rings: {
		color: string;
		label: string;
		max: number;
		value: number;
	}[];
};

export const ActivityRings: React.FC<ActivityRingsProps> = ({
	animationDuration: _animationDuration = 90,
	backgroundColor = "#0a0a14",
	cardBackgroundColor = "#141420",
	cardBorderRadius = 16,
	cardPadding = 40,
	easing: _easing = [0.16, 1, 0.3, 1],
	fontFamily = "Inter",
	rings,
	showCard = true,
	theme: themeOverride,
}) => {
	useInter();
	const frame = useCurrentFrame();
	const { durationInFrames, fps, height, width } = useVideoConfig();

	const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

	const chartWidth = width - (showCard ? cardPadding * 2 : 80);
	const chartHeight = height - (showCard ? cardPadding * 2 : 80);
	const cx = chartWidth * 0.3;
	const cy = chartHeight / 2;

	const exitProgress = interpolate(
		frame,
		[durationInFrames - 20, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp" },
	);

	const innerContent = (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				height: "100%",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<svg
				height={chartHeight}
				viewBox={`0 0 ${chartWidth} ${chartHeight}`}
				width={chartWidth}
			>
				{rings.map((ring, i) => {
					const radius = 90 - i * 28;
					const strokeWidth = 20;
					const circumference = 2 * Math.PI * radius;
					const targetDash = circumference * (ring.value / ring.max);

					const delay = i * 10;
					const progress = spring({
						config: { damping: 14, mass: 0.5, stiffness: 80 },
						fps,
						frame: Math.max(0, frame - delay),
						from: 0,
						to: 1,
					});

					const currentDash = targetDash * progress;
					const gap = circumference * 0.08;

					return (
						<g key={`ring-${i}`}>
							{/* Background track */}
							<circle
								cx={cx}
								cy={cy}
								fill="none"
								r={radius}
								stroke={theme.cardBorderColor}
								strokeWidth={strokeWidth}
							/>

							{/* Active ring */}
							<circle
								cx={cx}
								cy={cy}
								fill="none"
								r={radius}
								stroke={ring.color}
								strokeDasharray={`${Math.max(currentDash - gap, 0)} ${circumference}`}
								strokeLinecap="round"
								strokeWidth={strokeWidth}
								transform={`rotate(-90, ${cx}, ${cy})`}
							/>
						</g>
					);
				})}
			</svg>

			{/* Side labels */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 16,
					marginLeft: 40,
				}}
			>
				{rings.map((ring, i) => {
					const delay = i * 10;
					const counter = interpolate(
						frame,
						[delay + 15, delay + 65],
						[0, ring.value],
						{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
					);

					return (
						<div
							key={`label-${i}`}
							style={{
								opacity: interpolate(
									frame,
									[delay + 20, delay + 35],
									[0, 1],
									{ extrapolateLeft: "clamp" },
								),
							}}
						>
							<div
								style={{
									color: ring.color,
									fontFamily,
									fontSize: 32,
									fontWeight: 700,
								}}
							>
								{Math.round(counter)}
							</div>
							<div
								style={{
									color: theme.secondaryTextColor,
									fontFamily,
									fontSize: 13,
								}}
							>
								{ring.label}
							</div>
						</div>
					);
				})}
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
