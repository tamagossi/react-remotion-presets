import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type HeavyStackTitleProps = {
  accentColor?: string;
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number | number[];
  fontStyle?: string;
  fontWeight?: number | number[];
  gap?: number;
  holdDuration?: number;
  lines: string[];
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const HeavyStackTitle: React.FC<HeavyStackTitleProps> = ({
  accentColor = "#f59e0b",
  animationDuration = 50,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = [120, 72, 36],
  fontStyle = "italic",
  fontWeight = 400,
  gap = 12,
  holdDuration = 30,
  lines = ["THE", "TITLE IS HEAVY", "FOLLOW THE TYPE"],
  startFrame = 0,
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const getLineStyle = (index: number) => {
    const lineEntryStart = startFrame + index * 12;
    const lineEntryEnd = lineEntryStart + animationDuration;
    const lineExitStart = lineEntryEnd + holdDuration;
    const lineExitEnd = lineExitStart + exitDuration;

    const entryT = interpolate(frame, [lineEntryStart, lineEntryEnd], [0, 1], {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const exitT = interpolate(frame, [lineExitStart, lineExitEnd], [1, 0], {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const opacity = interpolate(
      frame,
      [lineEntryStart, lineEntryStart + animationDuration * 0.4],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    const scale = 1.1 - entryT * 0.1;

    return {
      opacity: Math.max(Math.min(opacity, exitT), 0),
      transform: `scale(${scale}) translate3d(0, ${(1 - entryT) * 30}px, 0)`,
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
        const isAccentLine = i === 1 && lines.length >= 3;
        const lineStyle = getLineStyle(i);

        return (
          <div
            key={i}
            style={{
              ...lineStyle,
              color: isAccentLine ? accentColor : textColor,
              fontFamily,
              fontSize: resolvedFontSize(i),
              fontStyle,
              fontWeight: resolvedFontWeight(i),
              lineHeight: 1,
              textTransform,
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};
