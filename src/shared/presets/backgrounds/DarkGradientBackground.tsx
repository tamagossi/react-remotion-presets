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

export type DarkGradientMotionStyle = "circular" | "complex" | "figure8";

export type DarkGradientTheme =
  | "auto"
  | "dark"
  | "light"
  | "monochrome"
  | "sunset"
  | "warm";

export type DarkGradientBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  blobCount?: number;
  blobOpacity?: number;
  blobSize?: number;
  blurAmount?: number;
  children?: React.ReactNode;
  colors?: string[];
  driftComplexity?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  mixBlendMode?: "normal" | "screen" | "soft-light";
  motionStyle?: DarkGradientMotionStyle;
  startFrame?: number;
  theme?: DarkGradientTheme;
  vignetteStrength?: number;
};

const THEME_PRESETS: Record<
  Exclude<DarkGradientTheme, "auto">,
  {
    baseColor: string;
    blobCount: number;
    blobOpacity: number;
    blobSize: number;
    blurAmount: number;
    colors: string[];
    easing: [number, number, number, number];
    grainOpacity: number;
    mixBlendMode: "normal" | "screen" | "soft-light";
    motionStyle: DarkGradientMotionStyle;
    vignetteStrength: number;
  }
> = {
  dark: {
    baseColor: "#020617",
    blobCount: 3,
    blobOpacity: 0.55,
    blobSize: 1.4,
    blurAmount: 140,
    colors: ["#0f172a", "#1e293b", "#334155"],
    easing: [0.45, 0, 0.55, 1],
    grainOpacity: 0.04,
    mixBlendMode: "soft-light",
    motionStyle: "circular",
    vignetteStrength: 0.35,
  },
  light: {
    baseColor: "#f8fafc",
    blobCount: 3,
    blobOpacity: 0.6,
    blobSize: 1.4,
    blurAmount: 160,
    colors: ["#f1f5f9", "#e2e8f0", "#cbd5e1"],
    easing: [0.45, 0, 0.55, 1],
    grainOpacity: 0.03,
    mixBlendMode: "normal",
    motionStyle: "circular",
    vignetteStrength: 0.15,
  },
  monochrome: {
    baseColor: "#1a1a1a",
    blobCount: 2,
    blobOpacity: 0.2,
    blobSize: 1.8,
    blurAmount: 200,
    colors: ["#e0e0e0", "#b0b0b0"],
    easing: [0.25, 0.1, 0.25, 1],
    grainOpacity: 0.02,
    mixBlendMode: "normal",
    motionStyle: "circular",
    vignetteStrength: 0.25,
  },
  sunset: {
    baseColor: "#1a0505",
    blobCount: 3,
    blobOpacity: 0.4,
    blobSize: 1.5,
    blurAmount: 150,
    colors: ["#dc2626", "#ea580c", "#f97316", "#fbbf24"],
    easing: [0.37, 0, 0.63, 1],
    grainOpacity: 0.03,
    mixBlendMode: "screen",
    motionStyle: "figure8",
    vignetteStrength: 0.35,
  },
  warm: {
    baseColor: "#1a0a04",
    blobCount: 2,
    blobOpacity: 0.55,
    blobSize: 2.0,
    blurAmount: 180,
    colors: ["#d97706", "#b45309", "#92400e"],
    easing: [0.45, 0, 0.55, 1],
    grainOpacity: 0.04,
    mixBlendMode: "normal",
    motionStyle: "complex",
    vignetteStrength: 0.3,
  },
};

export const DarkGradientBackground: React.FC<DarkGradientBackgroundProps> = ({
  animationDuration = 20,
  baseColor,
  blobCount,
  blobOpacity,
  blobSize,
  blurAmount,
  children,
  colors,
  driftComplexity,
  easing,
  grainAmount = 0.3,
  grainOpacity,
  mixBlendMode,
  motionStyle,
  startFrame = 0,
  theme = "auto",
  vignetteStrength,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const activeTheme = theme === "auto" ? "dark" : theme;
  const preset = THEME_PRESETS[activeTheme];

  const resolvedBaseColor = baseColor ?? preset.baseColor;
  const resolvedBlobCount = blobCount ?? preset.blobCount;
  const resolvedBlobOpacity = blobOpacity ?? preset.blobOpacity;
  const resolvedBlobSize = blobSize ?? preset.blobSize;
  const resolvedBlurAmount = blurAmount ?? preset.blurAmount;
  const resolvedColors = colors ?? preset.colors;
  const resolvedEasing = easing ?? preset.easing;
  const resolvedGrainOpacity = grainOpacity ?? preset.grainOpacity;
  const resolvedMixBlendMode = mixBlendMode ?? preset.mixBlendMode;
  const resolvedMotionStyle = motionStyle ?? preset.motionStyle;
  const resolvedVignetteStrength = vignetteStrength ?? preset.vignetteStrength;
  const resolvedDriftComplexity = driftComplexity ?? 1.2;

  const adjustedFrame = frame - startFrame * fps;
  const progress = interpolate(
    adjustedFrame,
    [0, animationDuration * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(
        resolvedEasing[0],
        resolvedEasing[1],
        resolvedEasing[2],
        resolvedEasing[3],
      ),
    },
  );

  const blobs = [];
  for (let i = 0; i < resolvedBlobCount; i++) {
    const phase = i * ((Math.PI * 2) / resolvedBlobCount);
    const color = resolvedColors[i % resolvedColors.length];
    const speed = 1 + i * 0.15;
    const t = progress * Math.PI * 2 * speed + phase;
    const baseSize = Math.min(width, height) * resolvedBlobSize;

    let x: number;
    let y: number;
    const size = baseSize;

    if (resolvedMotionStyle === "figure8") {
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      const denom = 1 + sinT * sinT;
      const a = width * 0.35;
      const b = height * 0.25;
      x = width / 2 + (a * cosT) / denom - size / 2;
      y = height / 2 + (b * sinT * cosT) / denom - size / 2;
    } else if (resolvedMotionStyle === "complex") {
      const a = 1 + i * resolvedDriftComplexity;
      const b = 1 + (i + 1) * resolvedDriftComplexity * 0.7;
      const rx = width * 0.5 * 0.5;
      const ry = height * 0.5 * 0.4;
      x = width / 2 + rx * Math.sin(a * t) - size / 2;
      y = height / 2 + ry * Math.sin(b * t) - size / 2;
    } else {
      const radiusX = width * 0.35;
      const radiusY = height * 0.25;
      x = width / 2 + radiusX * Math.cos(t) - size / 2;
      y = height / 2 + radiusY * Math.sin(t * 0.8) - size / 2;
    }

    blobs.push({ color, size, x, y });
  }

  return (
    <AbsoluteFill
      style={{ background: resolvedBaseColor, overflow: "hidden" }}
    >
      <AbsoluteFill
        style={{ mixBlendMode: resolvedMixBlendMode, pointerEvents: "none" }}
      >
        {blobs.map((blob, i) => (
          <div
            key={i}
            style={{
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 90%)`,
              borderRadius: "50%",
              filter: `blur(${resolvedBlurAmount}px)`,
              height: blob.size,
              left: blob.x,
              opacity: resolvedBlobOpacity,
              position: "absolute",
              top: blob.y,
              width: blob.size,
              willChange: "left, top, filter, opacity",
            }}
          />
        ))}
      </AbsoluteFill>

      <GrainOverlay amount={grainAmount} opacity={resolvedGrainOpacity} />
      <VignetteOverlay strength={resolvedVignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
