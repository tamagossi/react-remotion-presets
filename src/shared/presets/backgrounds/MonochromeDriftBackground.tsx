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

export type MonochromeDriftBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
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

export const MonochromeDriftBackground: React.FC<
  MonochromeDriftBackgroundProps
> = ({
  animationDuration = 45,
  baseColor = "#1a1a1a",
  blobOpacity = 0.2,
  blobSize = 1.8,
  blurAmount = 200,
  children,
  colors = ["#e0e0e0", "#b0b0b0"],
  easing = [0.25, 0.1, 0.25, 1],
  grainAmount = 0.3,
  grainOpacity = 0.02,
  vignetteStrength = 0.25,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blobs = [];
  for (let i = 0; i < 2; i++) {
    const phase = i * Math.PI;
    const color = colors[i % colors.length];
    const speed = 1 + i * 0.1;
    const t = progress * Math.PI * 2 * speed + phase;

    const radiusX = width * 0.4;
    const radiusY = height * 0.3;
    const size = Math.min(width, height) * blobSize;

    const x = width / 2 + radiusX * Math.cos(t * 0.5) - size / 2;
    const y = height / 2 + radiusY * Math.sin(t * 0.4 + phase) - size / 2;

    blobs.push({ color, size, x, y });
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ mixBlendMode: "normal", pointerEvents: "none" }}>
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
