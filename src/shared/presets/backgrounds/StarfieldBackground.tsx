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

export type StarfieldBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  nebulaColor?: string;
  nebulaOpacity?: number;
  starColor?: string;
  starCount?: number;
  starOpacity?: number;
  vignetteStrength?: number;
};

interface Star {
  depth: number;
  phase: number;
  size: number;
  speed: number;
  x: number;
  y: number;
}

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({
  animationDuration = 30,
  baseColor = "#020408",
  children,
  easing = [0.45, 0, 0.55, 1],
  nebulaColor = "#1e3a8a",
  nebulaOpacity = 0.15,
  starColor = "#ffffff",
  starCount = 120,
  starOpacity = 0.8,
  vignetteStrength = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stars = useMemo<Star[]>(() => {
    const result: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const seed = i * 137.508;
      result.push({
        depth: 0.2 + (Math.sin(seed * 3.1) * 0.5 + 0.5) * 0.8,
        phase: seed,
        size: 1 + (Math.sin(seed * 2.7) * 0.5 + 0.5) * 2.5,
        speed: 0.3 + (Math.sin(seed * 4.3) * 0.5 + 0.5) * 1.2,
        x: (Math.sin(seed) * 0.5 + 0.5) * width,
        y: (Math.cos(seed * 1.3) * 0.5 + 0.5) * height,
      });
    }
    return result;
  }, [starCount, width, height]);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {stars.map((star, i) => {
          const drift = progress * Math.PI * 2 * star.speed + star.phase;
          const x = star.x + Math.sin(drift) * 20 * star.depth;
          const y = star.y + Math.cos(drift * 0.7) * 15 * star.depth;
          const twinkle = 0.5 + Math.sin(drift * 3) * 0.5;

          return (
            <div
              key={i}
              style={{
                background: starColor,
                borderRadius: "50%",
                boxShadow: `0 0 ${star.size * 2}px ${starColor}`,
                height: star.size,
                left: x,
                opacity: starOpacity * twinkle * star.depth,
                position: "absolute",
                top: y,
                width: star.size,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {nebulaOpacity > 0 && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${nebulaColor} 0%, transparent 70%)`,
            mixBlendMode: "screen",
            opacity: nebulaOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      <GrainOverlay amount={0.3} opacity={0.02} />
      <VignetteOverlay strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
