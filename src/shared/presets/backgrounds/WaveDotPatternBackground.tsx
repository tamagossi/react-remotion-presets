import React from "react";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { VignetteOverlay } from "../../components/VignetteOverlay";

export type WaveDotPatternBackgroundProps = {
  accentColor?: string;
  amplitude?: number;
  animationDuration?: number;
  animationSpeed?: number;
  baseColor?: string;
  children?: React.ReactNode;
  dotSize?: number;
  easing?: [number, number, number, number];
  frequency?: number;
  opacity?: number;
  patternDensity?: number;
  theme?: "dark" | "light";
  vignetteStrength?: number;
  waveDirection?: "horizontal" | "vertical";
};

const resolveThemeColors = (theme: "dark" | "light") => ({
  accent: theme === "dark" ? "#94a3b8" : "#64748b",
  base: theme === "dark" ? "#020617" : "#f8fafc",
});

export const WaveDotPatternBackground: React.FC<
  WaveDotPatternBackgroundProps
> = ({
  accentColor,
  amplitude = 20,
  animationDuration = 20,
  animationSpeed = 1,
  baseColor,
  children,
  dotSize = 2.5,
  easing: _easing = [0.45, 0, 0.55, 1],
  frequency = 0.3,
  opacity = 0.4,
  patternDensity = 40,
  theme = "dark",
  vignetteStrength = 0.25,
  waveDirection = "horizontal",
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

  const cols = Math.ceil(width / patternDensity) + 2;
  const rows = Math.ceil(height / patternDensity) + 2;

  const dots: React.ReactNode[] = [];

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const baseX = c * patternDensity + patternDensity / 2;
      const baseY = r * patternDensity + patternDensity / 2;

      const index = waveDirection === "horizontal" ? r : c;
      const wave = Math.sin(index * frequency + (progress % 1) * Math.PI * 2);
      const offset = wave * amplitude;

      const cx = waveDirection === "horizontal" ? baseX + offset : baseX;
      const cy = waveDirection === "vertical" ? baseY + offset : baseY;

      dots.push(
        <circle
          cx={cx}
          cy={cy}
          fill={resolvedAccentColor}
          key={`${r}-${c}`}
          r={dotSize}
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
        <g opacity={globalOpacity}>{dots}</g>
      </svg>

      <VignetteOverlay color={resolvedBaseColor} strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
