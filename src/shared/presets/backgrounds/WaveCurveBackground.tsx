import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type WaveCurveBackgroundProps = {
  baseColor?: string;
  waveColor?: string;
  waveAccentColor?: string;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveOffsetY?: number;
  waveBlur?: number;
  waveOpacity?: number;
  flowSpeed?: number;
  animationDuration?: number;
  easing?: [number, number, number, number];
  grainOpacity?: number;
  grainAmount?: number;
  children?: React.ReactNode;
};

export const WaveCurveBackground: React.FC<WaveCurveBackgroundProps> = ({
  animationDuration = 18,
  baseColor = "#1a0218",
  children,
  easing = [0.45, 0, 0.55, 1],
  flowSpeed = 1,
  grainAmount = 0.3,
  grainOpacity = 0.04,
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

  const segments = 40;
  const points: string[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = t * width;
    const y =
      baseY + Math.sin(t * Math.PI * 2 * waveFrequency + phase) * amp;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  const path = `M -10,${height + 10} L -10,${points[0].split(",")[1]} L ${points.join(" L ")} L ${width + 10},${height + 10} Z`;

  const grainPattern = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <svg
          height={height}
          style={{
            filter: `blur(${waveBlur}px)`,
            opacity: waveOpacity,
          }}
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
        </svg>
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
