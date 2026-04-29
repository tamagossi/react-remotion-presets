import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type ColorStackTextProps = {
	animationDuration?: number;
	durationInFrames?: number;
	easing?: [number, number, number, number];
	exitDuration?: number;
	fontFamily?: string;
	fontSize?: number | number[];
	fontWeight?: number | number[];
	holdDuration?: number;
	letterSpacing?: number;
	lineColors?: string[];
	lineGap?: number;
	lines: string[];
	staggerDelay?: number;
	startFrame?: number;
	textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const ColorStackText: React.FC<ColorStackTextProps> = ({
	animationDuration = 45,
	durationInFrames,
	easing = [0.16, 1, 0.3, 1],
	exitDuration = 25,
	fontFamily = "Anton",
	fontSize = 96,
	fontWeight = 700,
	holdDuration = 30,
	letterSpacing = 0.02,
	lineColors = ["#ef4444", "#ef4444", "#ffffff"],
	lineGap = 12,
	lines = ["TRUE", "POWER OF", "WORDS"],
	staggerDelay = 12,
	startFrame = 0,
	textTransform = "uppercase",
}) => {
	const frame = useCurrentFrame();

	const effectiveHoldDuration =
		durationInFrames !== undefined
			? Math.max(0, durationInFrames - animationDuration - exitDuration)
			: holdDuration;

	const exitStart = startFrame + animationDuration + effectiveHoldDuration;
	const exitEnd = exitStart + exitDuration;

	const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
		easing: Easing.bezier(...easing),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const containerOpacity = frame >= exitStart ? exitT : 1;

	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				gap: lineGap,
				opacity: containerOpacity,
				willChange: "opacity",
			}}
		>
			{lines.map((line, i) => {
				const lineStart = startFrame + i * staggerDelay;
				const lineEnd = lineStart + animationDuration;

				const entryT = interpolate(frame, [lineStart, lineEnd], [0, 1], {
					easing: Easing.bezier(...easing),
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				});

				const opacity = interpolate(
					frame,
					[lineStart, lineStart + animationDuration * 0.4],
					[0, 1],
					{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
				);

				const overshoot = 1.1;
				const scale =
					entryT < 1
						? interpolate(entryT, [0, 0.7, 1], [0.5, overshoot, 1], {
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						})
						: 1;

			const exitLineDelay = Math.min(
				i * staggerDelay,
				Math.max(0, exitDuration - 1),
			);
			const lineExitT = interpolate(
				frame,
				[exitStart + exitLineDelay, exitEnd],
				[1, 0],
				{
					easing: Easing.bezier(...easing),
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				},
			);

				const finalOpacity =
					frame >= exitStart + exitLineDelay
						? Math.max(opacity * lineExitT, 0)
						: opacity;

				const finalScale =
					frame >= exitStart + exitLineDelay ? scale * lineExitT : scale;

				const size = Array.isArray(fontSize)
					? fontSize[i] ?? fontSize[fontSize.length - 1]
					: fontSize;
				const weight = Array.isArray(fontWeight)
					? fontWeight[i] ?? fontWeight[fontWeight.length - 1]
					: fontWeight;
				const color = lineColors[i] ?? lineColors[lineColors.length - 1];

				return (
					<span
						key={i}
						style={{
							color,
							display: "inline-block",
							fontFamily,
							fontSize: size,
							fontWeight: weight,
							letterSpacing: `${letterSpacing}em`,
							lineHeight: 1,
							opacity: finalOpacity,
							textTransform,
							transform: `scale(${finalScale})`,
							whiteSpace: "nowrap",
							willChange: "transform, opacity",
						}}
					>
						{line}
					</span>
				);
			})}
		</div>
	);
};
