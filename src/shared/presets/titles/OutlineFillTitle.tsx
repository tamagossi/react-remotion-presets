import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type OutlineFillTitleProps = {
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fillColor?: string;
  fontFamily?: string;
  fontSize?: number | number[];
  fontStyle?: string;
  fontWeight?: number | number[];
  gap?: number;
  holdDuration?: number;
  lines: string[];
  outlineColor?: string;
  startFrame?: number;
  strokeWidth?: number;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const OutlineFillTitle: React.FC<OutlineFillTitleProps> = ({
  animationDuration = 45,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fillColor = "#f59e0b",
  fontFamily = "Anton",
  fontSize = [96, 96],
  fontStyle = "italic",
  fontWeight = 400,
  gap = 4,
  holdDuration = 30,
  lines = ["FRESH", "GAME"],
  outlineColor = "#f59e0b",
  startFrame = 0,
  strokeWidth = 2,
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const getLineStyle = (index: number) => {
    const lineEntryStart = startFrame + index * 12;
    const lineEntryEnd = lineEntryStart + animationDuration;
    const lineExitStart = lineEntryEnd + holdDuration;
    const lineExitEnd = lineExitStart + exitDuration;

    const entryT = interpolate(
      frame,
      [lineEntryStart, lineEntryEnd],
      [0, 1],
      {
        easing: Easing.bezier(...easing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    const exitT = interpolate(
      frame,
      [lineExitStart, lineExitEnd],
      [1, 0],
      {
        easing: Easing.bezier(...easing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    const opacity = interpolate(
      frame,
      [lineEntryStart, lineEntryStart + animationDuration * 0.5],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    const translateY = (1 - entryT) * 40;

    return {
      opacity: Math.max(Math.min(opacity, exitT), 0),
      transform: `translate3d(0, ${translateY}px, 0)`,
      willChange: "transform, opacity",
    };
  };

  const resolvedFontSize = (index: number) =>
    Array.isArray(fontSize)
      ? (fontSize[index] ?? fontSize[fontSize.length - 1])
      : fontSize;

  const resolvedFontWeight = (index: number) =>
    Array.isArray(fontWeight)
      ? (fontWeight[index] ?? fontWeight[fontWeight.length - 1])
      : fontWeight;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap,
      }}
    >
      {lines.map((text, i) => {
        const isOutline = i === 0;
        const lineStyle = getLineStyle(i);

        return (
          <div
            key={i}
            style={{
              ...lineStyle,
              color: isOutline ? "transparent" : fillColor,
              fontFamily,
              fontSize: resolvedFontSize(i),
              fontStyle,
              fontWeight: resolvedFontWeight(i),
              lineHeight: 1,
              textTransform,
              whiteSpace: "nowrap",
              WebkitTextStroke: isOutline
                ? `${strokeWidth}px ${outlineColor}`
                : "none",
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};
