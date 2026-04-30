import React from "react";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { VignetteOverlay } from "../../components/VignetteOverlay";

export type HexagonPatternBackgroundProps = {
  accentColor?: string;
  animationDuration?: number;
  animationSpeed?: number;
  baseColor?: string;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  opacity?: number;
  patternDensity?: number;
  rotationSpeed?: number;
  scaleBreathe?: boolean;
  theme?: "dark" | "light";
  vignetteStrength?: number;
};

const resolveThemeColors = (theme: "dark" | "light") => ({
  accent: theme === "dark" ? "#94a3b8" : "#64748b",
  base: theme === "dark" ? "#020617" : "#f8fafc",
});

export const HexagonPatternBackground: React.FC<
  HexagonPatternBackgroundProps
> = ({
  accentColor,
  animationDuration = 30,
  animationSpeed = 1,
  baseColor,
  children,
  easing: _easing = [0.45, 0, 0.55, 1],
  opacity = 0.35,
  patternDensity = 60,
  rotationSpeed = 10,
  scaleBreathe = true,
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

  const rotation = (progress % 1) * rotationSpeed;
  const scale = scaleBreathe
    ? 1 + Math.sin((progress % 1) * Math.PI * 2) * 0.03
    : 1;

  const r = patternDensity / 2;
  const h = r * Math.sqrt(3);
  const hexPoints = [
    [0, -r],
    [h / 2, -r / 2],
    [h / 2, r / 2],
    [0, r],
    [-h / 2, r / 2],
    [-h / 2, -r / 2],
  ]
    .map(([px, py]) => `${px},${py}`)
    .join(" ");

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
            height={patternDensity * Math.sqrt(3)}
            id="hexagonPattern"
            patternTransform={`rotate(${rotation}) scale(${scale})`}
            patternUnits="userSpaceOnUse"
            width={patternDensity * 1.5}
            x={0}
            y={0}
          >
            <polygon
              fill="none"
              points={hexPoints}
              stroke={resolvedAccentColor}
              strokeWidth={1.5}
            />
          </pattern>
        </defs>
        <rect
          fill="url(#hexagonPattern)"
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
