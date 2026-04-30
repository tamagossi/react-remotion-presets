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
import {
  formatNumber,
  useAnimatedCounter,
  usePathDrawOn,
} from "./utils/animations";

export type AreaChartGlowProps = BaseChartProps & {
  accentLabel?: string;
  areaColor?: string;
  data: DataPoint[];
  glowColor?: string;
  suffix?: string;
  totalPrefix?: string;
  verticalLineColor?: string;
};

export const AreaChartGlow: React.FC<AreaChartGlowProps> = ({
  accentLabel = "Total expenditure for 10 years",
  animationDuration = 90,
  areaColor = "#3b82f6",
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  data,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  glowColor = "#60a5fa",
  showCard = true,
  suffix = "",
  theme: themeOverride,
  title: _title = "",
  titleColor = "#ffffff",
  totalPrefix = "$",
  verticalLineColor = "#ffffff",
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80) - 160;
  const padding = { bottom: 50, left: 20, right: 20, top: 20 };
  const drawWidth = chartWidth - padding.left - padding.right;
  const drawHeight = chartHeight - padding.top - padding.bottom;

  const maxValue = useMemo(
    () => Math.max(...data.map((d) => d.value)) * 1.15,
    [data],
  );
  const totalValue = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data],
  );

  const pathProgress = usePathDrawOn({
    duration: animationDuration,
  });

  const totalCounter = useAnimatedCounter({
    delay: animationDuration * 0.5,
    duration: 50,
    end: totalValue,
  });

  const indicatorProgress = interpolate(
    frame,
    [animationDuration * 0.3, animationDuration * 0.9],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * drawWidth;
      const y = padding.top + drawHeight - (d.value / maxValue) * drawHeight;
      return { ...d, x, y };
    });
  }, [data, drawHeight, drawWidth, maxValue, padding.left, padding.top]);

  const areaPathD = useMemo(() => {
    if (points.length === 0) return "";
    const topSegments = points.map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cpx1 = prev.x + (p.x - prev.x) * 0.4;
      const cpx2 = prev.x + (p.x - prev.x) * 0.6;
      return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
    });
    const last = points[points.length - 1];
    const first = points[0];
    return `${topSegments.join(" ")} L ${last.x} ${padding.top + drawHeight} L ${first.x} ${padding.top + drawHeight} Z`;
  }, [drawHeight, padding.top, points]);

  const linePathD = useMemo(() => {
    if (points.length === 0) return "";
    return points
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = points[i - 1];
        const cpx1 = prev.x + (p.x - prev.x) * 0.4;
        const cpx2 = prev.x + (p.x - prev.x) * 0.6;
        return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
      })
      .join(" ");
  }, [points]);

  const indicatorX = padding.left + indicatorProgress * drawWidth;
  const indicatorIndex = Math.min(
    Math.floor(indicatorProgress * (data.length - 1)),
    data.length - 1,
  );
  const indicatorPoint = points[indicatorIndex];
  const indicatorValue = indicatorPoint?.value ?? 0;

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
      {/* Header with total */}
      <div
        style={{
          marginBottom: 24,
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
          }),
        }}
      >
        <div
          style={{
            color: theme.secondaryTextColor,
            fontFamily,
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          {accentLabel}
        </div>
        <div
          style={{
            color: titleColor,
            fontFamily,
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          {formatNumber(Math.round(totalCounter), totalPrefix, suffix)}
        </div>
      </div>

      <svg
        height={chartHeight}
        style={{ flex: 1 }}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width={chartWidth}
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="areaGradient"
            x1={0}
            x2={0}
            y1={padding.top}
            y2={padding.top + drawHeight}
          >
            <stop offset="0%" stopColor={areaColor} stopOpacity={0.5} />
            <stop offset="100%" stopColor={areaColor} stopOpacity={0.05} />
          </linearGradient>
          <filter height="200%" id="glow" width="200%" x="-50%" y="-50%">
            <feGaussianBlur result="blur" stdDeviation={6} />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid lines */}
        {[0, 0.33, 0.66, 1].map((ratio, i) => {
          const y = padding.top + drawHeight * ratio;
          return (
            <line
              key={`grid-${i}`}
              opacity={0.1}
              stroke={theme.gridColor}
              strokeWidth={1}
              x1={padding.left}
              x2={padding.left + drawWidth}
              y1={y}
              y2={y}
            />
          );
        })}

        {/* X axis labels */}
        {points.map((p, i) => (
          <text
            fill={theme.secondaryTextColor}
            fontFamily={fontFamily}
            fontSize={11}
            fontWeight={500}
            key={`label-${i}`}
            textAnchor="middle"
            x={p.x}
            y={chartHeight - 8}
          >
            {p.label}
          </text>
        ))}

        {/* Area fill */}
        <clipPath id="areaClip">
          <rect
            height={chartHeight}
            width={drawWidth * pathProgress}
            x={padding.left}
            y={0}
          />
        </clipPath>
        <path
          clipPath="url(#areaClip)"
          d={areaPathD}
          fill="url(#areaGradient)"
        />

        {/* Glowing line */}
        <path
          d={linePathD}
          fill="none"
          filter="url(#glow)"
          stroke={glowColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4}
          style={{
            clipPath: "url(#areaClip)",
            opacity: 0.7,
          }}
        />
        <path
          d={linePathD}
          fill="none"
          stroke={areaColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          style={{ clipPath: "url(#areaClip)" }}
        />

        {/* Vertical indicator line */}
        {indicatorProgress > 0 && indicatorPoint && (
          <g>
            <line
              stroke={verticalLineColor}
              strokeWidth={2}
              x1={indicatorX}
              x2={indicatorX}
              y1={indicatorPoint.y}
              y2={chartHeight - 30}
            />
            <circle
              cx={indicatorX}
              cy={indicatorPoint.y}
              fill={areaColor}
              r={5}
              stroke={backgroundColor}
              strokeWidth={2}
            />
            <text
              fill={titleColor}
              fontFamily={fontFamily}
              fontSize={13}
              fontWeight={600}
              textAnchor="middle"
              x={indicatorX}
              y={indicatorPoint.y - 12}
            >
              {formatNumber(indicatorValue, totalPrefix)}
            </text>
          </g>
        )}
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
