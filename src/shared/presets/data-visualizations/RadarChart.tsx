import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
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
import { usePathDrawOn } from "./utils/animations";

export type RadarChartProps = BaseChartProps & {
  data: DataPoint[];
  gradientColors?: string[];
  labelBackgroundColor?: string;
  labelBackgroundPadding?: number;
  labelBackgroundRadius?: number;
  labelColor?: string;
  subtitle?: string;
  subtitleColor?: string;
};

export const RadarChart: React.FC<RadarChartProps> = ({
  animationDuration: _animationDuration = 90,
  backgroundColor = "#e8e8e8",
  cardBackgroundColor = "#f5f5f5",
  cardBorderRadius = 16,
  cardPadding = 40,
  data,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  gradientColors = ["#a855f7", "#f97316"],
  labelBackgroundColor = "#ffffff",
  labelBackgroundPadding = 6,
  labelBackgroundRadius = 4,
  labelColor = "#333333",
  showCard = true,
  subtitle = "",
  subtitleColor = "#666666",
  theme: themeOverride,
  title = "",
  titleColor = "#333333",
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80);
  const headerHeight = title || subtitle ? 70 : 0;
  const cx = chartWidth / 2;
  const cy = (chartHeight - headerHeight) / 2 + headerHeight;
  const radius = Math.min(chartWidth, chartHeight - headerHeight) * 0.32;

  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  const axisProgress = usePathDrawOn({
    duration: 30,
  });

  const fillProgress = spring({
    config: { damping: 14, mass: 0.6, stiffness: 80 },
    fps,
    frame: Math.max(0, frame - 25),
    from: 0,
    to: 1,
  });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const titleEntryOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleEntryY = interpolate(frame, [0, 15], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleEntryOpacity = interpolate(frame, [8, 23], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleEntryY = interpolate(frame, [8, 23], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const axes = useMemo(() => {
    return data.map((_, i) => {
      const angle = (i / data.length) * 2 * Math.PI - Math.PI / 2;
      return {
        angle,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });
  }, [cx, cy, data, radius]);

  const dataPoints = useMemo(() => {
    return data.map((d, i) => {
      const angle = (i / data.length) * 2 * Math.PI - Math.PI / 2;
      const r = radius * (d.value / maxValue) * fillProgress;
      return {
        r,
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
      };
    });
  }, [cx, cy, data, fillProgress, maxValue, radius]);

  const pathD = useMemo(() => {
    if (dataPoints.length === 0) return "";
    return (
      dataPoints
        .map((p, i) => {
          if (i === 0) return `M ${p.x} ${p.y}`;
          return `L ${p.x} ${p.y}`;
        })
        .join(" ") + " Z"
    );
  }, [dataPoints]);

  const innerContent = (
    <svg
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width={chartWidth}
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="radarGradient"
          x1={cx - radius}
          x2={cx + radius}
          y1={cy - radius}
          y2={cy + radius}
        >
          <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.6} />
          <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0.4} />
        </linearGradient>
      </defs>

      {/* Grid circles */}
      {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
        <circle
          cx={cx}
          cy={cy}
          fill="none"
          key={`grid-${i}`}
          opacity={0.15}
          r={radius * ratio}
          stroke={theme.gridColor}
          strokeWidth={1}
        />
      ))}

      {/* Axes */}
      {axes.map((axis, i) => (
        <line
          key={`axis-${i}`}
          opacity={axisProgress}
          stroke={theme.gridColor}
          strokeWidth={1}
          x1={cx}
          x2={axis.x}
          y1={cy}
          y2={axis.y}
        />
      ))}

      {/* Data fill */}
      <path
        d={pathD}
        fill="url(#radarGradient)"
        stroke={gradientColors[0]}
        strokeWidth={2}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          cx={p.x}
          cy={p.y}
          fill="#ffffff"
          key={`point-${i}`}
          r={4}
          stroke={gradientColors[0]}
          strokeWidth={2}
        />
      ))}

      {/* Labels with background */}
      {axes.map((axis, i) => {
        const labelRadius = radius + 32;
        const lx = cx + labelRadius * Math.cos(axis.angle);
        const ly = cy + labelRadius * Math.sin(axis.angle);
        const labelText = data[i]?.label ?? "";
        const charWidth = 6.2;
        const textWidth = labelText.length * charWidth;
        const textHeight = 14;
        const rectWidth = textWidth + labelBackgroundPadding * 2;
        const rectHeight = textHeight + labelBackgroundPadding;

        const labelDelay = 35 + i * 3;
        const labelOpacity = interpolate(
          frame,
          [labelDelay, labelDelay + 10],
          [0, 1],
          {
            easing: Easing.out(Easing.quad),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        return (
          <g key={`label-${i}`} opacity={labelOpacity}>
            <rect
              fill={labelBackgroundColor}
              height={rectHeight}
              opacity={0.95}
              rx={labelBackgroundRadius}
              ry={labelBackgroundRadius}
              stroke={theme.gridColor}
              strokeOpacity={0.12}
              strokeWidth={1}
              width={rectWidth}
              x={lx - rectWidth / 2}
              y={ly - rectHeight / 2 + 2}
            />
            <text
              dominantBaseline="central"
              fill={labelColor}
              fontFamily={fontFamily}
              fontSize={11}
              fontWeight={500}
              textAnchor="middle"
              x={lx}
              y={ly + 2}
            >
              {labelText}
            </text>
          </g>
        );
      })}
    </svg>
  );

  const headerBlock = (title || subtitle) && (
    <div
      style={{
        boxSizing: "border-box",
        left: 0,
        padding: "16px 24px",
        position: "absolute",
        top: 0,
        width: "100%",
      }}
    >
      {title && (
        <div
          style={{
            color: titleColor,
            fontFamily,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.02em",
            opacity: titleEntryOpacity * exitProgress,
            textTransform: "uppercase",
            transform: `translateY(${titleEntryY}px)`,
          }}
        >
          {title}
        </div>
      )}
      {subtitle && (
        <div
          style={{
            color: subtitleColor,
            fontFamily,
            fontSize: 13,
            marginTop: title ? 4 : 0,
            opacity: subtitleEntryOpacity * exitProgress,
            transform: `translateY(${subtitleEntryY}px)`,
          }}
        >
          {subtitle}
        </div>
      )}
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
        <div
          style={{
            height: chartHeight,
            opacity: exitProgress,
            position: "relative",
            width: chartWidth,
          }}
        >
          {headerBlock}
          <div style={{ height: "100%" }}>
            {innerContent}
          </div>
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
          position: "relative",
          width: width - 80,
        }}
      >
        {headerBlock}
        <div style={{ height: "100%" }}>
          {innerContent}
        </div>
      </div>
    </AbsoluteFill>
  );
};
