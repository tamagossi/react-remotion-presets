import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type DiagonalSpectrumBackgroundProps = {
  colors?: string[];
  baseColor?: string;
  angleStart?: number;
  angleEnd?: number;
  stopOffsets?: number[];
  spectrumOpacity?: number;
  animationDuration?: number;
  easing?: [number, number, number, number];
  grainOpacity?: number;
  grainAmount?: number;
  children?: React.ReactNode;
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

  const grainPattern = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: gradient,
          opacity: spectrumOpacity,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          backgroundImage: grainPattern,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: grainOpacity * grainAmount,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
