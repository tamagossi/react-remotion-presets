import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type InlineHighlightTextProps = {
	animationDuration?: number;
	durationInFrames?: number;
	easing?: [number, number, number, number];
	exitDuration?: number;
	fontFamily?: string;
	fontSize?: number;
	fontWeight?: number;
	holdDuration?: number;
	letterSpacing?: number;
	segments: { color?: string; text: string }[];
	startFrame?: number;
	textColor?: string;
	textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const InlineHighlightText: React.FC<InlineHighlightTextProps> = ({
	animationDuration = 40,
	durationInFrames,
	easing = [0.16, 1, 0.3, 1],
	exitDuration = 25,
	fontFamily = "Anton",
	fontSize = 72,
	fontWeight = 400,
	holdDuration = 30,
	letterSpacing = 0.02,
	startFrame = 0,
	textColor = "#ffffff",
	textTransform = "uppercase",
	segments = [
		{ color: "#ef4444", text: "e" },
		{ text: "Patmos" },
	],
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
	const containerY = frame >= exitStart ? (1 - exitT) * 20 : 0;

	const totalChars = segments.reduce((acc, s) => acc + s.text.length, 0);
	const charDelay = animationDuration / Math.max(totalChars, 1);
	let charIndex = 0;

	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				flexDirection: "row",
				opacity: containerOpacity,
				transform: `translate3d(0, ${containerY}px, 0)`,
				willChange: "transform, opacity",
			}}
		>
			{segments.map((segment, si) =>
				segment.text.split("").map((char, ci) => {
					const globalCharIndex = charIndex++;
					const revealFrame = startFrame + globalCharIndex * charDelay;
					const isRevealed = frame >= revealFrame;

					const entryT = interpolate(
						frame,
						[revealFrame, revealFrame + charDelay * 0.8],
						[0, 1],
						{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
					);

					const charExitDelay = Math.min(
						globalCharIndex * 1.5,
						Math.max(0, exitDuration - 1),
					);
					const charExitT = interpolate(
						frame,
						[exitStart + charExitDelay, exitEnd],
						[1, 0],
						{
							easing: Easing.bezier(...easing),
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						},
					);

					const finalOpacity =
						frame >= exitStart + charExitDelay
							? Math.max(entryT * charExitT, 0)
							: isRevealed
								? entryT
								: 0;

					return (
						<span
							key={`${si}-${ci}`}
							style={{
								color: segment.color || textColor,
								display: "inline-block",
								fontFamily,
								fontSize,
								fontWeight,
								letterSpacing: `${letterSpacing}em`,
								lineHeight: 1,
								opacity: finalOpacity,
								textTransform,
								transform: `translate3d(0, ${isRevealed ? 0 : 12}px, 0)`,
								whiteSpace: "pre",
								willChange: "transform, opacity",
							}}
						>
							{char}
						</span>
					);
				}),
			)}
		</div>
	);
};
