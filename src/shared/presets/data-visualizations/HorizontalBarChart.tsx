import React, { useMemo } from "react";

import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import {
	BaseChartProps,
	SeriesData,
	defaultDarkTheme,
	ChartTheme,
} from "./types";
import { useStaggeredReveal } from "./utils/animations";

export type HorizontalBarChartProps = BaseChartProps & {
	data: SeriesData[];
	showLegend?: boolean;
};

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
	animationDuration = 90,
	backgroundColor = "#0a0a14",
	cardBackgroundColor = "#141420",
	cardBorderRadius = 16,
	cardPadding = 40,
	data,
	easing: _easing = [0.16, 1, 0.3, 1],
	fontFamily = "Inter",
	showCard = true,
	showLegend = true,
	theme: themeOverride,
	title = "Statistical analysis",
	titleColor = "#ffffff",
}) => {
	useInter();
	const frame = useCurrentFrame();
	const { durationInFrames, height, width } = useVideoConfig();

	const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

	const chartWidth = width - (showCard ? cardPadding * 2 : 80);
	const chartHeight = height - (showCard ? cardPadding * 2 : 80) - 140;
	const padding = { bottom: 20, left: 140, right: 40, top: 20 };
	const drawWidth = chartWidth - padding.left - padding.right;
	const drawHeight = chartHeight - padding.top - padding.bottom;

	const allValues = useMemo(
		() => data.flatMap((s) => s.data.map((d) => d.value)),
		[data],
	);
	const maxValue = useMemo(
		() => Math.max(...allValues) * 1.1,
		[allValues],
	);

	const labels = useMemo(() => {
		if (data.length === 0) return [];
		return data[0].data.map((d) => d.label);
	}, [data]);

	const itemCount = labels.length * data.length;
	const barProgress = useStaggeredReveal({
		baseDelay: 15,
		count: itemCount,
		itemDuration: 18,
		stagger: 4,
	});

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
				width: "100%",
			}}
		>
			<div
				style={{
					color: titleColor,
					fontFamily,
					fontSize: 28,
					fontWeight: 700,
					marginBottom: 24,
					opacity: interpolate(frame, [0, 15], [0, 1], {
						extrapolateLeft: "clamp",
					}),
				}}
			>
				{title}
			</div>

			<svg
				height={chartHeight}
				style={{ flex: 1 }}
				viewBox={`0 0 ${chartWidth} ${chartHeight}`}
				width={chartWidth}
			>
				{/* Bars */}
				{labels.map((label, labelIndex) => {
					const groupY =
						padding.top +
						(labelIndex / labels.length) * drawHeight +
						(drawHeight / labels.length) * 0.15;
					const groupHeight =
						(drawHeight / labels.length) * 0.7;
					const barHeight = groupHeight / data.length;

					return (
						<g key={`group-${labelIndex}`}>
							{/* Label */}
							<text
								fill={theme.primaryTextColor}
								fontFamily={fontFamily}
								fontSize={13}
								fontWeight={500}
								textAnchor="end"
								x={padding.left - 12}
								y={groupY + groupHeight / 2 + 5}
							>
								{label}
							</text>

							{/* Bars for each series */}
							{data.map((series, seriesIndex) => {
								const dataPoint = series.data[labelIndex];
								if (!dataPoint) return null;
								const progressIndex =
									labelIndex * data.length + seriesIndex;
								const progress = barProgress[progressIndex];
								const barW =
									(dataPoint.value / maxValue) *
									drawWidth *
									progress;
								const y =
									groupY + seriesIndex * barHeight;

								return (
									<rect
										fill={series.color}
										height={barHeight - 4}
										key={`bar-${labelIndex}-${seriesIndex}`}
										rx={4}
										width={Math.max(barW, 0)}
										x={padding.left}
										y={y + 2}
										style={{
											opacity: interpolate(progress, [0, 0.5], [0, 1], {
												extrapolateLeft: "clamp",
											}),
										}}
									/>
								);
							})}
						</g>
					);
				})}
			</svg>

			{/* Legend */}
			{showLegend && (
				<div
					style={{
						display: "flex",
						gap: 24,
						marginTop: 16,
						opacity: interpolate(
							frame,
							[animationDuration * 0.5, animationDuration * 0.5 + 20],
							[0, 1],
							{ extrapolateLeft: "clamp" },
						),
					}}
				>
					{data.map((series, i) => (
						<div
							key={`legend-${i}`}
							style={{
								alignItems: "center",
								display: "flex",
								gap: 8,
							}}
						>
							<div
								style={{
									backgroundColor: series.color,
									borderRadius: 3,
									height: 12,
									width: 12,
								}}
							/>
							<span
								style={{
									color: theme.secondaryTextColor,
									fontFamily,
									fontSize: 13,
									fontWeight: 500,
								}}
							>
								{series.name}
							</span>
						</div>
					))}
				</div>
			)}
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
