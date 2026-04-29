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

export type IconStatGridProps = BaseChartProps & {
	items: {
		color: string;
		icon: string;
		label: string;
		value: number;
	}[];
};

export const IconStatGrid: React.FC<IconStatGridProps> = ({
	animationDuration: _animationDuration = 90,
	backgroundColor = "#0a0a14",
	cardBackgroundColor = "#141420",
	cardBorderRadius = 16,
	cardPadding = 40,
	easing: _easing = [0.16, 1, 0.3, 1],
	fontFamily = "Inter",
	items,
	showCard = true,
	theme: themeOverride,
	title = "Account Statistic",
	titleColor = "#ffffff",
}) => {
	useInter();
	const frame = useCurrentFrame();
	const { durationInFrames, fps, height, width } = useVideoConfig();

	const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

	const chartWidth = width - (showCard ? cardPadding * 2 : 80);
	const gap = chartWidth / (items.length + 1);

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
					fontSize: 24,
					fontWeight: 600,
					marginBottom: 40,
					textAlign: "center",
					opacity: interpolate(frame, [0, 15], [0, 1], {
						extrapolateLeft: "clamp",
					}),
				}}
			>
				{title}
			</div>

			<div
				style={{
					alignItems: "center",
					display: "flex",
					flex: 1,
					justifyContent: "center",
				}}
			>
				{items.map((item, i) => {
					const delay = i * 10;
					const scale = spring({
						config: { damping: 12, mass: 0.5, stiffness: 100 },
						fps,
						frame: Math.max(0, frame - delay),
						from: 0,
						to: 1,
					});

					const counter = interpolate(
						frame,
						[delay + 15, delay + 65],
						[0, item.value],
						{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
					);

					return (
						<div
							key={`item-${i}`}
							style={{
								alignItems: "center",
								display: "flex",
								flexDirection: "column",
								gap: 16,
								width: gap,
							}}
						>
							{/* Icon circle */}
							<div
								style={{
									alignItems: "center",
									border: `2px solid ${theme.cardBorderColor}`,
									borderRadius: "50%",
									display: "flex",
									height: 100,
									justifyContent: "center",
									transform: `scale(${scale})`,
									width: 100,
								}}
							>
								<svg
									height={40}
									viewBox="0 0 40 40"
									width={40}
								>
									{item.icon === "heart" ? (
										<path
											d="M20,35 C20,35 5,25 5,15 C5,10 9,6 14,6 C17,6 19,8 20,10 C21,8 23,6 26,6 C31,6 35,10 35,15 C35,25 20,35 20,35Z"
											fill={item.color}
										/>
									) : item.icon === "user" ? (
										<g>
											<circle
												cx={20}
												cy={14}
												fill={item.color}
												r={8}
											/>
											<path
												d="M8,36 C8,28 14,24 20,24 C26,24 32,28 32,36"
												fill={item.color}
											/>
										</g>
									) : (
										<path
											d="M8,12 C8,8 12,4 20,4 C28,4 32,8 32,12 L32,20 C32,28 26,36 20,38 C14,36 8,28 8,20 Z"
											fill={item.color}
										/>
									)}
								</svg>
							</div>

							{/* Value */}
							<div
								style={{
									color: "#ffffff",
									fontFamily,
									fontSize: 32,
									fontWeight: 700,
								}}
							>
								{`${Math.round(counter)}%`}
							</div>

							{/* Label */}
							<div
								style={{
									color: theme.secondaryTextColor,
									fontFamily,
									fontSize: 13,
								}}
							>
								{item.label}
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
