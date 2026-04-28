import React from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { GrainOverlay } from "../../components/GrainOverlay";

export type GeometricPatternType =
  | "chevron"
  | "chevronDot"
  | "diamondCross"
  | "diamondGrid"
  | "hexCube"
  | "lWeave";

export type GeometricTessellationBackgroundProps = {
  accentColor?: string;
  animationDuration?: number;
  bandCount?: number;
  baseColor?: string;
  chevronDepth?: number;
  children?: React.ReactNode;
  dotDensity?: number;
  driftSpeed?: number;
  easing?: [number, number, number, number];
  grainAmount?: number;
  grainOpacity?: number;
  layerOffset?: number;
  lineColor?: string;
  lineOpacity?: number;
  lineThickness?: number;
  nestingDepth?: number;
  patternType?: GeometricPatternType;
  rotationSpeed?: number;
  scalePulse?: number;
  tileSize?: number;
};

export const GeometricTessellationBackground: React.FC<
  GeometricTessellationBackgroundProps
> = ({
  accentColor = "#cffafe",
  animationDuration = 30,
  bandCount = 8,
  baseColor = "#0c4a6e",
  chevronDepth = 5,
  children,
  dotDensity = 12,
  driftSpeed = 0.2,
  easing = [0.45, 0, 0.55, 1],
  grainAmount = 0.3,
  grainOpacity = 0.04,
  layerOffset = 0.3,
  lineColor = "#7dd3fc",
  lineOpacity = 0.45,
  lineThickness = 1.5,
  nestingDepth = 4,
  patternType = "diamondCross",
  rotationSpeed = 15,
  scalePulse = 0.05,
  tileSize = 80,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
    easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotation = progress * rotationSpeed;
  const scale = 1 + Math.sin(progress * Math.PI * 2) * scalePulse;
  const driftX = Math.sin(progress * Math.PI * 2 * driftSpeed) * width * layerOffset;
  const driftY = Math.cos(progress * Math.PI * 2 * driftSpeed * 0.7) * height * layerOffset;

  const renderDiamondCross = () => {
    const tilesX = Math.ceil(width / tileSize) + 2;
    const tilesY = Math.ceil(height / tileSize) + 2;
    const elements: React.ReactNode[] = [];

    for (let row = -1; row < tilesY; row++) {
      for (let col = -1; col < tilesX; col++) {
        const cx = col * tileSize + tileSize / 2 + driftX;
        const cy = row * tileSize + tileSize / 2 + driftY;
        const groupElements: React.ReactNode[] = [];

        for (let n = 0; n < nestingDepth; n++) {
          const s = (tileSize * 0.4) * (1 - n / nestingDepth);
          groupElements.push(
            <polygon
              fill="none"
              key={`d-${row}-${col}-${n}`}
              opacity={lineOpacity * (1 - n * 0.15)}
              points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
              stroke={lineColor}
              strokeWidth={lineThickness * (1 - n * 0.1)}
            />,
          );
          groupElements.push(
            <line
              key={`dc-h-${row}-${col}-${n}`}
              opacity={lineOpacity * 0.5 * (1 - n * 0.15)}
              stroke={lineColor}
              strokeWidth={lineThickness * 0.5}
              x1={cx - s}
              x2={cx + s}
              y1={cy}
              y2={cy}
            />,
          );
          groupElements.push(
            <line
              key={`dc-v-${row}-${col}-${n}`}
              opacity={lineOpacity * 0.5 * (1 - n * 0.15)}
              stroke={lineColor}
              strokeWidth={lineThickness * 0.5}
              x1={cx}
              x2={cx}
              y1={cy - s}
              y2={cy + s}
            />,
          );
        }

        elements.push(
          <g key={`tile-${row}-${col}`}>{groupElements}</g>,
        );
      }
    }

    return elements;
  };

  const renderDiamondGrid = () => {
    const tilesX = Math.ceil(width / tileSize) + 2;
    const tilesY = Math.ceil(height / tileSize) + 2;
    const elements: React.ReactNode[] = [];

    for (let row = -1; row < tilesY; row++) {
      for (let col = -1; col < tilesX; col++) {
        const cx = col * tileSize + tileSize / 2 + driftX;
        const cy = row * tileSize + tileSize / 2 + driftY;

        for (let n = 0; n < nestingDepth; n++) {
          const s = (tileSize * 0.45) * (1 - n / nestingDepth);
          elements.push(
            <polygon
              fill="none"
              key={`dg-${row}-${col}-${n}`}
              opacity={lineOpacity * (1 - n * 0.12)}
              points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
              stroke={lineColor}
              strokeWidth={lineThickness}
            />,
          );
        }
      }
    }

    return elements;
  };

  const renderHexCube = () => {
    const hexW = tileSize;
    const hexH = tileSize * 0.866;
    const cols = Math.ceil(width / (hexW * 0.75)) + 2;
    const rows = Math.ceil(height / hexH) + 2;
    const elements: React.ReactNode[] = [];

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const cx = col * hexW * 0.75 + driftX;
        const cy = row * hexH + (col % 2) * (hexH / 2) + driftY;
        const r = tileSize * 0.35;

        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          hexPoints.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
        }

        elements.push(
          <polygon
            fill="none"
            key={`hex-${row}-${col}`}
            opacity={lineOpacity}
            points={hexPoints.join(" ")}
            stroke={lineColor}
            strokeWidth={lineThickness}
          />,
        );

        for (let i = 0; i < 3; i++) {
          const angle1 = (Math.PI / 3) * i - Math.PI / 6;
          const angle2 = (Math.PI / 3) * (i + 3) - Math.PI / 6;
          elements.push(
            <line
              key={`hexline-${row}-${col}-${i}`}
              opacity={lineOpacity * 0.6}
              stroke={lineColor}
              strokeWidth={lineThickness * 0.7}
              x1={cx + r * 0.5 * Math.cos(angle1)}
              x2={cx + r * 0.5 * Math.cos(angle2)}
              y1={cy + r * 0.5 * Math.sin(angle1)}
              y2={cy + r * 0.5 * Math.sin(angle2)}
            />,
          );
        }
      }
    }

    return elements;
  };

  const renderLWeave = () => {
    const tilesX = Math.ceil(width / tileSize) + 2;
    const tilesY = Math.ceil(height / tileSize) + 2;
    const elements: React.ReactNode[] = [];

    for (let row = -1; row < tilesY; row++) {
      for (let col = -1; col < tilesX; col++) {
        const baseX = col * tileSize + driftX;
        const baseY = row * tileSize + driftY;
        const offset = (row + col) % 2 === 0 ? 0 : tileSize / 2;
        const cx = baseX + offset;
        const cy = baseY + tileSize / 2;
        const s = tileSize * 0.35;

        const lShape1 = `${cx - s},${cy - s} ${cx - s},${cy + s} ${cx + s},${cy + s}`;
        const lShape2 = `${cx + s},${cy + s} ${cx + s},${cy - s} ${cx - s},${cy - s}`;

        elements.push(
          <polyline
            fill="none"
            key={`lw1-${row}-${col}`}
            opacity={lineOpacity}
            points={lShape1}
            stroke={lineColor}
            strokeWidth={lineThickness}
          />,
        );
        elements.push(
          <polyline
            fill="none"
            key={`lw2-${row}-${col}`}
            opacity={lineOpacity * 0.6}
            points={lShape2}
            stroke={lineColor}
            strokeWidth={lineThickness * 0.7}
          />,
        );
      }
    }

    return elements;
  };

  const renderChevron = () => {
    const bandHeight = height / bandCount;
    const elements: React.ReactNode[] = [];

    for (let band = 0; band < bandCount; band++) {
      const bandY = band * bandHeight + driftY;
      const tilesX = Math.ceil(width / tileSize) + 2;

      for (let col = -1; col < tilesX; col++) {
        const baseX = col * tileSize + driftX;
        const centerY = bandY + bandHeight / 2;

        for (let n = 0; n < chevronDepth; n++) {
          const s = (tileSize * 0.4) * (1 - n / chevronDepth);
          const vOffset = n * (bandHeight * 0.08);
          const pointsUp = `${baseX},${centerY - s + vOffset} ${baseX + s / 2},${centerY + vOffset} ${baseX + s},${centerY - s + vOffset}`;
          const pointsDown = `${baseX},${centerY + s - vOffset} ${baseX + s / 2},${centerY - vOffset} ${baseX + s},${centerY + s - vOffset}`;

          elements.push(
            <polyline
              fill="none"
              key={`cv-up-${band}-${col}-${n}`}
              opacity={lineOpacity * (1 - n * 0.1)}
              points={pointsUp}
              stroke={lineColor}
              strokeWidth={lineThickness * (1 - n * 0.05)}
            />,
          );
          elements.push(
            <polyline
              fill="none"
              key={`cv-down-${band}-${col}-${n}`}
              opacity={lineOpacity * (1 - n * 0.1)}
              points={pointsDown}
              stroke={lineColor}
              strokeWidth={lineThickness * (1 - n * 0.05)}
            />,
          );
        }
      }
    }

    return elements;
  };

  const renderChevronDot = () => {
    const bandHeight = height / bandCount;
    const elements: React.ReactNode[] = [];

    for (let band = 0; band < bandCount; band++) {
      const bandY = band * bandHeight + driftY;
      const tilesX = Math.ceil(width / tileSize) + 2;

      for (let col = -1; col < tilesX; col++) {
        const baseX = col * tileSize + driftX;
        const centerY = bandY + bandHeight / 2;

        for (let n = 0; n < chevronDepth; n++) {
          const s = (tileSize * 0.35) * (1 - n / chevronDepth);
          const points = `${baseX},${centerY - s} ${baseX + s / 2},${centerY} ${baseX + s},${centerY - s}`;
          elements.push(
            <polyline
              fill="none"
              key={`cvd-${band}-${col}-${n}`}
              opacity={lineOpacity * (1 - n * 0.1)}
              points={points}
              stroke={lineColor}
              strokeWidth={lineThickness}
            />,
          );
        }
      }

      for (let d = 0; d < dotDensity; d++) {
        const dx = (d / dotDensity) * width + driftX;
        const dy = bandY + bandHeight / 2 + driftY;
        const dotSize = tileSize * 0.06;
        elements.push(
          <polygon
            fill={accentColor}
            key={`dot-${band}-${d}`}
            opacity={lineOpacity * 0.7}
            points={`${dx},${dy - dotSize} ${dx + dotSize},${dy} ${dx},${dy + dotSize} ${dx - dotSize},${dy}`}
          />,
        );
      }
    }

    return elements;
  };

  const renderPattern = () => {
    switch (patternType) {
      case "chevron":
        return renderChevron();
      case "chevronDot":
        return renderChevronDot();
      case "diamondCross":
        return renderDiamondCross();
      case "diamondGrid":
        return renderDiamondGrid();
      case "hexCube":
        return renderHexCube();
      case "lWeave":
        return renderLWeave();
      default:
        return renderDiamondCross();
    }
  };

  return (
    <AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          transformOrigin: "center center",
          width: "100%",
        }}
      >
        <svg
          height={height * 1.5}
          width={width * 1.5}
          style={{
            left: -width * 0.25,
            position: "absolute",
            top: -height * 0.25,
          }}
        >
          {renderPattern()}
        </svg>
      </div>

      <GrainOverlay amount={grainAmount} opacity={grainOpacity} />

      <AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
