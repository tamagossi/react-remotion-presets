import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type SingleWordZoomTextProps = {
	animationDuration?: number;
	durationInFrames?: number;
	easing?: [number, number, number, number];
	exitDuration?: number;
	fontFamily?: string;
	fontSize?: number;
	fontWeight?: number;
	holdDuration?: number;
	letterSpacing?: number;
	overshoot?: number;
	scaleStart?: number;
	startFrame?: number;
	text: string;
	textColor?: string;
	textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const SingleWordZoomText: React.FC<SingleWordZoomTextProps> = ({
	animationDuration = 40,
	durationInFrames,
	easing = [0.16, 1, 0.3, 1],
	exitDuration = 25,
	fontFamily = "Anton",
	fontSize = 120,
	fontWeight = 700,
	holdDuration = 30,
	letterSpacing = 0.02,
	overshoot = 1.15,
	scaleStart = 0.3,
	startFrame = 0,
	text = "WORDS",
	textColor = "#ffffff",
	textTransform = "uppercase",
}) => {
	const frame = useCurrentFrame();

	const effectiveHoldDuration =
		durationInFrames !== undefined
			? Math.max(0, durationInFrames - animationDuration - exitDuration)
			: holdDuration;

	const exitStart = startFrame + animationDuration + effectiveHoldDuration;
	const exitEnd = exitStart + exitDuration;

	const entryT = interpolate(
		frame,
		[startFrame, startFrame + animationDuration],
		[0, 1],
		{
			easing: Easing.bezier(...easing),
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		},
	);

	const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
		easing: Easing.bezier(...easing),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const scale = interpolate(entryT, [0, 0.7, 1], [scaleStart, overshoot, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const opacity = Math.min(entryT, exitT);
	const finalScale = frame >= exitStart ? scale * exitT : scale;

	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<span
				style={{
					color: textColor,
					display: "inline-block",
					fontFamily,
					fontSize,
					fontWeight,
					letterSpacing: `${letterSpacing}em`,
					lineHeight: 1,
					opacity,
					textTransform,
					transform: `scale(${finalScale})`,
					whiteSpace: "pre",
					willChange: "transform, opacity",
				}}
			>
				{text}
			</span>
		</div>
	);
};
