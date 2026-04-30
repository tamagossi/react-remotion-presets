import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type StackedLineTextProps = {
  animationDuration?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number | number[];
  fontWeight?: number | number[];
  holdDuration?: number;
  letterSpacing?: number;
  lineGap?: number;
  lines: string[];
  staggerDelay?: number;
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const StackedLineText: React.FC<StackedLineTextProps> = ({
  animationDuration = 40,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  lineGap = 16,
  lines = ["FULL SCREEN", "POWERFUL", "TYPOGRAPHY"],
  staggerDelay = 10,
  startFrame = 0,
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

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = frame >= exitStart ? exitT : 1;

  return (
    <div
      style={{
        alignItems: "flex-start",
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

        const y = (1 - entryT) * 50;

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

        const finalY =
          frame >= exitStart + exitLineDelay ? y + (1 - lineExitT) * -30 : y;

        const size = Array.isArray(fontSize)
          ? (fontSize[i] ?? fontSize[fontSize.length - 1])
          : fontSize;
        const weight = Array.isArray(fontWeight)
          ? (fontWeight[i] ?? fontWeight[fontWeight.length - 1])
          : fontWeight;

        return (
          <span
            key={i}
            style={{
              color: textColor,
              display: "inline-block",
              fontFamily,
              fontSize: size,
              fontWeight: weight,
              letterSpacing: `${letterSpacing}em`,
              lineHeight: 1,
              opacity: finalOpacity,
              textTransform,
              transform: `translate3d(0, ${finalY}px, 0)`,
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
