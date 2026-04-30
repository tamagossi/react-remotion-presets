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

export type ArchitecturalWireframeBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  driftSpeed?: number;
  easing?: [number, number, number, number];
  fadeToCenter?: boolean;
  grainAmount?: number;
  grainOpacity?: number;
  gridDensity?: number;
  lineColor?: string;
  lineOpacity?: number;
  lineThickness?: number;
  perspectiveStrength?: number;
  vanishingPointX?: number;
  vanishingPointY?: number;
  vignetteStrength?: number;
};

export const ArchitecturalWireframeBackground: React.FC<
  ArchitecturalWireframeBackgroundProps
> = ({
  animationDuration = 30,
  baseColor = "#020617",
  children,
  driftSpeed = 0.15,
  easing = [0.45, 0, 0.55, 1],
  fadeToCenter = true,
  grainAmount = 0.3,
  grainOpacity = 0.04,
  gridDensity = 10,
  lineColor = "#38bdf8",
  lineOpacity = 0.35,
  lineThickness = 0.8,
  perspectiveStrength = 0.7,
  vanishingPointX = 0.5,
  vanishingPointY = 0.5,
  vignetteStrength = 0.4,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drift = Math.sin(progress * Math.PI * 2 * driftSpeed) * 0.15;
  const vpX = width * (vanishingPointX + drift);
  const vpY =
    height *
    (vanishingPointY +
      Math.cos(progress * Math.PI * 2 * driftSpeed * 0.7) * 0.1);

  const lines = useMemo(() => {
    const result: {
      distance: number;
      key: string;
      x1: number;
      x2: number;
      y1: number;
      y2: number;
    }[] = [];

    // Horizontal converging lines
    for (let i = 0; i < gridDensity; i++) {
      const yNorm = i / (gridDensity - 1);
      const yOffset = (yNorm - 0.5) * height * perspectiveStrength * 2;
      const yBase = vpY + yOffset;

      result.push({
        distance: Math.abs(yNorm - 0.5),
        key: `h-${i}`,
        x1: 0,
        x2: width,
        y1: yBase,
        y2: yBase,
      });

      // Perspective diagonals from edges to vanishing point
      if (i < gridDensity - 1) {
        result.push({
          distance: Math.abs(yNorm - 0.5),
          key: `d-tl-${i}`,
          x1: 0,
          x2: vpX,
          y1: yBase,
          y2: vpY,
        });
        result.push({
          distance: Math.abs(yNorm - 0.5),
          key: `d-tr-${i}`,
          x1: width,
          x2: vpX,
          y1: yBase,
          y2: vpY,
        });
      }
    }

    // Vertical converging lines
    for (let i = 0; i < gridDensity; i++) {
      const xNorm = i / (gridDensity - 1);
      const xOffset = (xNorm - 0.5) * width * perspectiveStrength * 2;
      const xBase = vpX + xOffset;

      result.push({
        distance: Math.abs(xNorm - 0.5),
        key: `v-${i}`,
        x1: xBase,
        x2: xBase,
        y1: 0,
        y2: height,
      });

      if (i < gridDensity - 1) {
        const nextXNorm = (i + 1) / (gridDensity - 1);
        const nextXOffset = (nextXNorm - 0.5) * width * perspectiveStrength * 2;
        const nextXBase = vpX + nextXOffset;
        result.push({
          distance: Math.abs(xNorm - 0.5),
          key: `d-bl-${i}`,
          x1: nextXBase,
          x2: vpX,
          y1: height,
          y2: vpY,
        });
        result.push({
          distance: Math.abs(xNorm - 0.5),
          key: `d-br-${i}`,
          x1: nextXBase,
          x2: vpX,
          y1: height,
          y2: vpY,
        });
      }
    }

    return result;
  }, [gridDensity, height, perspectiveStrength, vpX, vpY, width]);

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <svg
        height={height}
        style={{ left: 0, position: "absolute", top: 0 }}
        width={width}
      >
        {lines.map((line) => {
          let opacity = lineOpacity;
          if (fadeToCenter) {
            const fade = 1 - line.distance * 1.5;
            opacity *= Math.max(0.1, fade);
          }
          return (
            <line
              key={line.key}
              opacity={opacity}
              stroke={lineColor}
              strokeWidth={lineThickness}
              x1={line.x1}
              x2={line.x2}
              y1={line.y1}
              y2={line.y2}
            />
          );
        })}
      </svg>

      {fadeToCenter && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at ${vpX}px ${vpY}px, transparent 0%, ${baseColor} 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      <GrainOverlay amount={grainAmount} opacity={grainOpacity} />
      <VignetteOverlay strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
