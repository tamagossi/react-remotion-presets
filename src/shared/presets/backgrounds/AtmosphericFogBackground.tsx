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

export type AtmosphericFogBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  bandBlur?: number;
  bandCount?: number;
  bandOpacity?: number;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  fogColors?: string[];
  grainAmount?: number;
  grainOpacity?: number;
  vignetteStrength?: number;
};

export const AtmosphericFogBackground: React.FC<
  AtmosphericFogBackgroundProps
> = ({
  animationDuration = 30,
  baseColor = "#0a0a12",
  bandBlur = 100,
  bandCount = 4,
  bandOpacity = 0.35,
  children,
  easing = [0.45, 0, 0.55, 1],
  fogColors = ["#334155", "#475569", "#64748b", "#94a3b8"],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  vignetteStrength = 0.45,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bands = [];
  for (let i = 0; i < bandCount; i++) {
    const color = fogColors[i % fogColors.length];
    const phase = i * (Math.PI / bandCount);
    const speed = 0.3 + i * 0.15;
    const yOffset =
      height * (0.15 + (i / Math.max(bandCount - 1, 1)) * 0.7);

    const angle = progress * Math.PI * 2 * speed + phase;
    const driftX = Math.sin(angle) * width * 0.15;
    const driftY = Math.cos(angle * 0.6) * height * 0.04;
    const breathe = 1 + Math.sin(angle * 1.5) * 0.2;

    bands.push({
      color,
      driftX,
      driftY,
      height: height * 0.25 * breathe,
      width: width * 2,
      y: yOffset + driftY,
    });
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {bands.map((band, i) => (
          <div
            key={i}
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${band.color} 20%, ${band.color} 80%, transparent 100%)`,
              filter: `blur(${bandBlur}px)`,
              height: band.height,
              left: -width * 0.5 + band.driftX,
              opacity: bandOpacity,
              position: "absolute",
              top: band.y - band.height / 2,
              width: band.width,
            }}
          />
        ))}
      </AbsoluteFill>

      <GrainOverlay amount={grainAmount} opacity={grainOpacity} />
      <VignetteOverlay strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
