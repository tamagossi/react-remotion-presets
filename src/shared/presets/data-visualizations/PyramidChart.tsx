import React from "react";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import {
  BaseChartProps,
  ChartTheme,
  DataPoint,
  defaultDarkTheme,
} from "./types";

export type PyramidChartProps = BaseChartProps & {
  data: DataPoint[];
};

export const PyramidChart: React.FC<PyramidChartProps> = ({
  animationDuration: _animationDuration = 90,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  data,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  showCard = true,
  theme: themeOverride,
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80);
  const centerX = chartWidth / 2;
  const baseY = chartHeight * 0.85;
  const pyramidHeight = chartHeight * 0.6;
  const baseWidth = chartWidth * 0.5;

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const innerContent = (
    <svg
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width={chartWidth}
    >
      {/* Arrow on left */}
      <g
        opacity={interpolate(frame, [0, 20], [0, 0.3], {
          extrapolateLeft: "clamp",
        })}
      >
        <polygon
          fill="#ffffff"
          points={`${centerX - baseWidth * 0.7},${baseY - pyramidHeight * 0.5} ${centerX - baseWidth * 0.55},${baseY - pyramidHeight * 0.5 - 20} ${centerX - baseWidth * 0.55},${baseY - pyramidHeight * 0.5 + 20}`}
        />
        <line
          stroke="#ffffff"
          strokeWidth={2}
          x1={centerX - baseWidth * 0.5}
          x2={centerX - baseWidth * 0.5}
          y1={baseY}
          y2={baseY - pyramidHeight}
        />
      </g>

      {/* Pyramid layers */}
      {data.map((item, i) => {
        const delay = i * 10;
        const progress = spring({
          config: { damping: 14, mass: 0.6, stiffness: 80 },
          fps,
          frame: Math.max(0, frame - delay),
          from: 0,
          to: 1,
        });

        const layerHeight = pyramidHeight / data.length;
        const bottomY = baseY - i * layerHeight;
        const topY = bottomY - layerHeight;
        const bottomWidth = baseWidth * (1 - (i / data.length) * 0.7);
        const topWidth = baseWidth * (1 - ((i + 1) / data.length) * 0.7);

        const currentBottomY = baseY - (baseY - bottomY) * progress;
        const currentTopY = baseY - (baseY - topY) * progress;

        return (
          <g key={`layer-${i}`}>
            <polygon
              fill={item.color || theme.accentColor}
              opacity={0.8 + i * 0.05}
              points={`${centerX - bottomWidth},${currentBottomY} ${centerX + bottomWidth},${currentBottomY} ${centerX + topWidth},${currentTopY} ${centerX - topWidth},${currentTopY}`}
            />

            {/* Label */}
            <text
              fill="#ffffff"
              fontFamily={fontFamily}
              fontSize={16}
              fontWeight={600}
              textAnchor="start"
              x={centerX + bottomWidth + 20}
              y={(currentBottomY + currentTopY) / 2 + 6}
              opacity={interpolate(frame, [delay + 20, delay + 35], [0, 1], {
                extrapolateLeft: "clamp",
              })}
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );

  if (!showCard) {
    return (
      <AbsoluteFill
        style={{
          alignItems: "center",
          backgroundColor,
          display: "flex",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div style={{ opacity: exitProgress, width: "100%" }}>
          {innerContent}
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          backgroundColor: cardBackgroundColor,
          border: `1px solid ${theme.cardBorderColor}`,
          borderRadius: cardBorderRadius,
          height: height - 80,
          opacity: exitProgress,
          overflow: "hidden",
          padding: cardPadding,
          width: width - 80,
        }}
      >
        {innerContent}
      </div>
    </AbsoluteFill>
  );
};
