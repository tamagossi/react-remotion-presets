import React from "react";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { VignetteOverlay } from "../../components/VignetteOverlay";

export type ConcentricCirclePatternBackgroundProps = {
  accentColor?: string;
  animationDuration?: number;
  animationSpeed?: number;
  baseColor?: string;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  lineWidth?: number;
  opacity?: number;
  patternDensity?: number;
  ringSpacing?: number;
  theme?: "dark" | "light";
  vignetteStrength?: number;
};

const resolveThemeColors = (theme: "dark" | "light") => ({
  accent: theme === "dark" ? "#94a3b8" : "#64748b",
  base: theme === "dark" ? "#020617" : "#f8fafc",
});

export const ConcentricCirclePatternBackground: React.FC<
  ConcentricCirclePatternBackgroundProps
> = ({
  accentColor,
  animationDuration = 20,
  animationSpeed = 1,
  baseColor,
  children,
  easing: _easing = [0.45, 0, 0.55, 1],
  lineWidth = 1,
  opacity = 0.35,
  patternDensity = 8,
  ringSpacing = 80,
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

  const maxRadius = Math.sqrt(width * width + height * height) / 2;
  const cx = width / 2;
  const cy = height / 2;

  const rings: React.ReactNode[] = [];
  for (let i = 0; i < patternDensity; i++) {
    const baseRadius = (i + 1) * ringSpacing;
    const drift = (progress % 1) * ringSpacing;
    const radius = baseRadius + drift;
    const fadeStart = maxRadius * 0.4;
    const fadeEnd = maxRadius;
    const ringOpacity = interpolate(radius, [fadeStart, fadeEnd], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    if (radius < maxRadius * 1.1) {
      rings.push(
        <circle
          cx={cx}
          cy={cy}
          fill="none"
          key={`ring-${i}`}
          opacity={ringOpacity}
          r={radius}
          stroke={resolvedAccentColor}
          strokeWidth={lineWidth}
        />,
      );
    }
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
        <g opacity={globalOpacity}>{rings}</g>
      </svg>

      <VignetteOverlay color={resolvedBaseColor} strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
