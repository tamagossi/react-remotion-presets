import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type RadialSpotlightBackgroundProps = {
  baseColor?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  spotlightOpacity?: number;
  spotlightX?: number;
  spotlightY?: number;
  driftAmount?: number;
  breatheAmount?: number;
  blurAmount?: number;
  animationDuration?: number;
  easing?: [number, number, number, number];
  grainOpacity?: number;
  grainAmount?: number;
  children?: React.ReactNode;
};

export const RadialSpotlightBackground: React.FC<
  RadialSpotlightBackgroundProps
> = ({
  animationDuration = 18,
  baseColor = "#0a1a0e",
  blurAmount = 120,
  breatheAmount = 0.15,
  children,
  driftAmount = 0.08,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  spotlightColor = "#1cc23a",
  spotlightOpacity = 0.7,
  spotlightSize = 1.3,
  spotlightX = 0.5,
  spotlightY = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const angle = progress * Math.PI * 2;
  const driftX = Math.cos(angle) * driftAmount * width;
  const driftY = Math.sin(angle * 0.85) * driftAmount * height;

  const breathe = 1 + Math.sin(angle * 1.2) * breatheAmount;
  const baseSize = Math.min(width, height) * spotlightSize * breathe;

  const cx = width * spotlightX + driftX;
  const cy = height * spotlightY + driftY;

  const grainPattern = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: `blur(${blurAmount}px)`,
            height: baseSize,
            left: cx - baseSize / 2,
            opacity: spotlightOpacity,
            position: "absolute",
            top: cy - baseSize / 2,
            width: baseSize,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          backgroundImage: grainPattern,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: grainOpacity * grainAmount,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
