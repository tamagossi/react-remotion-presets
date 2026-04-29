import React from "react";

import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
} from "remotion";

import { DataCard, type DataCardProps } from "./DataCard";

export type SalesReportCardProps = Omit<
	DataCardProps,
	"children" | "metricValue"
> & {
	areaColor?: string;
	areaOpacity?: number;
	data: number[];
	gridLines?: boolean;
	labels?: string[];
	lineColor?: string;
	lineWidth?: number;
	metricValue?: number;
	showDots?: boolean;
	showGradient?: boolean;
};

export const SalesReportCard: React.FC<SalesReportCardProps> = ({
	areaColor = "#8b5cf6",
	areaOpacity = 0.3,
	data,
	gridLines = true,
	labels: _labels,
	lineColor = "#8b5cf6",
	lineWidth = 2,
	metricValue,
	showDots = true,
	showGradient = true,
	...cardProps
}) => {
	const frame = useCurrentFrame();
	const chartHeight = 180;
	const chartWidth = 460;
	const padding = { bottom: 20, left: 0, right: 0, top: 10 };

	const maxValue = Math.max(...data) * 1.1;
	const minValue = 0;

	const points = data.map((value, i) => {
		const x = padding.left + (i / (data.length - 1)) * (chartWidth - padding.left - padding.right);
		const y =
			padding.top +
			(1 - (value - minValue) / (maxValue - minValue)) *
				(chartHeight - padding.top - padding.bottom);
		return { x, y };
	});

	const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

	const areaPath =
		linePath +
		` L ${points[points.length - 1].x} ${chartHeight - padding.bottom} L ${points[0].x} ${chartHeight - padding.bottom} Z`;

	const drawStart = 20;
	const drawEnd = 50;

	const clipProgress = interpolate(frame, [drawStart, drawEnd], [0, chartWidth], {
		easing: Easing.out(Easing.quad),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const opacityProgress = interpolate(frame, [drawStart + 5, drawEnd], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const gridColor = cardProps.theme === "light" ? "#e5e5e5" : "#333333";

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
				<svg
					height={chartHeight}
					style={{ overflow: "visible" }}
					viewBox={`0 0 ${chartWidth} ${chartHeight}`}
					width="100%"
				>
					<defs>
						{showGradient && (
							<linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor={areaColor} stopOpacity={areaOpacity} />
								<stop offset="100%" stopColor={areaColor} stopOpacity={0} />
							</linearGradient>
						)}
						<clipPath id="areaClip">
							<rect height={chartHeight} width={clipProgress} x={0} y={0} />
						</clipPath>
					</defs>

					{gridLines && (
						<g opacity={0.3}>
							{[0, 0.25, 0.5, 0.75, 1].map((t) => (
								<line
									key={t}
									stroke={gridColor}
									strokeDasharray="4,4"
									strokeWidth={1}
									x1={padding.left}
									x2={chartWidth - padding.right}
									y1={padding.top + t * (chartHeight - padding.top - padding.bottom)}
									y2={padding.top + t * (chartHeight - padding.top - padding.bottom)}
								/>
							))}
						</g>
					)}

					<g clipPath="url(#areaClip)" opacity={opacityProgress}>
						{showGradient && (
							<path d={areaPath} fill="url(#areaGradient)" />
						)}
						<path d={linePath} fill="none" stroke={lineColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={lineWidth} />
					</g>

					{showDots &&
						points.map((p, i) => {
							const dotDelay = drawStart + 10 + i * 2;
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
									r={4 * dotScale}
									stroke={lineColor}
									strokeWidth={2}
								/>
							);
						})}
				</svg>
			</DataCard>
		</AbsoluteFill>
	);
};
