import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

import { AnimationDirection } from "./TitleAnimationEngine";

export type ShadowDepthTitleProps = {
  align?: "center" | "left" | "right";
  animationDuration?: number;
  color?: string | string[];
  easing?: [number, number, number, number];
  entranceDirection?: AnimationDirection;
  fontFamily?: string;
  fontSize?: number | number[];
  fontWeight?: number | number[];
  gap?: number;
  letterSpacing?: number | number[];
  lines: string[];
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  shadowStagger?: number;
  startFrame?: number;
  staggerDelay?: number;
  exitDuration?: number;
  holdDuration?: number;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

function resolvePerLine<T>(
  value: T | T[] | undefined,
  index: number,
  defaultValue: T,
): T {
  if (value === undefined) return defaultValue;
  if (Array.isArray(value)) {
    return value[index] ?? value[value.length - 1] ?? defaultValue;
  }
  return value;
}

export const ShadowDepthTitle: React.FC<ShadowDepthTitleProps> = ({
  align = "center",
  animationDuration = 45,
  color = "#ffffff",
  easing = [0.16, 1, 0.3, 1],
  entranceDirection = "up",
  exitDuration = 0,
  fontFamily = "Anton",
  fontSize = 96,
  fontWeight = 700,
  gap = 12,
  holdDuration = 0,
  letterSpacing = 0.02,
  lines,
  shadowBlur = 0,
  shadowColor = "#000000",
  shadowOffsetX = 4,
  shadowOffsetY = 4,
  shadowOpacity = 0.5,
  shadowStagger = 4,
  staggerDelay = 12,
  startFrame = 0,
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const entryEndGlobal = startFrame + animationDuration;
  const exitStartGlobal = entryEndGlobal + holdDuration;
  const exitFade =
    exitDuration > 0
      ? interpolate(
          frame,
          [exitStartGlobal, exitStartGlobal + exitDuration],
          [1, 0],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        )
      : 1;

  const getLineStyle = (
    index: number,
    isShadow: boolean,
  ): React.CSSProperties => {
    const delay = isShadow ? shadowStagger : 0;
    const lineStart = startFrame + index * staggerDelay + delay;
    const lineEnd = lineStart + animationDuration;

    const t = interpolate(frame, [lineStart, lineEnd], [0, 1], {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const opacity = interpolate(
      frame,
      [lineStart, lineStart + animationDuration * 0.4],
      [0, isShadow ? shadowOpacity : 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    let x = 0;
    let y = 0;
    const dist = (1 - t) * 60;

    switch (entranceDirection) {
      case "down":
        y = -dist;
        break;
      case "left":
        x = dist;
        break;
      case "right":
        x = -dist;
        break;
      case "up":
        y = dist;
        break;
    }

    return {
      opacity: Math.max(opacity * exitFade, 0),
      transform: `translate3d(${x}px, ${y}px, 0)`,
      willChange: "transform, opacity",
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
        alignItems:
          align === "left"
            ? "flex-start"
            : align === "right"
              ? "flex-end"
              : "center",
      }}
    >
      {lines.map((text, i) => {
        const baseColor = resolvePerLine(color, i, "#ffffff");
        const resolvedFontSize = resolvePerLine(fontSize, i, 96);
        const resolvedFontWeight = resolvePerLine(fontWeight, i, 700);
        const resolvedLetterSpacing = resolvePerLine(letterSpacing, i, 0.02);

        const textStyle: React.CSSProperties = {
          color: baseColor,
          fontFamily,
          fontSize: resolvedFontSize,
          fontWeight: resolvedFontWeight,
          letterSpacing: `${resolvedLetterSpacing}em`,
          lineHeight: 1.1,
          textTransform,
          whiteSpace: "nowrap",
        };

        const shadowStyle: React.CSSProperties = {
          ...textStyle,
          color: shadowColor,
          opacity: shadowOpacity,
          position: "absolute",
          transform: `translate3d(${shadowOffsetX}px, ${shadowOffsetY}px, 0)`,
        };

        if (shadowBlur > 0) {
          shadowStyle.filter = `blur(${shadowBlur}px)`;
        }

        return (
          <div
            key={i}
            style={{
              position: "relative",
            }}
          >
            <div style={{ ...shadowStyle, ...getLineStyle(i, true) }}>
              {text}
            </div>
            <div style={{ ...textStyle, ...getLineStyle(i, false) }}>
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
