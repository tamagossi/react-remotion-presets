import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

import { AnimationDirection } from "./TitleAnimationEngine";

export type GlitchStrokeTitleProps = {
  align?: "center" | "left" | "right";
  animationDuration?: number;
  chromaticAberration?: boolean;
  chromaticOffset?: number;
  color?: string | string[];
  easing?: [number, number, number, number];
  entranceDirection?: AnimationDirection;
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number | number[];
  fontWeight?: number | number[];
  gap?: number;
  glitchDecay?: number;
  glitchIntensity?: number;
  holdDuration?: number;
  letterSpacing?: number | number[];
  lines: string[];
  startFrame?: number;
  staggerDelay?: number;
  strokeColor?: string | string[];
  strokeWidth?: number;
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

const GLITCH_LAYERS: { color: string; axis: "x" | "y"; sign: -1 | 1 }[] = [
  { axis: "x", color: "#00f0ff", sign: -1 },
  { axis: "x", color: "#ff0080", sign: 1 },
  { axis: "y", color: "#fff200", sign: 1 },
];

export const GlitchStrokeTitle: React.FC<GlitchStrokeTitleProps> = ({
  align = "center",
  animationDuration = 45,
  chromaticAberration = true,
  chromaticOffset = 24,
  color = "#ffffff",
  easing = [0.16, 1, 0.3, 1],
  entranceDirection = "up",
  exitDuration = 0,
  fontFamily = "Anton",
  fontSize = 96,
  fontWeight = 700,
  gap = 12,
  glitchDecay = 0.4,
  glitchIntensity = 1,
  holdDuration = 0,
  letterSpacing = 0.02,
  lines,
  staggerDelay = 12,
  startFrame = 0,
  strokeColor = "#000000",
  strokeWidth = 2,
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

  const getLineStyle = (index: number): React.CSSProperties => {
    const lineStart = startFrame + index * staggerDelay;
    const lineEnd = lineStart + animationDuration;

    const t = interpolate(frame, [lineStart, lineEnd], [0, 1], {
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

  const getGlitchProgress = (lineStart: number) => {
    const decayEnd = lineStart + animationDuration * glitchDecay;
    const offset = interpolate(
      frame,
      [lineStart, decayEnd],
      [chromaticOffset * glitchIntensity, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    const ghostOpacity = interpolate(frame, [lineStart, decayEnd], [0.9, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { ghostOpacity, offset };
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
        const lineStart = startFrame + i * staggerDelay;
        const wrapperStyle = getLineStyle(i);
        const glitch = chromaticAberration
          ? getGlitchProgress(lineStart)
          : { ghostOpacity: 0, offset: 0 };

        const baseColor = resolvePerLine(color, i, "#ffffff");
        const resolvedFontSize = resolvePerLine(fontSize, i, 96);
        const resolvedFontWeight = resolvePerLine(fontWeight, i, 700);
        const resolvedLetterSpacing = resolvePerLine(letterSpacing, i, 0.02);
        const resolvedStrokeColor = resolvePerLine(strokeColor, i, "#000000");

        const textStyle: React.CSSProperties = {
          color: baseColor,
          fontFamily,
          fontSize: resolvedFontSize,
          fontWeight: resolvedFontWeight,
          letterSpacing: `${resolvedLetterSpacing}em`,
          lineHeight: 1.1,
          textTransform,
          WebkitTextStroke: `${strokeWidth}px ${resolvedStrokeColor}`,
          whiteSpace: "nowrap",
        };

        return (
          <div
            key={i}
            style={{
              ...wrapperStyle,
              position: "relative",
            }}
          >
            {chromaticAberration && glitch.offset > 0.01
              ? GLITCH_LAYERS.map((layer, gi) => {
                  const dx =
                    layer.axis === "x" ? layer.sign * glitch.offset : 0;
                  const dy =
                    layer.axis === "y" ? layer.sign * glitch.offset : 0;
                  return (
                    <div
                      aria-hidden
                      key={gi}
                      style={{
                        ...textStyle,
                        color: layer.color,
                        left: 0,
                        mixBlendMode: "screen",
                        opacity: glitch.ghostOpacity * exitFade,
                        pointerEvents: "none",
                        position: "absolute",
                        top: 0,
                        transform: `translate3d(${dx}px, ${dy}px, 0)`,
                      }}
                    >
                      {text}
                    </div>
                  );
                })
              : null}
            <div style={textStyle}>{text}</div>
          </div>
        );
      })}
    </div>
  );
};
