import React from "react";

import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

import { useCountUp } from "./useCountUp";

export type DataCardTheme = "dark" | "light";

export type DataCardProps = {
	animationDuration?: number;
	badgeColor?: string;
	badgeText?: string;
	cardBg?: string;
	cardBorderRadius?: number;
	cardPadding?: number;
	children?: React.ReactNode;
	enterEasing?: [number, number, number, number];
	exitDuration?: number;
	holdDuration?: number;
	metricLabel?: string;
	metricPrefix?: string;
	metricSuffix?: string;
	metricValue?: number;
	staggerDelay?: number;
	subtitle?: string;
	theme?: DataCardTheme;
	title?: string;
};

const themeColors = {
	dark: {
		badgeBg: "#22c55e",
		cardBg: "#1a1a1a",
		metricLabel: "#a0a0a0",
		subtitle: "#a0a0a0",
		text: "#ffffff",
	},
	light: {
		badgeBg: "#22c55e",
		cardBg: "#ffffff",
		metricLabel: "#666666",
		subtitle: "#666666",
		text: "#1a1a1a",
	},
};

export const DataCard: React.FC<DataCardProps> = ({
	animationDuration = 30,
	badgeColor = "#22c55e",
	badgeText,
	cardBg,
	cardBorderRadius = 16,
	cardPadding = 24,
	children,
	enterEasing = [0.16, 1, 0.3, 1],
	exitDuration = 20,
	holdDuration: _holdDuration = 60,
	metricLabel,
	metricPrefix = "",
	metricSuffix = "",
	metricValue = 0,
	staggerDelay = 5,
	subtitle,
	theme = "dark",
	title,
}) => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();
	const colors = themeColors[theme];

	const cardOpacity = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const cardScale = interpolate(frame, [0, 15], [0.95, 1], {
		easing: Easing.bezier(enterEasing[0], enterEasing[1], enterEasing[2], enterEasing[3]),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const titleOpacity = interpolate(frame, [staggerDelay, staggerDelay + 10], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const titleY = interpolate(frame, [staggerDelay, staggerDelay + 10], [-8, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const badgeOpacity = interpolate(frame, [staggerDelay + 3, staggerDelay + 10], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const metricOpacity = interpolate(frame, [staggerDelay + 5, staggerDelay + 15], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const metricY = interpolate(frame, [staggerDelay + 5, staggerDelay + 15], [10, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const chartOpacity = interpolate(frame, [staggerDelay + 8, staggerDelay + 18], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const exitStart = durationInFrames - exitDuration;
	const exitOpacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const displayValue = useCountUp(
		frame,
		0,
		metricValue,
		staggerDelay + 5,
		staggerDelay + 5 + animationDuration,
		enterEasing,
	);

	const formattedValue =
		metricValue % 1 === 0
			? Math.round(displayValue).toLocaleString()
			: displayValue.toFixed(2);

	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				display: "flex",
				justifyContent: "center",
				opacity: Math.min(cardOpacity, exitOpacity),
				transform: `scale(${cardScale})`,
			}}
		>
			<div
				style={{
					background: cardBg ?? colors.cardBg,
					borderRadius: cardBorderRadius,
					maxWidth: 520,
					padding: cardPadding,
					width: "100%",
					boxShadow:
						theme === "dark"
							? "0 8px 32px rgba(0,0,0,0.4)"
							: "0 8px 32px rgba(0,0,0,0.1)",
				}}
			>
				<div
					style={{
						alignItems: "flex-start",
						display: "flex",
						justifyContent: "space-between",
						marginBottom: 16,
					}}
				>
					<div
						style={{
							opacity: titleOpacity,
							transform: `translateY(${titleY}px)`,
						}}
					>
						{title && (
							<div
								style={{
									color: colors.text,
									fontFamily: "sans-serif",
									fontSize: 16,
									fontWeight: 600,
									marginBottom: 4,
								}}
							>
								{title}
							</div>
						)}
						{subtitle && (
							<div
								style={{
									color: colors.subtitle,
									fontFamily: "sans-serif",
									fontSize: 12,
								}}
							>
								{subtitle}
							</div>
						)}
					</div>
					{badgeText && (
						<div
							style={{
								background: badgeColor,
								borderRadius: 4,
								color: "#ffffff",
								fontFamily: "sans-serif",
								fontSize: 11,
								fontWeight: 600,
								opacity: badgeOpacity,
								padding: "3px 8px",
							}}
						>
							{badgeText}
						</div>
					)}
				</div>

				{metricValue !== undefined && (
					<div
						style={{
							marginBottom: 16,
							opacity: metricOpacity,
							transform: `translateY(${metricY}px)`,
						}}
					>
						<div
							style={{
								color: colors.text,
								fontFamily: "sans-serif",
								fontSize: 36,
								fontWeight: 700,
							}}
						>
							{metricPrefix}
							{formattedValue}
							{metricSuffix}
						</div>
						{metricLabel && (
							<div
								style={{
									color: colors.metricLabel,
									fontFamily: "sans-serif",
									fontSize: 12,
									marginTop: 2,
								}}
							>
								{metricLabel}
							</div>
						)}
					</div>
				)}

				<div style={{ opacity: chartOpacity }}>{children}</div>
			</div>
		</AbsoluteFill>
	);
};
