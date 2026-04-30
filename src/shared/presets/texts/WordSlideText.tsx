import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type WordSlideTextProps = {
  animationDuration?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  slideDistance?: number;
  staggerDelay?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const WordSlideText: React.FC<WordSlideTextProps> = ({
  animationDuration = 40,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  slideDistance = 80,
  staggerDelay = 8,
  startFrame = 0,
  text = "WORDS APPEAR AT THE RIGHT TIME",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const effectiveHoldDuration =
    durationInFrames !== undefined
      ? Math.max(0, durationInFrames - animationDuration - exitDuration)
      : holdDuration;

  const words = text.split(" ");
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
        flexDirection: "row",
        flexWrap: "wrap",
        gap: fontSize * 0.3,
        justifyContent: "center",
        opacity: containerOpacity,
        willChange: "opacity",
      }}
    >
      {words.map((word, i) => {
        const wordStart = startFrame + i * staggerDelay;
        const wordEnd = wordStart + animationDuration;

        const entryT = interpolate(frame, [wordStart, wordEnd], [0, 1], {
          easing: Easing.bezier(...easing),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const opacity = interpolate(
          frame,
          [wordStart, wordStart + animationDuration * 0.4],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const x = (1 - entryT) * -slideDistance;

        const exitWordDelay = Math.min(
          i * staggerDelay,
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
            ? Math.max(opacity * wordExitT, 0)
            : opacity;

        const finalX =
          frame >= exitStart + exitWordDelay
            ? x + (1 - wordExitT) * slideDistance
            : x;

        return (
          <span
            key={i}
            style={{
              color: textColor,
              display: "inline-block",
              fontFamily,
              fontSize,
              fontWeight,
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
