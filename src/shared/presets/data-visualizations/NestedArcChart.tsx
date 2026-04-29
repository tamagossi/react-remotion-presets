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
	DataPoint,
} from "./types";

export type NestedArcChartProps = BaseChartProps & {
	data: DataPoint[];
};

export const NestedArcChart: React.FC<NestedArcChartProps> = ({
	animationDuration: _animationDuration = 90,
	backgroundColor = "#0a0a14",
	cardBackgroundColor = "#141420",
	cardBorderRadius = 16,
	cardPadding = 40,
	data,
	easing: _easing = [0.16, 1, 0.3, 1],
	fontFamily = "Inter",
	showCard = true,
	theme: themeOverride,
	title: _title = "",
	titleColor: _titleColor = "#ffffff",
}) => {
	useInter();
	const frame = useCurrentFrame();
	const { durationInFrames, fps, height, width } = useVideoConfig();

	const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

	const chartWidth = width - (showCard ? cardPadding * 2 : 80);
	const chartHeight = height - (showCard ? cardPadding * 2 : 80);
	const cx = chartWidth * 0.6;
	const cy = chartHeight / 2;
	const maxRadius = Math.min(chartWidth, chartHeight) * 0.38;

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
			{data.map((item, i) => {
				const radius = maxRadius - i * (maxRadius / data.length) * 0.9;
				const delay = i * 12;
				const progress = spring({
					config: { damping: 14, mass: 0.6, stiffness: 80 },
					fps,
					frame: Math.max(0, frame - delay),
					from: 0,
					to: 1,
				});

				const circumference = 2 * Math.PI * radius;
				const targetDash = circumference * (item.value / 100);
				const currentDash = targetDash * progress;

				const counter = interpolate(
					frame,
					[delay + 20, delay + 70],
					[0, item.value],
					{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
				);

				const labelX = cx + radius + 20;
				const labelY = cy + (i - data.length / 2 + 0.5) * 32;

				return (
					<g key={`arc-${i}`}>
						{/* Background arc */}
						<circle
							cx={cx}
							cy={cy}
							fill="none"
							r={radius}
							stroke={theme.cardBorderColor}
							strokeWidth={18}
						/>

						{/* Active arc */}
						<circle
							cx={cx}
							cy={cy}
							fill="none"
							opacity={0.8 + i * 0.05}
							r={radius}
							stroke={item.color || theme.accentColor}
							strokeDasharray={`${currentDash} ${circumference}`}
							strokeLinecap="round"
							strokeWidth={18}
							transform={`rotate(-90, ${cx}, ${cy})`}
						/>

						{/* Leader line */}
						<line
							stroke={theme.secondaryTextColor}
							strokeWidth={1}
							x1={cx + radius + 8}
							x2={labelX - 8}
							y1={cy}
							y2={labelY}
							opacity={interpolate(
								frame,
								[delay + 30, delay + 45],
								[0, 1],
								{ extrapolateLeft: "clamp" },
							)}
						/>

						{/* Label */}
						<text
							fill={theme.primaryTextColor}
							fontFamily={fontFamily}
							fontSize={14}
							fontWeight={600}
							x={labelX}
							y={labelY + 5}
							opacity={interpolate(
								frame,
								[delay + 35, delay + 50],
								[0, 1],
								{ extrapolateLeft: "clamp" },
							)}
						>
							{`${Math.round(counter)}% ${item.label}`}
						</text>
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
