import React from "react";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { VignetteOverlay } from "../../components/VignetteOverlay";

export type GridDotPatternBackgroundProps = {
  accentColor?: string;
  animationDuration?: number;
  animationSpeed?: number;
  baseColor?: string;
  children?: React.ReactNode;
  dotSize?: number;
  easing?: [number, number, number, number];
  opacity?: number;
  parallaxDepth?: boolean;
  patternDensity?: number;
  theme?: "dark" | "light";
  vignetteStrength?: number;
};

const resolveThemeColors = (theme: "dark" | "light") => ({
  accent: theme === "dark" ? "#94a3b8" : "#64748b",
  base: theme === "dark" ? "#020617" : "#f8fafc",
});

export const GridDotPatternBackground: React.FC<
  GridDotPatternBackgroundProps
> = ({
  accentColor,
  animationDuration = 20,
  animationSpeed = 1,
  baseColor,
  children,
  dotSize = 2,
  easing: _easing = [0.45, 0, 0.55, 1],
  opacity = 0.4,
  parallaxDepth = true,
  patternDensity = 40,
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

  const farOffset = drift * patternDensity * 0.5;
  const nearOffset = drift * patternDensity;

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
        <defs>
          <pattern
            height={patternDensity}
            id="gridDotsFar"
            patternUnits="userSpaceOnUse"
            width={patternDensity}
            x={-farOffset}
            y={-farOffset * 0.6}
          >
            <circle
              cx={patternDensity / 2}
              cy={patternDensity / 2}
              fill={resolvedAccentColor}
              r={dotSize * 0.7}
            />
          </pattern>
          <pattern
            height={patternDensity}
            id="gridDotsNear"
            patternUnits="userSpaceOnUse"
            width={patternDensity}
            x={-nearOffset}
            y={-nearOffset}
          >
            <circle
              cx={patternDensity / 2}
              cy={patternDensity / 2}
              fill={resolvedAccentColor}
              r={dotSize}
            />
          </pattern>
        </defs>
        {parallaxDepth && (
          <rect
            fill="url(#gridDotsFar)"
            height={height}
            opacity={globalOpacity * 0.6}
            width={width}
          />
        )}
        <rect
          fill="url(#gridDotsNear)"
          height={height}
          opacity={globalOpacity}
          width={width}
        />
      </svg>

      <VignetteOverlay color={resolvedBaseColor} strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
