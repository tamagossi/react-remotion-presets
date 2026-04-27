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

export type RadialSpotlightBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  blurAmount?: number;
  breatheAmount?: number;
  children?: React.ReactNode;
  driftAmount?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  spotlightColor?: string;
  spotlightOpacity?: number;
  spotlightSize?: number;
  spotlightX?: number;
  spotlightY?: number;
  vignetteStrength?: number;
};

export const RadialSpotlightBackground: React.FC<
  RadialSpotlightBackgroundProps
> = ({
  animationDuration = 18,
  baseColor = "#0a1a0e",
  blurAmount = 120,
  breatheAmount = 0.15,
  children,
  driftAmount = 0.08,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  spotlightColor = "#1cc23a",
  spotlightOpacity = 0.7,
  spotlightSize = 1.3,
  spotlightX = 0.5,
  spotlightY = 0.5,
  vignetteStrength = 0.45,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const angle = progress * Math.PI * 2;
  const driftX = Math.cos(angle) * driftAmount * width;
  const driftY = Math.sin(angle * 0.85) * driftAmount * height;

  const breathe = 1 + Math.sin(angle * 1.2) * breatheAmount;
  const baseSize = Math.min(width, height) * spotlightSize * breathe;

  const cx = width * spotlightX + driftX;
  const cy = height * spotlightY + driftY;

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: `blur(${blurAmount}px)`,
            height: baseSize,
            left: cx - baseSize / 2,
            opacity: spotlightOpacity,
            position: "absolute",
            top: cy - baseSize / 2,
            width: baseSize,
          }}
        />
      </AbsoluteFill>

      <GrainOverlay amount={grainAmount} opacity={grainOpacity} />
      <VignetteOverlay strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
