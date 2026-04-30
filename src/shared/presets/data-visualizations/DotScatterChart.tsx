import React, { useMemo } from "react";

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

export type DotScatterChartProps = BaseChartProps & {
  data: DataPoint[];
};

export const DotScatterChart: React.FC<DotScatterChartProps> = ({
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

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const startPositions = useMemo(() => {
    return data.map((_, i) => ({
      x: ((Math.sin(i * 123.45) * 43758.5453) % 1) * chartWidth,
      y: -50 - ((Math.cos(i * 67.89) * 23421.6789) % 1) * 200,
    }));
  }, [chartWidth, data]);

  const endPositions = useMemo(() => {
    return data.map((d, i) => ({
      x: 60 + (i % 3) * 80,
      y: 80 + Math.floor(i / 3) * 100,
    }));
  }, [data]);

  const labelPositions = useMemo(() => {
    return data.map((_, i) => ({
      x: 280,
      y: 80 + Math.floor(i / 3) * 100 + (i % 3) * 30,
    }));
  }, [data]);

  const innerContent = (
    <svg
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width={chartWidth}
    >
      {data.map((item, i) => {
        const delay = i * 8;
        const progress = spring({
          config: { damping: 12, mass: 0.5, stiffness: 80 },
          fps,
          frame: Math.max(0, frame - delay),
          from: 0,
          to: 1,
        });

        const x =
          startPositions[i].x +
          (endPositions[i].x - startPositions[i].x) * progress;
        const y =
          startPositions[i].y +
          (endPositions[i].y - startPositions[i].y) * progress;

        const labelOpacity = interpolate(
          frame,
          [delay + 25, delay + 40],
          [0, 1],
          { extrapolateLeft: "clamp" },
        );

        return (
          <g key={`dot-${i}`}>
            {/* Connection line */}
            <line
              opacity={labelOpacity * 0.4}
              stroke={theme.secondaryTextColor}
              strokeDasharray="4,4"
              strokeWidth={1}
              x1={x + 20}
              x2={labelPositions[i].x - 10}
              y1={y}
              y2={labelPositions[i].y}
            />

            {/* Dot */}
            <rect
              fill={item.color || theme.accentColor}
              height={24}
              rx={12}
              width={40}
              x={x}
              y={y - 12}
              style={{
                transform: `scale(${progress})`,
                transformOrigin: `${x + 12}px ${y + 12}px`,
              }}
            />

            {/* Label */}
            <text
              fill={theme.primaryTextColor}
              fontFamily={fontFamily}
              fontSize={13}
              fontWeight={500}
              opacity={labelOpacity}
              x={labelPositions[i].x}
              y={labelPositions[i].y + 5}
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
