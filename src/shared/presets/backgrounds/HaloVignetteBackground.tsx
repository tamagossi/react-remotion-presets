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

export type HaloVignetteBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  blobCount?: number;
  blobOpacity?: number;
  blobSize?: number;
  blurAmount?: number;
  breatheAmount?: number;
  children?: React.ReactNode;
  colors?: string[];
  driftAmount?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  vignetteStrength?: number;
};

export const HaloVignetteBackground: React.FC<HaloVignetteBackgroundProps> = ({
  animationDuration = 20,
  baseColor = "#0a0212",
  blobCount = 2,
  blobOpacity = 0.7,
  blobSize = 1.8,
  blurAmount = 200,
  breatheAmount = 0.15,
  children,
  colors = ["#c026d3", "#7c3aed"],
  driftAmount = 0.06,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  vignetteStrength = 0.5,
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
    const phase = i * ((Math.PI * 2) / blobCount);
    const size = Math.min(width, height) * blobSize;
    const speed = 1 + i * 0.2;
    const angle = progress * Math.PI * 2 * speed + phase;

    const isLeft = i % 2 === 0;
    const baseX = isLeft ? -size * 0.3 : width - size * 0.7;
    const baseY = height / 2 - size / 2;

    const driftRadius = Math.min(width, height) * driftAmount;
    const x = baseX + Math.cos(angle) * driftRadius;
    const y = baseY + Math.sin(angle * 0.7) * driftRadius;

    const breathe = 1 + Math.sin(angle * 2) * breatheAmount;

    blobs.push({ color, size: size * breathe, x, y });
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
