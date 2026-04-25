import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type NeonPulseBackgroundProps = {
  colors?: string[];
  baseColor?: string;
  blobCount?: number;
  blobSize?: number;
  blobOpacity?: number;
  animationDuration?: number;
  pulseIntensity?: number;
  blurAmount?: number;
  easing?: [number, number, number, number];
  grainOpacity?: number;
  grainAmount?: number;
  children?: React.ReactNode;
};

export const NeonPulseBackground: React.FC<NeonPulseBackgroundProps> = ({
  animationDuration = 12,
  baseColor = "#050505",
  blobCount = 4,
  blobOpacity = 0.7,
  blobSize = 1.0,
  blurAmount = 100,
  children,
  colors = ["#ff006e", "#8338ec", "#3a86ff", "#06ffa5", "#ffbe0b"],
  easing = [0.4, 0, 0.6, 1],
  grainAmount = 0.3,
  grainOpacity = 0.03,
  pulseIntensity = 0.6,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blobs = [];
  for (let i = 0; i < blobCount; i++) {
    const phase = i * ((Math.PI * 2) / blobCount);
    const color = colors[i % colors.length];
    const speed = 1 + i * 0.25;

    const t = progress * Math.PI * 2 * speed + phase;

    const pulse = 1 + Math.sin(t) * pulseIntensity;
    const size = Math.min(width, height) * blobSize * pulse;

    const angle = phase + progress * Math.PI * 0.3;
    const radius = Math.min(width, height) * 0.15 * (1 + (i % 2) * 0.5);
    const x = width / 2 + radius * Math.cos(angle) - size / 2;
    const y = height / 2 + radius * Math.sin(angle) - size / 2;

    blobs.push({ color, size, x, y });
  }

  const grainPattern = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
        {blobs.map((blob, i) => (
          <div
            key={i}
            style={{
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 90%)`,
              borderRadius: "50%",
              filter: `blur(${blurAmount}px)`,
              height: blob.size,
              left: blob.x,
              opacity: blobOpacity,
              position: "absolute",
              top: blob.y,
              width: blob.size,
            }}
          />
        ))}
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
