import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { GrainOverlay } from "../../components/GrainOverlay";
import { VignetteOverlay } from "../../components/VignetteOverlay";

export type BokehLightsBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  blurAmount?: number;
  bokehColors?: string[];
  bokehCount?: number;
  bokehOpacity?: number;
  children?: React.ReactNode;
  driftAmount?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  hexShape?: boolean;
  lightSize?: number;
  vignetteStrength?: number;
};

interface BokehLight {
  color: string;
  depth: number;
  phase: number;
  size: number;
  speed: number;
  x: number;
  y: number;
}

export const BokehLightsBackground: React.FC<BokehLightsBackgroundProps> = ({
  animationDuration = 25,
  baseColor = "#0a0a14",
  blurAmount = 60,
  bokehColors = ["#f472b6", "#a78bfa", "#60a5fa", "#fbbf24", "#34d399"],
  bokehCount = 18,
  bokehOpacity = 0.55,
  children,
  driftAmount = 0.4,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.03,
  hexShape = false,
  lightSize = 1.0,
  vignetteStrength = 0.4,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lights = useMemo<BokehLight[]>(() => {
    const result: BokehLight[] = [];
    for (let i = 0; i < bokehCount; i++) {
      const seed = i * 97.3;
      result.push({
        color: bokehColors[i % bokehColors.length],
        depth: 0.3 + (Math.sin(seed * 2.1) * 0.5 + 0.5) * 0.7,
        phase: seed,
        size: 40 + (Math.sin(seed * 3.7) * 0.5 + 0.5) * 120,
        speed: 0.2 + (Math.sin(seed * 5.3) * 0.5 + 0.5) * 0.8,
        x: (Math.sin(seed) * 0.5 + 0.5) * width,
        y: (Math.cos(seed * 1.7) * 0.5 + 0.5) * height,
      });
    }
    return result;
  }, [bokehCount, bokehColors, width, height]);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {lights.map((light, i) => {
          const t = progress * Math.PI * 2 * light.speed + light.phase;
          const dx = Math.sin(t) * width * driftAmount * light.depth;
          const dy =
            Math.cos(t * 0.7) * height * driftAmount * light.depth * 0.6;
          const sx = light.size * lightSize * (0.8 + light.depth * 0.4);
          const blur = blurAmount * (1.2 - light.depth * 0.6);

          return (
            <div
              key={i}
              style={{
                background: `radial-gradient(circle, ${light.color} 0%, transparent 70%)`,
                borderRadius: hexShape ? "0%" : "50%",
                filter: `blur(${blur}px)`,
                height: sx,
                left: light.x + dx - sx / 2,
                opacity: bokehOpacity * light.depth,
                position: "absolute",
                top: light.y + dy - sx / 2,
                width: sx,
                clipPath: hexShape
                  ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                  : undefined,
              }}
            />
          );
        })}
      </AbsoluteFill>

      <GrainOverlay amount={grainAmount} opacity={grainOpacity} />
      <VignetteOverlay strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
