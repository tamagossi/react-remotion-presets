import React from "react";

import {
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

export type LetterSpacingRevealTextProps = {
	animationDuration?: number;
	blurAmount?: number;
	easing?: [number, number, number, number];
	exitDuration?: number;
	fontFamily?: string;
	fontSize?: number;
	fontWeight?: number;
	holdDuration?: number;
	letterSpacing?: number;
	startFrame?: number;
	startLetterSpacing?: number;
	text: string;
	textColor?: string;
	textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const LetterSpacingRevealText: React.FC<
	LetterSpacingRevealTextProps
> = ({
	animationDuration = 50,
	blurAmount = 8,
	easing = [0.22, 1, 0.36, 1],
	exitDuration = 25,
	fontFamily = "Anton",
	fontSize = 72,
	fontWeight = 400,
	holdDuration = 30,
	letterSpacing = 0.02,
	startFrame = 0,
	startLetterSpacing = 0.8,
	text = "CINEMATIC",
	textColor = "#ffffff",
	textTransform = "uppercase",
}) => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	const chars = text.split("");
	const charCount = chars.length;
	const charDelay = animationDuration / Math.max(charCount, 1);

	const exitStart = Math.max(
		startFrame + animationDuration + holdDuration,
		durationInFrames - exitDuration,
	);
	const exitEnd = exitStart + exitDuration;

	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			{chars.map((char, i) => {
				const revealStart = startFrame + i * charDelay;
				const revealEnd = revealStart + charDelay;

				const entryT = interpolate(frame, [revealStart, revealEnd], [0, 1], {
					easing: Easing.bezier(...easing),
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				});

				const currentLetterSpacing = interpolate(
					entryT,
					[0, 1],
					[startLetterSpacing, letterSpacing],
				);

				const currentBlur = interpolate(
					frame,
					[revealStart, revealEnd],
					[blurAmount, 0],
					{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
				);

				const entryOpacity = interpolate(
					frame,
					[revealStart, revealStart + charDelay * 0.5],
					[0, 1],
					{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
				);

				const exitCharDelay = Math.min(
					i * 2,
					Math.max(0, exitDuration - 1),
				);
				const charExitT = interpolate(
					frame,
					[exitStart + exitCharDelay, exitEnd],
					[1, 0],
					{
						easing: Easing.bezier(...easing),
						extrapolateLeft: "clamp",
						extrapolateRight: "clamp",
					},
				);

				const exitLetterSpacing = interpolate(
					charExitT,
					[0, 1],
					[startLetterSpacing, letterSpacing],
				);

				const finalLetterSpacing =
					frame >= exitStart
						? exitLetterSpacing
						: currentLetterSpacing;

				const finalOpacity =
					frame >= exitStart + exitCharDelay
						? Math.max(entryOpacity * charExitT, 0)
						: entryOpacity;

				return (
					<span
						key={i}
						style={{
							color: textColor,
							display: "inline-block",
							filter: `blur(${currentBlur}px)`,
							fontFamily,
							fontSize,
							fontWeight,
							letterSpacing: `${finalLetterSpacing}em`,
							lineHeight: 1,
							opacity: finalOpacity,
							textTransform,
							whiteSpace: "pre",
							willChange: "filter, opacity, letter-spacing",
						}}
					>
						{char}
					</span>
				);
			})}
		</div>
	);
};
