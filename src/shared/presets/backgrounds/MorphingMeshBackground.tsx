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

export type MorphingMeshBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  blobCount?: number;
  blobOpacity?: number;
  blobSize?: number;
  blobStagger?: number;
  blurAmount?: number;
  children?: React.ReactNode;
  colors?: string[];
  driftAmount?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  morphStiffness?: number;
  vignetteStrength?: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

function lerpColor(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

export const MorphingMeshBackground: React.FC<MorphingMeshBackgroundProps> = ({
  animationDuration = 20,
  baseColor = "#0a0a1a",
  blobCount = 5,
  blobOpacity = 0.5,
  blobSize = 1.2,
  blobStagger = 0.8,
  blurAmount = 120,
  children,
  colors = ["#6366f1", "#8b5cf6", "#d946ef", "#06b6d4", "#f472b6"],
  driftAmount = 0.6,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  morphStiffness = 1.0,
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
    const phase = i * blobStagger;
    const speed = 1 + i * 0.12;
    const t = progress * Math.PI * 2 * speed + phase;

    const radiusX = width * driftAmount * (0.6 + (i % 3) * 0.2);
    const radiusY = height * driftAmount * (0.5 + (i % 2) * 0.25);

    const x =
      width / 2 +
      radiusX * Math.sin(t * 0.7 + phase) -
      (Math.min(width, height) * blobSize) / 2;
    const y =
      height / 2 +
      radiusY * Math.sin(t * 0.9 + phase * 1.3) -
      (Math.min(width, height) * blobSize) / 2;

    const scale = 1 + Math.sin(t * 1.2 + phase) * 0.3 * morphStiffness;
    const size = Math.min(width, height) * blobSize * scale;

    const colorIndex = (i + progress * colors.length) % colors.length;
    const colorA = colors[Math.floor(colorIndex) % colors.length];
    const colorB = colors[Math.ceil(colorIndex) % colors.length];
    const colorT = colorIndex - Math.floor(colorIndex);
    const color = lerpColor(colorA, colorB, colorT);

    blobs.push({ color, size, x, y });
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill
        style={{ mixBlendMode: "soft-light", pointerEvents: "none" }}
      >
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
