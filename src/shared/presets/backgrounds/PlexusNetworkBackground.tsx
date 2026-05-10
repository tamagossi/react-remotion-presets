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

export type PlexusNetworkLayout = "grid" | "scatter";

export type PlexusNetworkBackgroundProps = {
  animationDuration?: number;
  baseColor?: string;
  children?: React.ReactNode;
  connectionDistance?: number;
  connectionOpacity?: number;
  connectionThreshold?: number;
  driftAmount?: number;
  driftSpeed?: number;
  easing?: [number, number, number, number];
  emergentShapes?: boolean;
  grainAmount?: number;
  grainOpacity?: number;
  gridDensity?: number;
  layout?: PlexusNetworkLayout;
  lineColor?: string;
  lineWidth?: number;
  nodeColor?: string;
  nodeCount?: number;
  nodeSize?: number;
  pulseIntensity?: number;
  scatterSeed?: number;
  shapeOpacity?: number;
  startFrame?: number;
  vignetteStrength?: number;
};

interface Node {
  baseX: number;
  baseY: number;
  phase: number;
  shapeId: number;
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

export const PlexusNetworkBackground: React.FC<
  PlexusNetworkBackgroundProps
> = ({
  animationDuration = 25,
  baseColor = "#050505",
  children,
  connectionDistance = 120,
  connectionOpacity = 0.3,
  connectionThreshold,
  driftAmount = 0.03,
  driftSpeed = 0.4,
  easing = [0.45, 0, 0.55, 1],
  emergentShapes = true,
  grainAmount = 0.3,
  grainOpacity = 0.04,
  gridDensity = 16,
  layout = "grid",
  lineColor = "#64748b",
  lineWidth = 0.5,
  nodeColor = "#ffffff",
  nodeCount = 80,
  nodeSize = 2,
  pulseIntensity = 0.5,
  scatterSeed = 42,
  shapeOpacity = 0.4,
  startFrame = 0,
  vignetteStrength = 0.3,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const adjustedFrame = frame - startFrame * fps;
  const progress = interpolate(
    adjustedFrame,
    [0, animationDuration * fps],
    [0, 1],
    {
      easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const nodes = useMemo<Node[]>(() => {
    const result: Node[] = [];

    if (layout === "scatter") {
      const rand = seededRandom(scatterSeed);
      const margin = 60;
      for (let i = 0; i < nodeCount; i++) {
        result.push({
          baseX: margin + rand() * (width - margin * 2),
          baseY: margin + rand() * (height - margin * 2),
          phase: rand() * Math.PI * 2,
          shapeId: Math.floor((rand() * 1000) / 100),
          speedX: (rand() - 0.5) * 2,
          speedY: (rand() - 0.5) * 2,
        });
      }
    } else {
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
            speedX: 1,
            speedY: 1,
          });
        }
      }
    }

    return result;
  }, [gridDensity, height, layout, nodeCount, scatterSeed, width]);

  const pulse = 1 + Math.sin(progress * Math.PI * 4) * pulseIntensity * 0.3;

  const nodePositions = nodes.map((node) => {
    if (layout === "scatter") {
      const t = progress * Math.PI * 2 * driftSpeed + node.phase;
      const rangeX = width * 0.15;
      const rangeY = height * 0.15;
      return {
        ...node,
        x: node.baseX + Math.sin(t * node.speedX) * rangeX,
        y: node.baseY + Math.cos(t * node.speedY) * rangeY,
      };
    }

    const t = progress * Math.PI * 2 + node.phase;
    const dx = Math.sin(t * 0.7) * width * driftAmount;
    const dy = Math.cos(t * 0.5) * height * driftAmount;
    return {
      ...node,
      x: node.baseX + dx,
      y: node.baseY + dy,
    };
  });

  const threshold = connectionThreshold ?? connectionDistance;
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
      if (dist < threshold) {
        const alpha = layout === "scatter" ? 1 - dist / threshold : 1;
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

  const shapeGroups = useMemo(() => {
    if (!emergentShapes || layout === "scatter") return [];
    const groups: { id: number; nodes: typeof nodePositions }[] = [];
    for (let id = 0; id < 10; id++) {
      const groupNodes = nodePositions.filter((n) => n.shapeId === id);
      if (groupNodes.length >= 4) {
        groups.push({ id, nodes: groupNodes.slice(0, 4) });
      }
    }
    return groups;
  }, [emergentShapes, layout, nodePositions]);

  const resolveConnectionOpacity =
    layout === "scatter"
      ? connectionOpacity
      : connectionOpacity;

  const shapeAlpha = interpolate(
    adjustedFrame,
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
        width={width}
        style={{
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
          willChange: "transform",
        }}
      >
        {connections.map((conn, i) => (
          <line
            key={`conn-${i}`}
            stroke={lineColor}
            strokeWidth={lineWidth}
            x1={conn.x1}
            x2={conn.x2}
            y1={conn.y1}
            y2={conn.y2}
            opacity={
              layout === "scatter"
                ? resolveConnectionOpacity * conn.alpha
                : resolveConnectionOpacity
            }
          />
        ))}
        {emergentShapes &&
          layout === "grid" &&
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
