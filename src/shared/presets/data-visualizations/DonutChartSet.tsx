import React from "react";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import { BaseChartProps, ChartTheme, defaultDarkTheme } from "./types";

export type DonutChartSetProps = BaseChartProps & {
  charts: {
    color: string;
    label: string;
    max: number;
    value: number;
  }[];
};

export const DonutChartSet: React.FC<DonutChartSetProps> = ({
  animationDuration: _animationDuration = 90,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  charts,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  showCard = true,
  theme: themeOverride,
  title = "",
  titleColor,
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleTranslateY = interpolate(frame, [0, 20], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80);
  const gap = chartWidth / (charts.length + 1);

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
      {title ? (
        <div
          style={{
            color: titleColor || theme.primaryTextColor,
            flexShrink: 0,
            fontFamily,
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 20,
            opacity: titleOpacity * exitProgress,
            textAlign: "center",
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ flex: 1, width: "100%" }}>
        <svg
          height="100%"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          width="100%"
        >
          {charts.map((chart, i) => {
        const cx = gap * (i + 1);
        const cy = chartHeight * 0.4;
        const radius = Math.min(gap, chartHeight) * 0.32;
        const strokeWidth = 20;

        const delay = i * 10;
        const arcProgress = spring({
          config: { damping: 14, mass: 0.6, stiffness: 80 },
          fps,
          frame: Math.max(0, frame - delay),
          from: 0,
          to: 1,
        });

        const circumference = 2 * Math.PI * radius;
        const targetDash = circumference * (chart.value / chart.max);
        const currentDash = targetDash * arcProgress;

        const counter = interpolate(
          frame,
          [delay + 20, delay + 70],
          [0, chart.value],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <g key={`donut-${i}`}>
            {/* Background ring */}
            <circle
              cx={cx}
              cy={cy}
              fill="none"
              r={radius}
              stroke={theme.cardBorderColor}
              strokeWidth={strokeWidth}
            />

            {/* Active arc */}
            <circle
              cx={cx}
              cy={cy}
              fill="none"
              r={radius}
              stroke={chart.color}
              strokeDasharray={`${currentDash} ${circumference}`}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              transform={`rotate(-90, ${cx}, ${cy})`}
            />

            {/* Center value */}
            <text
              fill="#ffffff"
              fontFamily={fontFamily}
              fontSize={32}
              fontWeight={700}
              textAnchor="middle"
              x={cx}
              y={cy + 8}
            >
              {`${Math.round(counter)}%`}
            </text>

            {/* Label */}
            <text
              fill={theme.secondaryTextColor}
              fontFamily={fontFamily}
              fontSize={13}
              fontWeight={500}
              textAnchor="middle"
              x={cx}
              y={cy + radius + 50}
            >
              {chart.label}
            </text>
          </g>
        );
      })}
        </svg>
      </div>
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
        <div style={{ height: "100%", opacity: exitProgress, width: "100%" }}>
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
