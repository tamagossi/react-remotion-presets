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

export type FlowWaveBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  flowSpeed?: number;
  grainAmount?: number;
  grainOpacity?: number;
  vignetteStrength?: number;
  waveBlur?: number;
  waveColors?: string[];
  waveCount?: number;
  waveOpacity?: number;
  waveThickness?: number;
};

export const FlowWaveBackground: React.FC<FlowWaveBackgroundProps> = ({
  animationDuration = 18,
  baseColor = "#020617",
  children,
  easing = [0.45, 0, 0.55, 1],
  flowSpeed = 0.6,
  grainAmount = 0.3,
  grainOpacity = 0.04,
  vignetteStrength = 0.3,
  waveBlur = 80,
  waveColors = ["#0e7490", "#1e3a8a", "#0891b2"],
  waveCount = 3,
  waveOpacity = 0.6,
  waveThickness = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const waves = [];
  for (let i = 0; i < waveCount; i++) {
    const color = waveColors[i % waveColors.length];
    const phase = i * (Math.PI / waveCount);
    const speed = 1 + i * 0.4;
    const angle = progress * Math.PI * 2 * speed * flowSpeed + phase;

    const driftX = Math.sin(angle) * width * 0.2;
    const driftY = Math.cos(angle * 0.6) * height * 0.08;
    const rotation = -30 + i * 8;
    const thickness = Math.min(width, height) * waveThickness;
    const baseY =
      height * 0.2 + (i / Math.max(waveCount - 1, 1)) * height * 0.5;
    const baseX = -width * 0.3 + driftX;

    waves.push({ baseX, baseY, color, driftY, rotation, thickness });
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {waves.map((wave, i) => (
          <div
            key={i}
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${wave.color} 30%, ${wave.color} 70%, transparent 100%)`,
              filter: `blur(${waveBlur}px)`,
              height: wave.thickness,
              left: wave.baseX,
              opacity: waveOpacity,
              position: "absolute",
              top: wave.baseY + wave.driftY,
              transform: `rotate(${wave.rotation}deg)`,
              transformOrigin: "center center",
              width: width * 2.5,
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
