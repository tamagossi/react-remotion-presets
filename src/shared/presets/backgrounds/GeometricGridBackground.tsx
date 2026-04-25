import React from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type GeometricGridBackgroundProps = {
  lineColor?: string;
  baseColor?: string;
  lineOpacity?: number;
  lineWidth?: number;
  gridDensity?: number;
  perspective?: number;
  animationDuration?: number;
  easing?: [number, number, number, number];
  children?: React.ReactNode;
};

export const GeometricGridBackground: React.FC<
  GeometricGridBackgroundProps
> = ({
  animationDuration = 20,
  baseColor = "#060d18",
  children,
  easing = [0.45, 0, 0.55, 1],
  gridDensity = 12,
  lineColor = "#4a7fcf",
  lineOpacity = 0.6,
  lineWidth = 1,
  perspective = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const offset = progress * (height / gridDensity);

  const horizontalLines = [];
  for (let i = -2; i <= gridDensity + 2; i++) {
    const y = (i * height) / gridDensity + offset;
    horizontalLines.push(
      <line
        key={`h-${i}`}
        opacity={lineOpacity}
        stroke={lineColor}
        strokeWidth={lineWidth}
        x1={0}
        x2={width}
        y1={y}
        y2={y}
      />,
    );
  }

  const verticalLines = [];
  for (let i = 0; i <= gridDensity; i++) {
    const x = (i * width) / gridDensity;
    verticalLines.push(
      <line
        key={`v-${i}`}
        opacity={lineOpacity}
        stroke={lineColor}
        strokeWidth={lineWidth}
        x1={x}
        x2={x}
        y1={0}
        y2={height}
      />,
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: baseColor,
        overflow: "hidden",
        perspective: `${perspective}px`,
      }}
    >
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          transform: `rotateX(60deg) translateY(${-height * 0.3}px)`,
          transformOrigin: "center center",
        }}
      >
        <svg
          height={height}
          style={{ left: 0, position: "absolute", top: 0 }}
          width={width}
        >
          {horizontalLines}
          {verticalLines}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${lineColor}33 0%, transparent 70%)`,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
