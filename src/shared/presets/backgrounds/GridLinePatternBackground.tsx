import React from "react";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { VignetteOverlay } from "../../components/VignetteOverlay";

export type GridLinePatternBackgroundProps = {
  accentColor?: string;
  animationDuration?: number;
  animationSpeed?: number;
  baseColor?: string;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  lineWidth?: number;
  opacity?: number;
  patternDensity?: number;
  theme?: "dark" | "light";
  vignetteStrength?: number;
};

const resolveThemeColors = (theme: "dark" | "light") => ({
  accent: theme === "dark" ? "#94a3b8" : "#64748b",
  base: theme === "dark" ? "#020617" : "#f8fafc",
});

export const GridLinePatternBackground: React.FC<
  GridLinePatternBackgroundProps
> = ({
  accentColor,
  animationDuration = 20,
  animationSpeed = 1,
  baseColor,
  children,
  easing: _easing = [0.45, 0, 0.55, 1],
  lineWidth = 1,
  opacity = 0.3,
  patternDensity = 50,
  theme = "dark",
  vignetteStrength = 0.25,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const colors = resolveThemeColors(theme);
  const resolvedBaseColor = baseColor ?? colors.base;
  const resolvedAccentColor = accentColor ?? colors.accent;

  const cycle = (animationDuration * fps) / Math.max(animationSpeed, 0.001);
  const progress = frame / cycle;
  const drift = progress % 1;

  const entrance = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const globalOpacity = Math.min(entrance, exit) * opacity;

  const offsetX = drift * patternDensity * 0.3;
  const offsetY = drift * patternDensity;

  const lineCount = Math.max(
    1,
    Math.ceil(Math.max(width, height) / patternDensity) + 2,
  );

  const hLines = [];
  const vLines = [];
  for (let i = -1; i <= lineCount; i++) {
    const y = ((i * height) / lineCount + offsetY) % height;
    hLines.push(
      <line
        key={`hl-${i}`}
        stroke={resolvedAccentColor}
        strokeWidth={lineWidth}
        x1={0}
        x2={width}
        y1={y}
        y2={y}
      />,
    );
    const x = ((i * width) / lineCount + offsetX) % width;
    vLines.push(
      <line
        key={`vl-${i}`}
        stroke={resolvedAccentColor}
        strokeWidth={lineWidth}
        x1={x}
        x2={x}
        y1={0}
        y2={height}
      />,
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: resolvedBaseColor,
        overflow: "hidden",
      }}
    >
      <svg
        height={height}
        style={{ left: 0, position: "absolute", top: 0 }}
        width={width}
      >
        <g opacity={globalOpacity}>
          {vLines}
          {hLines}
        </g>
      </svg>

      <VignetteOverlay color={resolvedBaseColor} strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
