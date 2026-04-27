import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type AuroraFlowBackgroundProps = {
  baseColor?: string;
  colors?: string[];
  zoneSize?: number;
  zoneOpacity?: number;
  flowAmount?: number;
  blurAmount?: number;
  animationDuration?: number;
  easing?: [number, number, number, number];
  grainOpacity?: number;
  grainAmount?: number;
  children?: React.ReactNode;
};

const CORNERS = [
  { ax: -1, ay: -1, x: 0, y: 0 },
  { ax: 1, ay: -1, x: 1, y: 0 },
  { ax: 1, ay: 1, x: 1, y: 1 },
  { ax: -1, ay: 1, x: 0, y: 1 },
];

export const AuroraFlowBackground: React.FC<AuroraFlowBackgroundProps> = ({
  animationDuration = 25,
  baseColor = "#0a0418",
  blurAmount = 180,
  children,
  colors = ["#3b82f6", "#a855f7", "#ec4899", "#06b6d4"],
  easing = [0.45, 0, 0.55, 1],
  flowAmount = 0.12,
  grainAmount = 0.3,
  grainOpacity = 0.04,
  zoneOpacity = 0.65,
  zoneSize = 1.3,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const size = Math.max(width, height) * zoneSize;

  const grainPattern = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
        {CORNERS.map((corner, i) => {
          const color = colors[i % colors.length];
          const phase = i * (Math.PI / 2);
          const angle = progress * Math.PI * 2 + phase;
          const dx = Math.cos(angle) * flowAmount * width;
          const dy = Math.sin(angle * 1.1) * flowAmount * height;
          const cx = corner.x * width + dx;
          const cy = corner.y * height + dy;
          return (
            <div
              key={i}
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
                borderRadius: "50%",
                filter: `blur(${blurAmount}px)`,
                height: size,
                left: cx - size / 2,
                opacity: zoneOpacity,
                position: "absolute",
                top: cy - size / 2,
                width: size,
              }}
            />
          );
        })}
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
