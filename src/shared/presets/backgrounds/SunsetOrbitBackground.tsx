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

export type SunsetOrbitBackgroundProps = {
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

export const SunsetOrbitBackground: React.FC<SunsetOrbitBackgroundProps> = ({
  animationDuration = 25,
  baseColor = "#1a0505",
  blobCount = 3,
  blobOpacity = 0.4,
  blobSize = 1.5,
  blurAmount = 150,
  children,
  colors = ["#dc2626", "#ea580c", "#f97316", "#fbbf24"],
  easing = [0.37, 0, 0.63, 1],
  grainAmount = 0.3,
  grainOpacity = 0.03,
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
    const t = progress * Math.PI * 2 * speed + phase;

    const a = width * 0.35;
    const b = height * 0.25;
    const size = Math.min(width, height) * blobSize;

    // Figure-8 / lemniscate motion
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    const denom = 1 + sinT * sinT;

    const x = width / 2 + (a * cosT) / denom - size / 2;
    const y = height / 2 + (b * sinT * cosT) / denom - size / 2;

    blobs.push({ color, size, x, y });
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
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
