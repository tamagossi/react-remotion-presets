import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type CornerGlowCorner = "bl" | "br" | "tl" | "tr";

export type CornerGlowBackgroundProps = {
  baseColor?: string;
  glowColors?: string[];
  glowCorners?: CornerGlowCorner[];
  glowSize?: number;
  glowOpacity?: number;
  glowDrift?: number;
  blurAmount?: number;
  animationDuration?: number;
  easing?: [number, number, number, number];
  grainOpacity?: number;
  grainAmount?: number;
  children?: React.ReactNode;
};

const cornerAnchor = (
  corner: CornerGlowCorner,
  width: number,
  height: number,
): { x: number; y: number; ax: number; ay: number } => {
  switch (corner) {
    case "bl":
      return { ax: -1, ay: 1, x: 0, y: height };
    case "br":
      return { ax: 1, ay: 1, x: width, y: height };
    case "tl":
      return { ax: -1, ay: -1, x: 0, y: 0 };
    case "tr":
      return { ax: 1, ay: -1, x: width, y: 0 };
  }
};

export const CornerGlowBackground: React.FC<CornerGlowBackgroundProps> = ({
  animationDuration = 22,
  baseColor = "#0a0a14",
  blurAmount = 140,
  children,
  easing = [0.45, 0, 0.55, 1],
  glowColors = ["#7c3aed", "#06b6d4"],
  glowCorners = ["br", "tr"],
  glowDrift = 0.05,
  glowOpacity = 0.7,
  glowSize = 1.3,
  grainAmount = 0.3,
  grainOpacity = 0.04,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const size = Math.min(width, height) * glowSize;

  const grainPattern = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {glowCorners.map((corner, i) => {
          const color = glowColors[i % glowColors.length];
          const { ax, ay, x, y } = cornerAnchor(corner, width, height);
          const phase = i * ((Math.PI * 2) / glowCorners.length);
          const angle = progress * Math.PI * 2 + phase;
          const dx = Math.cos(angle) * glowDrift * width;
          const dy = Math.sin(angle * 0.9) * glowDrift * height;
          const cx = x + ax * (size * 0.15) + dx;
          const cy = y + ay * (size * 0.15) + dy;
          return (
            <div
              key={i}
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 75%)`,
                borderRadius: "50%",
                filter: `blur(${blurAmount}px)`,
                height: size,
                left: cx - size / 2,
                opacity: glowOpacity,
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
