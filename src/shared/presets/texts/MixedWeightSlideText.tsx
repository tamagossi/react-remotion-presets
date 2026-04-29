import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type MixedWeightSlideTextProps = {
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeights?: number[];
  holdDuration?: number;
  letterSpacing?: number;
  slideDirection?: "alternate" | "left" | "right";
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const MixedWeightSlideText: React.FC<MixedWeightSlideTextProps> = ({
  animationDuration = 45,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeights = [400, 700],
  holdDuration = 30,
  letterSpacing = 0.02,
  slideDirection = "alternate",
  startFrame = 0,
  text = "MIXED WEIGHT",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  const exitStart = startFrame + animationDuration + holdDuration;
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
        flexDirection: "row",
        flexWrap: "wrap",
        gap: fontSize * 0.25,
        justifyContent: "center",
        opacity: containerOpacity,
        willChange: "opacity",
      }}
    >
      {words.map((word, i) => {
        const wordStart = startFrame + i * 8;
        const wordEnd = wordStart + animationDuration;

        const entryT = interpolate(frame, [wordStart, wordEnd], [0, 1], {
          easing: Easing.bezier(...easing),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const weight = fontWeights[i % fontWeights.length];

        const slideX =
          slideDirection === "left"
            ? -80 * (1 - entryT)
            : slideDirection === "right"
              ? 80 * (1 - entryT)
              : i % 2 === 0
                ? -80 * (1 - entryT)
                : 80 * (1 - entryT);

        const entryOpacity = interpolate(
          frame,
          [wordStart, wordStart + animationDuration * 0.3],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

			const exitWordDelay = Math.min(
				i * 4,
				Math.max(0, exitDuration - 1),
			);
			const wordExitT = interpolate(
				frame,
				[exitStart + exitWordDelay, exitEnd],
				[1, 0],
				{
					easing: Easing.bezier(...easing),
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				},
			);

        const finalOpacity =
          frame >= exitStart + exitWordDelay
            ? Math.max(entryOpacity * wordExitT, 0)
            : entryOpacity;

        const exitSlideDirection =
          slideDirection === "left" ||
          (slideDirection === "alternate" && i % 2 === 0)
            ? -1
            : 1;

        const finalX =
          frame >= exitStart + exitWordDelay
            ? slideX + exitSlideDirection * 40 * (1 - wordExitT)
            : slideX;

        return (
          <span
            key={i}
            style={{
              color: textColor,
              display: "inline-block",
              fontFamily,
              fontSize,
              fontWeight: weight,
              letterSpacing: `${letterSpacing}em`,
              lineHeight: 1,
              opacity: finalOpacity,
              textTransform,
              transform: `translate3d(${finalX}px, 0, 0)`,
              whiteSpace: "nowrap",
              willChange: "transform, opacity",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
