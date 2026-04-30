import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { GrainOverlay } from "../../components/GrainOverlay";

export type PaperTextureBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  easing?: [number, number, number, number];
  edgeBleedColor?: string;
  edgeBleedStrength?: number;
  grainAmount?: number;
  grainOpacity?: number;
  vignetteStrength?: number;
};

export const PaperTextureBackground: React.FC<PaperTextureBackgroundProps> = ({
  animationDuration = 40,
  baseColor = "#f5f0e8",
  children,
  easing = [0.45, 0, 0.55, 1],
  edgeBleedColor = "#c4b49a",
  edgeBleedStrength = 0.25,
  grainAmount = 0.3,
  grainOpacity = 0.04,
  vignetteStrength = 0.15,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const paperTexture = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><filter id="p"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#p)" opacity="0.08"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  const breathe = 1 + Math.sin(progress * Math.PI * 2) * 0.03;

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage: paperTexture,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "multiply",
          opacity: 0.6 * breathe,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 40%, ${edgeBleedColor} 100%)`,
          mixBlendMode: "multiply",
          opacity: edgeBleedStrength,
          pointerEvents: "none",
        }}
      />

      <GrainOverlay
        amount={grainAmount}
        animated={false}
        opacity={grainOpacity}
      />

      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 0%, ${baseColor} 100%)`,
          opacity: vignetteStrength,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
