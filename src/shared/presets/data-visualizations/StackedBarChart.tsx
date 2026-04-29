import React from "react";

import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

export type StackedBarChartProps = {
	animationDuration?: number;
	backgroundColor?: string;
	barColor?: string;
	barWidth?: number;
	data: Array<{
		label: string;
		secondaryValue?: number;
		value: number;
	}>;
	easing?: [number, number, number, number];
	exitDuration?: number;
	gridColor?: string;
	holdDuration?: number;
	labelColor?: string;
	secondaryColor?: string;
	showValues?: boolean;
	staggerDelay?: number;
	subtitle?: string;
	subtitleColor?: string;
	textColor?: string;
	title?: string;
	titleColor?: string;
	valueColor?: string;
	yMax?: number;
};

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
	animationDuration = 40,
	backgroundColor = "#0f1115",
	barColor = "#a7f3d0",
	barWidth = 48,
	data,
	easing: _easing = [0.16, 1, 0.3, 1],
	exitDuration = 25,
	gridColor = "#2a2d35",
	holdDuration = 60,
	labelColor = "#9ca3af",
	secondaryColor = "#34d399",
	showValues = true,
	staggerDelay = 5,
	subtitle = "",
	subtitleColor = "#6b7280",
	textColor: _textColor = "#ffffff",
	title = "",
	titleColor = "#ffffff",
	valueColor = "#ffffff",
	yMax = 50,
}) => {
	const frame = useCurrentFrame();
	const { durationInFrames: _durationInFrames, height, width } = useVideoConfig();

	const chartTop = 140;
	const chartBottom = height - 160;
	const chartLeft = (width - data.length * (barWidth + 20)) / 2;
	const chartHeight = chartBottom - chartTop;

	const totalFrames =
		animationDuration + holdDuration + exitDuration + staggerDelay * data.length;

	const exitProgress = interpolate(
		frame,
		[totalFrames - exitDuration, totalFrames],
		[1, 0],
		{
			easing: Easing.in(Easing.quad),
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		},
	);

	const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const titleY = interpolate(frame, [0, 15], [-20, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const gridOpacity = interpolate(frame, [5, 20], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor,
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			}}
		>
			{/* Title */}
			<div
				style={{
					opacity: titleOpacity * exitProgress,
					textAlign: "center",
					transform: `translateY(${titleY}px)`,
				}}
			>
				<div
					style={{
						color: titleColor,
						fontSize: 32,
						fontWeight: 700,
						letterSpacing: "0.02em",
						marginTop: 50,
						textTransform: "uppercase",
					}}
				>
					{title}
				</div>
				{subtitle && (
					<div
						style={{
							color: subtitleColor,
							fontSize: 13,
							marginTop: 6,
						}}
					>
						{subtitle}
					</div>
				)}
			</div>

			{/* Chart area */}
			<div style={{ position: "relative" }}>
				{/* Y-axis grid lines */}
				{[0, 1, 2, 3, 4].map((i) => {
					const value = Math.round((yMax / 4) * i);
					const y = chartBottom - (chartHeight / 4) * i;

					return (
						<React.Fragment key={i}>
							{i > 0 && (
								<div
									style={{
										backgroundColor: gridColor,
										height: 1,
										left: chartLeft - 20,
										opacity: gridOpacity * 0.4 * exitProgress,
										position: "absolute",
										top: y,
										width:
											data.length * (barWidth + 20) + 40,
									}}
								/>
							)}
							<div
								style={{
									color: labelColor,
									fontSize: 12,
									left: chartLeft - 40,
									opacity: gridOpacity * exitProgress,
									position: "absolute",
									textAlign: "right",
									top: y - 6,
									width: 30,
								}}
							>
								{value}
							</div>
						</React.Fragment>
					);
				})}

				{/* Baseline */}
				<div
					style={{
						backgroundColor: gridColor,
						height: 2,
						left: chartLeft - 20,
						opacity: gridOpacity * exitProgress,
						position: "absolute",
						top: chartBottom,
						width: data.length * (barWidth + 20) + 40,
					}}
				/>

				{/* Bars */}
				{data.map((d, i) => {
					const barX = chartLeft + i * (barWidth + 20);
					const delay = i * staggerDelay;

					const barProgress = interpolate(
						frame,
						[15 + delay, 35 + delay],
						[0, 1],
						{
							easing: Easing.out(Easing.quad),
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						},
					);

					const barHeight = (d.value / yMax) * chartHeight * barProgress;
					const secondaryHeight =
						d.secondaryValue
							? (d.secondaryValue / yMax) *
								chartHeight *
								barProgress
							: 0;

					const valueOpacity = interpolate(
						frame,
						[30 + delay, 40 + delay],
						[0, 1],
						{
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						},
					);

					return (
						<React.Fragment key={i}>
							{/* Main bar */}
							<div
								style={{
									backgroundColor: barColor,
									borderRadius: "6px 6px 0 0",
									bottom: chartBottom,
									height: barHeight,
									left: barX,
									opacity: exitProgress,
									position: "absolute",
									width: barWidth,
								}}
							>
								{/* Secondary value overlay (dual-tone) */}
								{secondaryHeight > 0 && (
									<div
										style={{
											backgroundColor: secondaryColor,
											borderRadius: "6px 6px 0 0",
											height: `${(secondaryHeight / barHeight) * 100}%`,
											opacity: 0.7,
											position: "absolute",
											width: "100%",
										}}
									/>
								)}
							</div>

							{/* Value label */}
							{showValues && (
								<div
									style={{
										color: valueColor,
										fontSize: 13,
										fontWeight: 600,
										left: barX,
										opacity: valueOpacity * exitProgress,
										position: "absolute",
										textAlign: "center",
										top: chartBottom - barHeight - 20,
										width: barWidth,
									}}
								>
									{d.value}
								</div>
							)}

							{/* X label */}
							<div
								style={{
									color: labelColor,
									fontSize: 12,
									left: barX,
									position: "absolute",
									textAlign: "center",
									top: chartBottom + 12,
									width: barWidth,
									opacity:
										interpolate(
											frame,
											[10 + i * 2, 20 + i * 2],
											[0, 1],
											{
												extrapolateLeft: "clamp",
												extrapolateRight: "clamp",
											},
										) * exitProgress,
								}}
							>
								{d.label}
							</div>
						</React.Fragment>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
