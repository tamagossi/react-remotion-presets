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
	DataPoint,
	defaultDarkTheme,
	ChartTheme,
} from "./types";
import {
	formatNumber,
	useAnimatedCounter,
	usePathDrawOn,
	useStaggeredReveal,
} from "./utils/animations";

export type AnimatedLineChartProps = BaseChartProps & {
	data: DataPoint[];
	dotLabels?: boolean;
	dotStagger?: number;
	lineColor?: string;
	suffix?: string;
	totalLabel?: string;
	totalPrefix?: string;
	valueFormatter?: (_value: number) => string;
};

export const AnimatedLineChart: React.FC<AnimatedLineChartProps> = ({
	animationDuration = 90,
	backgroundColor = "#0a0a14",
	cardBackgroundColor = "#141420",
	cardBorderRadius = 16,
	cardPadding = 40,
	data,
	dotLabels: _dotLabels = true,
	dotStagger = 6,
	easing: _easing = [0.16, 1, 0.3, 1],
	fontFamily = "Inter",
	lineColor = "#d4c44a",
	showCard = true,
	suffix = "",
	theme: themeOverride,
	title = "YOUR SALES HISTORY / AUTO CHECK",
	titleColor = "#ffffff",
	totalLabel = "TOTAL SALES FOR THE YEAR",
	totalPrefix = "$",
	valueFormatter = (_v) => `$${_v}`,
}) => {
	useInter();
	const frame = useCurrentFrame();
	const { durationInFrames, height, width } = useVideoConfig();

	const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

	const chartWidth = width - (showCard ? cardPadding * 2 : 80);
	const chartHeight = height - (showCard ? cardPadding * 2 : 80) - 120;
	const padding = { bottom: 50, left: 20, right: 20, top: 60 };
	const drawWidth = chartWidth - padding.left - padding.right;
	const drawHeight = chartHeight - padding.top - padding.bottom;

	const maxValue = useMemo(
		() => Math.max(...data.map((d) => d.value)) * 1.2,
		[data],
	);
	const totalValue = useMemo(
		() => data.reduce((sum, d) => sum + d.value, 0),
		[data],
	);

	const pathProgress = usePathDrawOn({
		duration: animationDuration,
	});

	const dotProgress = useStaggeredReveal({
		baseDelay: animationDuration * 0.4,
		count: data.length,
		itemDuration: 20,
		stagger: dotStagger,
	});

	const totalCounter = useAnimatedCounter({
		delay: animationDuration * 0.6,
		duration: 40,
		end: totalValue,
	});

	const points = useMemo(() => {
		return data.map((d, i) => {
			const x = padding.left + (i / (data.length - 1)) * drawWidth;
			const y = padding.top + drawHeight - (d.value / maxValue) * drawHeight;
			return { ...d, x, y };
		});
	}, [data, drawHeight, drawWidth, maxValue, padding.left, padding.top]);

	const pathD = useMemo(() => {
		if (points.length === 0) return "";
		const segments = points.map((p, i) => {
			if (i === 0) return `M ${p.x} ${p.y}`;
			const prev = points[i - 1];
			const cpx1 = prev.x + (p.x - prev.x) * 0.4;
			const cpx2 = prev.x + (p.x - prev.x) * 0.6;
			return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
		});
		return segments.join(" ");
	}, [points]);

	const pathLength = useMemo(() => {
		if (typeof document === "undefined" || points.length === 0) return 1000;
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", pathD);
		svg.appendChild(path);
		return path.getTotalLength();
	}, [pathD, points.length]);

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
					fontSize: 14,
					fontWeight: 600,
					letterSpacing: "0.05em",
					marginBottom: 24,
					textTransform: "uppercase",
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
				{/* Grid lines */}
				{[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
					const y = padding.top + drawHeight * ratio;
					return (
						<line
							key={`grid-${i}`}
							opacity={0.15}
							stroke={theme.gridColor}
							strokeWidth={1}
							x1={padding.left}
							x2={padding.left + drawWidth}
							y1={y}
							y2={y}
						/>
					);
				})}

				{/* X axis labels */}
				{points.map((p, i) => (
					<text
						fill={theme.secondaryTextColor}
						fontFamily={fontFamily}
						fontSize={11}
						fontWeight={500}
						key={`label-${i}`}
						textAnchor="middle"
						x={p.x}
						y={chartHeight - 12}
					>
						{p.label}
					</text>
				))}

				{/* Dashed vertical lines from dots to axis */}
				{points.map((p, i) => {
					const progress = dotProgress[i];
					if (p.value <= 0) return null;
					return (
						<g key={`line-${i}`} opacity={progress}>
							<line
								stroke={lineColor}
								strokeDasharray="3,3"
								strokeWidth={1}
								x1={p.x}
								x2={p.x}
								y1={p.y}
								y2={chartHeight - 30}
							/>
							<text
								fill={lineColor}
								fontFamily={fontFamily}
								fontSize={11}
								textAnchor="middle"
								x={p.x}
								y={chartHeight - 36}
							>
								{valueFormatter(p.value)}
							</text>
						</g>
					);
				})}

				{/* Line path */}
				<path
					d={pathD}
					fill="none"
					stroke={lineColor}
					strokeDasharray={pathLength}
					strokeDashoffset={pathLength * (1 - pathProgress)}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
				/>

				{/* Data points */}
				{points.map((p, i) => {
					const progress = dotProgress[i];
					const scale = interpolate(progress, [0, 1], [0, 1], {
						extrapolateLeft: "clamp",
					});
					return (
						<circle
							cx={p.x}
							cy={p.y}
							fill={backgroundColor}
							key={`dot-${i}`}
							r={5 * scale}
							stroke={lineColor}
							strokeWidth={2}
							style={{ opacity: progress }}
						/>
					);
				})}
			</svg>

			{/* Total counter */}
			<div
				style={{
					alignItems: "baseline",
					display: "flex",
					gap: 12,
					marginTop: 16,
					opacity: interpolate(
						frame,
						[animationDuration * 0.6, animationDuration * 0.6 + 20],
						[0, 1],
						{ extrapolateLeft: "clamp" },
					),
				}}
			>
				<span
					style={{
						color: "#ffffff",
						fontFamily,
						fontSize: 42,
						fontWeight: 700,
					}}
				>
					{formatNumber(Math.round(totalCounter), totalPrefix, suffix)}
				</span>
				<span
					style={{
						color: theme.secondaryTextColor,
						fontFamily,
						fontSize: 14,
						fontWeight: 500,
						letterSpacing: "0.05em",
						textTransform: "uppercase",
					}}
				>
					{totalLabel}
				</span>
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
