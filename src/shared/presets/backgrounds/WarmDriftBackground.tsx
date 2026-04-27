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

export type WarmDriftBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  blobCount?: number;
  blobOpacity?: number;
  blobSize?: number;
  blurAmount?: number;
  children?: React.ReactNode;
  colors?: string[];
  driftAmount?: number;
  driftComplexity?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  vignetteStrength?: number;
};

export const WarmDriftBackground: React.FC<WarmDriftBackgroundProps> = ({
  animationDuration = 30,
  baseColor = "#1a0a04",
  blobCount = 2,
  blobOpacity = 0.55,
  blobSize = 2.0,
  blurAmount = 180,
  children,
  colors = ["#d97706", "#b45309", "#92400e"],
  driftAmount = 0.5,
  driftComplexity = 1.2,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  vignetteStrength = 0.3,
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
    const color = colors[i % colors.length];
    const speed = 1 + i * 0.25;
    const angle = progress * Math.PI * 2 * speed;

    const a = 1 + i * driftComplexity;
    const b = 1 + (i + 1) * driftComplexity * 0.7;

    const rx = width * driftAmount * 0.5;
    const ry = height * driftAmount * 0.4;
    const size = Math.min(width, height) * blobSize;

    const x = width / 2 + rx * Math.sin(a * angle) - size / 2;
    const y = height / 2 + ry * Math.sin(b * angle) - size / 2;

    blobs.push({ color, size, x, y });
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {blobs.map((blob, i) => (
          <div
            key={i}
            style={{
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
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
