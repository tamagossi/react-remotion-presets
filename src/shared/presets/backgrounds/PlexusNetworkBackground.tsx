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

export type PlexusNetworkBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  connectionDistance?: number;
  connectionOpacity?: number;
  driftAmount?: number;
  easing?: [number, number, number, number];
  emergentShapes?: boolean;
  grainAmount?: number;
  grainOpacity?: number;
  gridDensity?: number;
  lineColor?: string;
  lineWidth?: number;
  nodeColor?: string;
  nodeSize?: number;
  pulseIntensity?: number;
  shapeOpacity?: number;
  vignetteStrength?: number;
};

interface Node {
  baseX: number;
  baseY: number;
  phase: number;
  shapeId: number;
}

export const PlexusNetworkBackground: React.FC<
  PlexusNetworkBackgroundProps
> = ({
  animationDuration = 25,
  baseColor = "#050505",
  children,
  connectionDistance = 120,
  connectionOpacity = 0.3,
  driftAmount = 0.03,
  easing = [0.45, 0, 0.55, 1],
  emergentShapes = true,
  grainAmount = 0.3,
  grainOpacity = 0.04,
  gridDensity = 16,
  lineColor = "#64748b",
  lineWidth = 0.5,
  nodeColor = "#ffffff",
  nodeSize = 2,
  pulseIntensity = 0.5,
  shapeOpacity = 0.4,
  vignetteStrength = 0.3,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodes = useMemo<Node[]>(() => {
    const result: Node[] = [];
    const spacingX = width / gridDensity;
    const spacingY = height / gridDensity;

    for (let row = 0; row < gridDensity; row++) {
      for (let col = 0; col < gridDensity; col++) {
        const seed = row * 137.5 + col * 97.3;
        result.push({
          baseX: col * spacingX + spacingX / 2,
          baseY: row * spacingY + spacingY / 2,
          phase: seed,
          shapeId: Math.floor((seed % 1000) / 100),
        });
      }
    }
    return result;
  }, [gridDensity, height, width]);

  const pulse = 1 + Math.sin(progress * Math.PI * 4) * pulseIntensity * 0.3;

  const nodePositions = nodes.map((node) => {
    const t = progress * Math.PI * 2 + node.phase;
    const dx = Math.sin(t * 0.7) * width * driftAmount;
    const dy = Math.cos(t * 0.5) * height * driftAmount;
    return {
      ...node,
      x: node.baseX + dx,
      y: node.baseY + dy,
    };
  });

  const connections: { x1: number; x2: number; y1: number; y2: number }[] = [];
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      const dx = nodePositions[i].x - nodePositions[j].x;
      const dy = nodePositions[i].y - nodePositions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectionDistance) {
        connections.push({
          x1: nodePositions[i].x,
          x2: nodePositions[j].x,
          y1: nodePositions[i].y,
          y2: nodePositions[j].y,
        });
      }
    }
  }

  const shapeGroups = useMemo(() => {
    if (!emergentShapes) return [];
    const groups: { id: number; nodes: typeof nodePositions }[] = [];
    for (let id = 0; id < 10; id++) {
      const groupNodes = nodePositions.filter((n) => n.shapeId === id);
      if (groupNodes.length >= 4) {
        groups.push({ id, nodes: groupNodes.slice(0, 4) });
      }
    }
    return groups;
  }, [emergentShapes, nodePositions]);

  const shapeAlpha = interpolate(
    frame,
    [
      0,
      animationDuration * fps * 0.3,
      animationDuration * fps * 0.7,
      animationDuration * fps,
    ],
    [0, shapeOpacity, shapeOpacity, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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
            opacity={connectionOpacity}
            stroke={lineColor}
            strokeWidth={lineWidth}
            x1={conn.x1}
            x2={conn.x2}
            y1={conn.y1}
            y2={conn.y2}
          />
        ))}
        {emergentShapes &&
          shapeGroups.map((group) => {
            const xs = group.nodes.map((n) => n.x);
            const ys = group.nodes.map((n) => n.y);
            const minX = Math.min(...xs);
            const maxX = Math.max(...xs);
            const minY = Math.min(...ys);
            const maxY = Math.max(...ys);
            return (
              <rect
                fill="none"
                height={maxY - minY}
                key={`shape-${group.id}`}
                opacity={shapeAlpha}
                stroke={lineColor}
                strokeWidth={lineWidth * 1.5}
                width={maxX - minX}
                x={minX}
                y={minY}
              />
            );
          })}
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
