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

export type NodeScatterBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  connectionOpacity?: number;
  connectionThreshold?: number;
  driftSpeed?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  lineColor?: string;
  lineWidth?: number;
  nodeColor?: string;
  nodeCount?: number;
  nodeSize?: number;
  pulseIntensity?: number;
  scatterSeed?: number;
  vignetteStrength?: number;
};

interface ScatterNode {
  baseX: number;
  baseY: number;
  phase: number;
  speedX: number;
  speedY: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const NodeScatterBackground: React.FC<NodeScatterBackgroundProps> = ({
  animationDuration = 30,
  baseColor = "#06060a",
  children,
  connectionOpacity = 0.25,
  connectionThreshold = 100,
  driftSpeed = 0.4,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  lineColor = "#475569",
  lineWidth = 0.5,
  nodeColor = "#e2e8f0",
  nodeCount = 80,
  nodeSize = 2.5,
  pulseIntensity = 0.3,
  scatterSeed = 42,
  vignetteStrength = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodes = useMemo<ScatterNode[]>(() => {
    const rand = seededRandom(scatterSeed);
    const result: ScatterNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const margin = 60;
      result.push({
        baseX: margin + rand() * (width - margin * 2),
        baseY: margin + rand() * (height - margin * 2),
        phase: rand() * Math.PI * 2,
        speedX: (rand() - 0.5) * 2,
        speedY: (rand() - 0.5) * 2,
      });
    }
    return result;
  }, [nodeCount, scatterSeed, height, width]);

  const pulse = 1 + Math.sin(progress * Math.PI * 6) * pulseIntensity * 0.4;

  const nodePositions = nodes.map((node) => {
    const t = progress * Math.PI * 2 * driftSpeed + node.phase;
    const rangeX = width * 0.15;
    const rangeY = height * 0.15;
    return {
      ...node,
      x: node.baseX + Math.sin(t * node.speedX) * rangeX,
      y: node.baseY + Math.cos(t * node.speedY) * rangeY,
    };
  });

  const connections: {
    alpha: number;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }[] = [];
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      const dx = nodePositions[i].x - nodePositions[j].x;
      const dy = nodePositions[i].y - nodePositions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectionThreshold) {
        const alpha = 1 - dist / connectionThreshold;
        connections.push({
          alpha,
          x1: nodePositions[i].x,
          x2: nodePositions[j].x,
          y1: nodePositions[i].y,
          y2: nodePositions[j].y,
        });
      }
    }
  }

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <svg
        height={height}
        style={{ left: 0, position: "absolute", top: 0, width: "100%" }}
        width={width}
      >
        {connections.map((conn, i) => (
          <line
            key={`conn-${i}`}
            opacity={connectionOpacity * conn.alpha}
            stroke={lineColor}
            strokeWidth={lineWidth}
            x1={conn.x1}
            x2={conn.x2}
            y1={conn.y1}
            y2={conn.y2}
          />
        ))}
        {nodePositions.map((node, i) => (
          <circle
            cx={node.x}
            cy={node.y}
            fill={nodeColor}
            key={`node-${i}`}
            opacity={pulse}
            r={nodeSize}
          />
        ))}
      </svg>

      <GrainOverlay amount={grainAmount} opacity={grainOpacity} />
      <VignetteOverlay strength={vignetteStrength} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
