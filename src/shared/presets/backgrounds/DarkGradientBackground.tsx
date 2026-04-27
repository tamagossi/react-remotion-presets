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

export type DarkGradientBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  blobCount?: number;
  blobOpacity?: number;
  blobSize?: number;
  blurAmount?: number;
  children?: React.ReactNode;
  colors?: string[];
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  vignetteStrength?: number;
};

export const DarkGradientBackground: React.FC<DarkGradientBackgroundProps> = ({
  animationDuration = 20,
  baseColor = "#020617",
  blobCount = 3,
  blobOpacity = 0.55,
  blobSize = 1.4,
  blurAmount = 140,
  children,
  colors = ["#0f172a", "#1e293b", "#334155"],
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  vignetteStrength = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blobs = [];
  for (let i = 0; i < blobCount; i++) {
    const phase = i * ((Math.PI * 2) / blobCount);
    const color = colors[i % colors.length];
    const speed = 1 + i * 0.15;
    const angle = progress * Math.PI * 2 * speed + phase;
    const radiusX = width * 0.35;
    const radiusY = height * 0.25;
    const size = Math.min(width, height) * blobSize;

    const x = width / 2 + radiusX * Math.cos(angle) - size / 2;
    const y = height / 2 + radiusY * Math.sin(angle * 0.8) - size / 2;

    blobs.push({ color, size, x, y });
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {blobs.map((blob, i) => (
          <div
            key={i}
            style={{
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 90%)`,
              borderRadius: "50%",
              filter: `blur(${blurAmount}px)`,
              height: blob.size,
              left: blob.x,
              opacity: blobOpacity,
              position: "absolute",
              top: blob.y,
              width: blob.size,
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
