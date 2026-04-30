import React, { useMemo } from "react";

import {
  AbsoluteFill,
  interpolate,
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
import { useStaggeredReveal } from "./utils/animations";

export type CandlestickChartProps = BaseChartProps & {
  data: DataPoint[];
  negativeColor?: string;
  positiveColor?: string;
  showLabels?: boolean;
};

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  animationDuration: _animationDuration = 90,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  data,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  negativeColor = "#ef4444",
  positiveColor = "#22c55e",
  showCard = true,
  showLabels: _showLabels = true,
  theme: themeOverride,
  title = "BITCOIN",
  titleColor = "#ffffff",
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80) - 100;
  const padding = { bottom: 40, left: 50, right: 20, top: 40 };
  const drawWidth = chartWidth - padding.left - padding.right;
  const drawHeight = chartHeight - padding.top - padding.bottom;

  const maxValue = useMemo(
    () => Math.max(...data.map((d) => Math.abs(d.value))) * 1.2,
    [data],
  );

  const barProgress = useStaggeredReveal({
    baseDelay: 10,
    count: data.length,
    itemDuration: 20,
    stagger: 5,
  });

  const points = useMemo(() => {
    const zeroY = padding.top + drawHeight / 2;
    return data.map((d, i) => {
      const x = padding.left + ((i + 0.5) / data.length) * drawWidth;
      const barHeight = (Math.abs(d.value) / maxValue) * (drawHeight / 2);
      const y = d.value >= 0 ? zeroY - barHeight : zeroY;
      return {
        ...d,
        barHeight,
        color: d.value >= 0 ? positiveColor : negativeColor,
        isPositive: d.value >= 0,
        x,
        y,
        zeroY,
      };
    });
  }, [
    data,
    drawHeight,
    drawWidth,
    maxValue,
    negativeColor,
    padding.left,
    padding.top,
    positiveColor,
  ]);

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const innerContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          color: titleColor,
          fontFamily,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "0.15em",
          marginBottom: 16,
          textTransform: "uppercase",
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
          }),
        }}
      >
        {title}
      </div>

      <svg
        height={chartHeight}
        style={{ flex: 1 }}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width={chartWidth}
      >
        {/* Y axis labels */}
        {[-maxValue, 0, maxValue].map((val, i) => {
          const y =
            padding.top +
            drawHeight -
            ((val + maxValue) / (maxValue * 2)) * drawHeight;
          return (
            <g key={`yaxis-${i}`}>
              <text
                fill={theme.secondaryTextColor}
                fontFamily={fontFamily}
                fontSize={11}
                textAnchor="end"
                x={padding.left - 8}
                y={y + 4}
              >
                {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
              </text>
              <line
                stroke={theme.gridColor}
                strokeWidth={1}
                x1={padding.left}
                x2={padding.left + drawWidth}
                y1={y}
                y2={y}
              />
            </g>
          );
        })}

        {/* X axis labels */}
        {points.map((p, i) => (
          <text
            fill={theme.secondaryTextColor}
            fontFamily={fontFamily}
            fontSize={11}
            key={`xlabel-${i}`}
            textAnchor="middle"
            x={p.x}
            y={chartHeight - 10}
          >
            {p.label}
          </text>
        ))}

        {/* Candlestick bars */}
        {points.map((p, i) => {
          const progress = barProgress[i];
          const barW = (drawWidth / data.length) * 0.5;
          const currentHeight = p.barHeight * progress;
          const currentY = p.isPositive ? p.zeroY - currentHeight : p.zeroY;
          return (
            <g key={`bar-${i}`}>
              {/* Wick line */}
              <line
                stroke={p.color}
                strokeWidth={1}
                style={{ opacity: progress }}
                x1={p.x}
                x2={p.x}
                y1={p.isPositive ? p.zeroY : p.zeroY + currentHeight}
                y2={p.isPositive ? p.zeroY - currentHeight : p.zeroY}
              />
              {/* Body */}
              <rect
                fill={p.color}
                height={Math.max(currentHeight, 1)}
                style={{ opacity: progress }}
                width={barW}
                x={p.x - barW / 2}
                y={currentY}
              />
            </g>
          );
        })}
      </svg>
    </div>
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
