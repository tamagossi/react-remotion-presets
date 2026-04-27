import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type SweepArcBackgroundProps = {
  animationDuration?: number;
  arcColor?: string;
  arcOpacity?: number;
  arcPosition?: number;
  arcWidth?: number;
  baseColor?: string;
  blurAmount?: number;
  breatheAmount?: number;
  children?: React.ReactNode;
  driftAmount?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
};

export const SweepArcBackground: React.FC<SweepArcBackgroundProps> = ({
  animationDuration = 16,
  arcColor = "#06b6d4",
  arcOpacity = 0.75,
  arcPosition = 1.25,
  arcWidth = 1.4,
  baseColor = "#020617",
  blurAmount = 160,
  breatheAmount = 0.12,
  children,
  driftAmount = 0.04,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.03,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const angle = progress * Math.PI * 2;
  const driftRadius = width * driftAmount;
  const xOffset = Math.cos(angle) * driftRadius;

  const breathe = 1 + Math.sin(angle * 2) * breatheAmount;
  const ellipseX = arcWidth * 100 * breathe;
  const ellipseY = arcWidth * 70 * breathe;
  const centerX = 50 + (xOffset / width) * 100;
  const centerY = arcPosition * 100;

  const grainPattern = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: `radial-gradient(ellipse ${ellipseX}% ${ellipseY}% at ${centerX}% ${centerY}%, ${arcColor} 0%, transparent 70%)`,
            filter: `blur(${blurAmount}px)`,
            height: "100%",
            opacity: arcOpacity,
            position: "absolute",
            width: "100%",
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
