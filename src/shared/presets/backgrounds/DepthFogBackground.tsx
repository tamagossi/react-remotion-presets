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

export type DepthFogBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  blobCount?: number;
  blobOpacity?: number;
  blobSize?: number;
  blurAmount?: number;
  children?: React.ReactNode;
  colors?: string[];
  depthLayers?: number;
  easing?: [number, number, number, number];
  focusLayer?: number;
  focusShiftSpeed?: number;
  grainAmount?: number;
  grainOpacity?: number;
  vignetteStrength?: number;
};

export const DepthFogBackground: React.FC<DepthFogBackgroundProps> = ({
  animationDuration = 30,
  baseColor = "#0a0a14",
  blobCount = 6,
  blobOpacity = 0.45,
  blobSize = 1.6,
  blurAmount = 120,
  children,
  colors = ["#1e293b", "#334155", "#475569", "#64748b"],
  depthLayers = 3,
  easing = [0.45, 0, 0.55, 1],
  focusLayer = 1,
  focusShiftSpeed = 0.3,
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

  const focusShift =
    focusLayer + Math.sin(progress * Math.PI * 2 * focusShiftSpeed) * 0.5;

  const allBlobs = [];
  for (let layer = 0; layer < depthLayers; layer++) {
    const layerDepth = layer / Math.max(depthLayers - 1, 1);
    const distFromFocus = Math.abs(layerDepth - focusShift / depthLayers);
    const focusBlur = blurAmount * (0.5 + distFromFocus * 2);
    const focusOpacity = blobOpacity * (1 - distFromFocus * 0.7);

    for (let i = 0; i < blobCount; i++) {
      const globalIndex = layer * blobCount + i;
      const color = colors[globalIndex % colors.length];
      const phase = globalIndex * 1.2;
      const speed = 0.5 + layer * 0.2 + i * 0.1;
      const t = progress * Math.PI * 2 * speed + phase;

      const rx = width * (0.3 + layer * 0.1);
      const ry = height * (0.25 + layer * 0.08);
      const size =
        Math.min(width, height) * blobSize * (0.8 + layerDepth * 0.4);

      const x = width / 2 + rx * Math.sin(t * 0.6 + phase) - size / 2;
      const y = height / 2 + ry * Math.cos(t * 0.5 + phase * 0.8) - size / 2;

      allBlobs.push({
        blur: focusBlur,
        color,
        opacity: focusOpacity,
        size,
        x,
        y,
      });
    }
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {allBlobs.map((blob, i) => (
          <div
            key={i}
            style={{
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              borderRadius: "50%",
              filter: `blur(${blob.blur}px)`,
              height: blob.size,
              left: blob.x,
              opacity: blob.opacity,
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
