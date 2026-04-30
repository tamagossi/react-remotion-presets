import React from "react";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { VignetteOverlay } from "../../components/VignetteOverlay";

export type DiagonalStripePatternBackgroundProps = {
  accentColor?: string;
  animationDuration?: number;
  animationSpeed?: number;
  baseColor?: string;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  opacity?: number;
  patternDensity?: number;
  stripeAngle?: number;
  stripeWidth?: number;
  theme?: "dark" | "light";
  vignetteStrength?: number;
};

const resolveThemeColors = (theme: "dark" | "light") => ({
  accent: theme === "dark" ? "#94a3b8" : "#64748b",
  base: theme === "dark" ? "#020617" : "#f8fafc",
});

export const DiagonalStripePatternBackground: React.FC<
  DiagonalStripePatternBackgroundProps
> = ({
  accentColor,
  animationDuration = 20,
  animationSpeed = 1,
  baseColor,
  children,
  easing: _easing = [0.45, 0, 0.55, 1],
  opacity = 0.3,
  patternDensity = 30,
  stripeAngle = 45,
  stripeWidth = 10,
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

  const angleRad = (stripeAngle * Math.PI) / 180;
  const slideDist = drift * patternDensity;
  const tx = Math.cos(angleRad) * slideDist;
  const ty = Math.sin(angleRad) * slideDist;

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
            height={patternDensity * 2}
            id="diagStripes"
            patternTransform={`translate(${tx}, ${ty})`}
            patternUnits="userSpaceOnUse"
            width={patternDensity * 2}
            x={-patternDensity}
            y={-patternDensity}
          >
            <rect
              fill={resolvedAccentColor}
              height={patternDensity * 2}
              transform={`rotate(${stripeAngle}, ${patternDensity}, ${patternDensity})`}
              width={stripeWidth}
              x={(patternDensity * 2 - stripeWidth) / 2}
              y={0}
            />
          </pattern>
        </defs>
        <rect
          fill="url(#diagStripes)"
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
