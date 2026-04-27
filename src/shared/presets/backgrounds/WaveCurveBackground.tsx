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

export type WaveCurveBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  flowSpeed?: number;
  grainAmount?: number;
  grainOpacity?: number;
  reflectedWave?: boolean;
  vignetteStrength?: number;
  waveAccentColor?: string;
  waveAmplitude?: number;
  waveBlur?: number;
  waveColor?: string;
  waveFrequency?: number;
  waveOffsetY?: number;
  waveOpacity?: number;
};

export const WaveCurveBackground: React.FC<WaveCurveBackgroundProps> = ({
  animationDuration = 18,
  baseColor = "#0a0212",
  children,
  easing = [0.45, 0, 0.55, 1],
  flowSpeed = 1,
  grainAmount = 0.3,
  grainOpacity = 0.04,
  reflectedWave = false,
  vignetteStrength = 0.3,
  waveAccentColor = "#f0abfc",
  waveAmplitude = 0.18,
  waveBlur = 30,
  waveColor = "#c026d3",
  waveFrequency = 1.2,
  waveOffsetY = 0.6,
  waveOpacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phase = progress * Math.PI * 2 * flowSpeed;
  const amp = height * waveAmplitude;
  const baseY = height * waveOffsetY;

  const buildPath = (flip = false) => {
    const segments = 40;
    const points: string[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = t * width;
      const y =
        baseY +
        (flip ? -1 : 1) *
          Math.sin(t * Math.PI * 2 * waveFrequency + phase) *
          amp;
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    const firstY = points[0].split(",")[1];
    const lastY = points[points.length - 1].split(",")[1];
    if (flip) {
      return `M -10,-10 L -10,${firstY} L ${points.join(" L ")} L ${width + 10},${lastY} L ${width + 10},-10 Z`;
    }
    return `M -10,${height + 10} L -10,${firstY} L ${points.join(" L ")} L ${width + 10},${lastY} L ${width + 10},${height + 10} Z`;
  };

  const path = buildPath(false);
  const reflectPath = reflectedWave ? buildPath(true) : null;

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <svg
          height={height}
          style={{ filter: `blur(${waveBlur}px)`, opacity: waveOpacity }}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={waveColor} />
              <stop offset="100%" stopColor={waveAccentColor} />
            </linearGradient>
          </defs>
          <path d={path} fill="url(#wave-grad)" />
          {reflectPath && <path d={reflectPath} fill="url(#wave-grad)" opacity={0.4} />}
        </svg>
      </AbsoluteFill>

      <GrainOverlay amount={grainAmount} opacity={grainOpacity} />
      <VignetteOverlay strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
