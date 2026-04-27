import React from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { GrainOverlay } from "../../components/GrainOverlay";
import { VignetteOverlay } from "../../components/VignetteOverlay";

export type DiagonalSpectrumBackgroundProps = {
  angleEnd?: number;
  angleStart?: number;
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  colors?: string[];
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  spectrumOpacity?: number;
  stopOffsets?: number[];
  vignetteStrength?: number;
};

export const DiagonalSpectrumBackground: React.FC<
  DiagonalSpectrumBackgroundProps
> = ({
  angleEnd = 200,
  angleStart = 135,
  animationDuration = 24,
  baseColor = "#02061a",
  children,
  colors = ["#0072ff", "#00c6a7", "#0072ff"],
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  spectrumOpacity = 1,
  stopOffsets,
  vignetteStrength = 0.2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const angle = interpolate(progress, [0, 1], [angleStart, angleEnd]);

  const offsets =
    stopOffsets && stopOffsets.length === colors.length
      ? stopOffsets
      : colors.map((_, i) =>
          colors.length === 1 ? 0 : i / (colors.length - 1),
        );

  const stops = colors
    .map((c, i) => `${c} ${(offsets[i] * 100).toFixed(2)}%`)
    .join(", ");

  const gradient = `linear-gradient(${angle.toFixed(2)}deg, ${stops})`;

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: gradient,
          opacity: spectrumOpacity,
          pointerEvents: "none",
        }}
      />

      <GrainOverlay amount={grainAmount} opacity={grainOpacity} />
      <VignetteOverlay strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
