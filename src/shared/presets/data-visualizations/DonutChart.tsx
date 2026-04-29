import React from "react";

import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

export type DonutChartProps = {
	animationDuration?: number;
	backgroundColor?: string;
	badgeColor?: string;
	badgeRadius?: number;
	data: Array<{
		color: string;
		label: string;
		value: number;
	}>;
	donutRadius?: number;
	donutWidth?: number;
	easing?: [number, number, number, number];
	exitDuration?: number;
	holdDuration?: number;
	labelColor?: string;
	showPercentages?: boolean;
	staggerDelay?: number;
	subtitle?: string;
	subtitleColor?: string;
	textColor?: string;
	title?: string;
	titleColor?: string;
};

export const DonutChart: React.FC<DonutChartProps> = ({
	animationDuration = 45,
	backgroundColor = "#0f1115",
	badgeColor = "#374151",
	badgeRadius = 6,
	data,
	donutRadius = 140,
	donutWidth = 40,
	easing: _easing = [0.16, 1, 0.3, 1],
	exitDuration = 25,
	holdDuration = 60,
	labelColor: _labelColor = "#9ca3af",
	showPercentages = true,
	staggerDelay = 8,
	subtitle = "",
	subtitleColor = "#6b7280",
	textColor = "#ffffff",
	title = "",
	titleColor = "#ffffff",
}) => {
	const frame = useCurrentFrame();
	const { durationInFrames: _durationInFrames, height, width } = useVideoConfig();

	const centerX = width / 2;
	const centerY = height / 2 - 10;
	const outerRadius = donutRadius;
	const innerRadius = donutRadius - donutWidth;

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

	const totalValue = data.reduce((sum, d) => sum + d.value, 0);

	// Build segments
	let currentAngle = -Math.PI / 2;
	const segments = data.map((d, _i) => {
		const angle = (d.value / totalValue) * Math.PI * 2;
		const startAngle = currentAngle;
		const endAngle = currentAngle + angle;
		currentAngle = endAngle;
		return { ...d, endAngle, startAngle };
	});

	// SVG path for donut segment
	const describeArc = (
		x: number,
		y: number,
		rInner: number,
		rOuter: number,
		startAngle: number,
		endAngle: number,
	) => {
		const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

		const x1 = x + rOuter * Math.cos(startAngle);
		const y1 = y + rOuter * Math.sin(startAngle);
		const x2 = x + rOuter * Math.cos(endAngle);
		const y2 = y + rOuter * Math.sin(endAngle);

		const x3 = x + rInner * Math.cos(endAngle);
		const y3 = y + rInner * Math.sin(endAngle);
		const x4 = x + rInner * Math.cos(startAngle);
		const y4 = y + rInner * Math.sin(startAngle);

		return [
			`M ${x1} ${y1}`,
			`A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
			`L ${x3} ${y3}`,
			`A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
			`Z`,
		].join(" ");
	};

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
						fontSize: 28,
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

			{/* Donut SVG */}
			<svg
				height={height}
				style={{ left: 0, position: "absolute", top: 0 }}
				width={width}
			>
				{segments.map((seg, i) => {
					const delay = i * staggerDelay;
					const segProgress = interpolate(
						frame,
						[15 + delay, 35 + delay],
						[0, 1],
						{
							easing: Easing.out(Easing.quad),
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						},
					);

					const currentEndAngle =
						seg.startAngle +
						(seg.endAngle - seg.startAngle) * segProgress;

					return (
						<path
							fill={seg.color}
							key={i}
							opacity={exitProgress}
							stroke="none"
							d={describeArc(
								centerX,
								centerY,
								innerRadius,
								outerRadius,
								seg.startAngle,
								currentEndAngle,
							)}
						/>
					);
				})}
			</svg>

			{/* Percentage badges */}
			{showPercentages && (
				<div
					style={{
						display: "flex",
						gap: 16,
						justifyContent: "center",
						left: 0,
						position: "absolute",
						top: centerY + outerRadius + 30,
						width: "100%",
					}}
				>
					{segments.map((seg, i) => {
						const percentage = Math.round((seg.value / totalValue) * 100);
						const delay = animationDuration + 10 + i * staggerDelay;
						const badgeOpacity = interpolate(
							frame,
							[delay, delay + 12],
							[0, 1],
							{
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							},
						);

						return (
							<div
								key={i}
								style={{
									alignItems: "center",
									backgroundColor: badgeColor,
									borderRadius: badgeRadius,
									color: textColor,
									display: "flex",
									fontSize: 12,
									fontWeight: 600,
									gap: 6,
									opacity: badgeOpacity * exitProgress,
									padding: "6px 12px",
								}}
							>
								<div
									style={{
										backgroundColor: seg.color,
										borderRadius: "50%",
										height: 8,
										width: 8,
									}}
								/>
								{percentage}%
							</div>
						);
					})}
				</div>
			)}
		</AbsoluteFill>
	);
};
