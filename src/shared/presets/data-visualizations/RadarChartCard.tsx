import React from "react";

import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
} from "remotion";

import { DataCard, type DataCardProps } from "./DataCard";

export type RadarChartCardProps = Omit<
	DataCardProps,
	"children" | "metricValue"
> & {
	colors?: string[];
	data: { color: string; label: string; value: number }[];
	fillOpacity?: number;
	gridLines?: boolean;
	lineWidth?: number;
	maxValue?: number;
	metricValue?: number;
	pointRadius?: number;
	size?: number;
};

export const RadarChartCard: React.FC<RadarChartCardProps> = ({
	colors = ["#ec4899", "#8b5cf6", "#22c55e", "#fbbf24", "#f97316", "#06b6d4"],
	data,
	fillOpacity = 0.2,
	gridLines = true,
	lineWidth = 2,
	maxValue,
	metricValue,
	pointRadius = 4,
	size = 180,
	...cardProps
}) => {
	const frame = useCurrentFrame();
	const centerX = size / 2;
	const centerY = size / 2;
	const radius = size / 2 - 20;

	const max = maxValue ?? Math.max(...data.map((d) => d.value)) * 1.2;
	const numPoints = data.length;

	const animStart = 20;
	const animEnd = 50;

	const textColor = cardProps.theme === "light" ? "#666666" : "#a0a0a0";
	const labelColor = cardProps.theme === "light" ? "#1a1a1a" : "#ffffff";

	const getPoint = (index: number, value: number) => {
		const angle = (index / numPoints) * Math.PI * 2 - Math.PI / 2;
		const r = (value / max) * radius;
		return {
			x: centerX + r * Math.cos(angle),
			y: centerY + r * Math.sin(angle),
		};
	};

	const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

	const pathProgress = interpolate(frame, [animStart + 10, animEnd], [0, 1], {
		easing: Easing.out(Easing.quad),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const points = data.map((d, i) => getPoint(i, d.value));
	const animatedPoints = points.map((p) => {
		return {
			x: centerX + (p.x - centerX) * pathProgress,
			y: centerY + (p.y - centerY) * pathProgress,
		};
	});

	const pathD = animatedPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: cardProps.theme === "light" ? "#f5f5f5" : "#0a0a0a",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<DataCard {...cardProps} metricValue={metricValue}>
				<div style={{ alignItems: "center", display: "flex", gap: 24 }}>
					<svg height={size} style={{ overflow: "visible" }} viewBox={`0 0 ${size} ${size}`} width={size}>
						{gridLines &&
							gridLevels.map((level, i) => {
								const levelRadius = radius * level;
								const levelPoints = [];
								for (let j = 0; j < numPoints; j++) {
									const angle = (j / numPoints) * Math.PI * 2 - Math.PI / 2;
									levelPoints.push({
										x: centerX + levelRadius * Math.cos(angle),
										y: centerY + levelRadius * Math.sin(angle),
									});
								}

								const gridOpacity = interpolate(frame, [animStart + i * 2, animStart + i * 2 + 8], [0, 0.3], {
									extrapolateLeft: "clamp",
									extrapolateRight: "clamp",
								});

								return (
									<polygon
										fill="none"
										key={i}
										opacity={gridOpacity}
										points={levelPoints.map((p) => `${p.x},${p.y}`).join(" ")}
										stroke={textColor}
										strokeWidth={0.5}
									/>
								);
							})}

						{gridLines &&
							data.map((_, i) => {
								const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
								const x2 = centerX + radius * Math.cos(angle);
								const y2 = centerY + radius * Math.sin(angle);

								const lineOpacity = interpolate(frame, [animStart, animStart + 10], [0, 0.3], {
									extrapolateLeft: "clamp",
									extrapolateRight: "clamp",
								});

								return (
									<line
										key={i}
										opacity={lineOpacity}
										stroke={textColor}
										strokeWidth={0.5}
										x1={centerX}
										x2={x2}
										y1={centerY}
										y2={y2}
									/>
								);
							})}

						<path
							d={pathD}
							fill={colors[0]}
							fillOpacity={fillOpacity}
							stroke={colors[0]}
							strokeWidth={lineWidth}
						/>

						{points.map((p, i) => {
							const dotDelay = animStart + 15 + i * 2;
							const dotOpacity = interpolate(frame, [dotDelay, dotDelay + 5], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							});
							const dotScale = interpolate(frame, [dotDelay, dotDelay + 8], [0, 1], {
								easing: Easing.out(Easing.back(1.5)),
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							});

							return (
								<circle
									cx={p.x}
									cy={p.y}
									fill={cardProps.theme === "light" ? "#ffffff" : "#1a1a1a"}
									key={i}
									opacity={dotOpacity}
									r={pointRadius * dotScale}
									stroke={colors[i % colors.length]}
									strokeWidth={2}
								/>
							);
						})}
					</svg>

					<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
						{data.map((item, i) => {
							const legendDelay = animStart + 20 + i * 3;
							const legendOpacity = interpolate(frame, [legendDelay, legendDelay + 8], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							});

							return (
								<div
									key={i}
									style={{
										alignItems: "center",
										display: "flex",
										gap: 8,
										opacity: legendOpacity,
									}}
								>
									<span
										style={{
											color: labelColor,
											fontFamily: "sans-serif",
											fontSize: 14,
											fontWeight: 600,
											minWidth: 40,
											textAlign: "right",
										}}
									>
										{item.value.toLocaleString()}
									</span>
									<div
										style={{
											background: colors[i % colors.length],
											borderRadius: "50%",
											height: 8,
											width: 8,
										}}
									/>
									<span
										style={{
											color: textColor,
											fontFamily: "sans-serif",
											fontSize: 11,
										}}
									>
										{item.label}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</DataCard>
		</AbsoluteFill>
	);
};
