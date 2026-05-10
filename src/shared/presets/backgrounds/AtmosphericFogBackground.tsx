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
  bandBlur?: number;
  bandCount?: number;
  bandOpacity?: number;
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
  fogColors?: string[];
  grainAmount?: number;
  grainOpacity?: number;
  startFrame?: number;
  vignetteStrength?: number;
};

export const AtmosphericFogBackground: React.FC<
  AtmosphericFogBackgroundProps
> = ({
  animationDuration = 30,
  bandBlur = 100,
  bandCount = 4,
  bandOpacity = 0.35,
  baseColor = "#0a0a12",
  blobCount = 6,
  blobOpacity = 0.45,
  blobSize = 1.6,
  blurAmount = 120,
  children,
  colors = ["#1e293b", "#334155", "#475569", "#64748b"],
  depthLayers = 0,
  easing = [0.45, 0, 0.55, 1],
  focusLayer = 1,
  focusShiftSpeed = 0.3,
  fogColors = ["#334155", "#475569", "#64748b", "#94a3b8"],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  startFrame = 0,
  vignetteStrength = 0.45,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const adjustedFrame = frame - startFrame * fps;
  const progress = interpolate(
    adjustedFrame,
    [0, animationDuration * fps],
    [0, 1],
    {
      easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  if (depthLayers > 0) {
    const effectiveDepth = Math.max(1, depthLayers);
    const focusShift =
      focusLayer +
      Math.sin(progress * Math.PI * 2 * focusShiftSpeed) * 0.5;

    const allBlobs = [];
    for (let layer = 0; layer < effectiveDepth; layer++) {
      const layerDepth = layer / Math.max(effectiveDepth - 1, 1);
      const distFromFocus = Math.abs(layerDepth - focusShift / effectiveDepth);
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
        const y =
          height / 2 + ry * Math.cos(t * 0.5 + phase * 0.8) - size / 2;

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
                willChange: "left, top, filter, opacity",
              }}
            />
          ))}
        </AbsoluteFill>

        <GrainOverlay amount={grainAmount} opacity={grainOpacity} />
        <VignetteOverlay strength={vignetteStrength} />

        <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
      </AbsoluteFill>
    );
  }

  const bands = [];
  for (let i = 0; i < bandCount; i++) {
    const color = fogColors[i % fogColors.length];
    const phase = i * (Math.PI / bandCount);
    const speed = 0.3 + i * 0.15;
    const yOffset = height * (0.15 + (i / Math.max(bandCount - 1, 1)) * 0.7);

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
              willChange: "left, top, filter, opacity",
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
