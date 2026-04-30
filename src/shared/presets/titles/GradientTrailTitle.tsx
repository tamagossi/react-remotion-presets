import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type GradientTrailTitleProps = {
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number | number[];
  fontStyle?: string;
  fontWeight?: number;
  gap?: number;
  holdDuration?: number;
  lines: string[];
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
  trailColor?: string;
  trailLength?: number;
};

export const GradientTrailTitle: React.FC<GradientTrailTitleProps> = ({
  animationDuration = 45,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = [64, 96],
  fontStyle = "italic",
  fontWeight = 400,
  gap = 8,
  holdDuration = 30,
  lines = ["BRING", "CHANGES"],
  startFrame = 0,
  textColor = "#ffffff",
  textTransform = "uppercase",
  trailColor = "#ec4899",
  trailLength = 3,
}) => {
  const frame = useCurrentFrame();

  const getLineStyle = (index: number) => {
    const lineEntryStart = startFrame + index * 10;
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

    const translateY = (1 - entryT) * 50;

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

  return (
    <div
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap,
      }}
    >
      {lines.map((text, i) => {
        const isTrailLine = i === lines.length - 1 && trailLength > 0;
        const lineStyle = getLineStyle(i);

        if (!isTrailLine) {
          return (
            <div
              key={i}
              style={{
                ...lineStyle,
                color: textColor,
                fontFamily,
                fontSize: resolvedFontSize(i),
                fontStyle,
                fontWeight,
                lineHeight: 1,
                textTransform,
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </div>
          );
        }

        const mainText = text.slice(0, Math.max(0, text.length - trailLength));
        const trailText = text.slice(Math.max(0, text.length - trailLength));

        return (
          <div
            key={i}
            style={{
              ...lineStyle,
              display: "flex",
              flexDirection: "row",
              fontFamily,
              fontSize: resolvedFontSize(i),
              fontStyle,
              fontWeight,
              lineHeight: 1,
              textTransform,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: textColor }}>{mainText}</span>
            <span style={{ color: trailColor }}>{trailText}</span>
          </div>
        );
      })}
    </div>
  );
};
