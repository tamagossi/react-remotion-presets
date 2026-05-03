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

export type NestedArcChartProps = BaseChartProps & {
  data: DataPoint[];
  labelColor?: string;
  subtitle?: string;
  subtitleColor?: string;
};

export const NestedArcChart: React.FC<NestedArcChartProps> = ({
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  data,
  fontFamily = "Inter",
  labelColor,
  showCard = true,
  subtitle = "",
  subtitleColor,
  theme: themeOverride,
  title = "",
  titleColor: _titleColor,
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const titleColor = _titleColor ?? theme.primaryTextColor;
  const subtitleColorResolved = subtitleColor ?? theme.secondaryTextColor;
  const labelColorResolved = labelColor ?? (() => {
    const bgHex = (showCard ? cardBackgroundColor : backgroundColor).replace(
      "#",
      "",
    );
    const r = parseInt(bgHex.substring(0, 2), 16);
    const g = parseInt(bgHex.substring(2, 4), 16);
    const b = parseInt(bgHex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#4a4a5a" : theme.secondaryTextColor;
  })();

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80);
  const cx = chartWidth * 0.6;
  const cy = chartHeight / 2;
  const maxRadius = Math.min(chartWidth, chartHeight) * 0.38;

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [5, 20], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const innerContent = (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      {title ? (
        <div
          style={{
            color: titleColor,
            flexShrink: 0,
            fontFamily,
            fontSize: 20,
            fontWeight: 600,
            marginBottom: subtitle ? 4 : 12,
            opacity: titleOpacity,
            textAlign: "center",
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </div>
      ) : null}

      {subtitle ? (
        <div
          style={{
            color: subtitleColorResolved,
            flexShrink: 0,
            fontFamily,
            fontSize: 13,
            fontWeight: 400,
            marginBottom: 12,
            opacity: subtitleOpacity,
            textAlign: "center",
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtitle}
        </div>
      ) : null}

      <div style={{ flex: 1, minHeight: 0, width: "100%" }}>
        <svg
          height="100%"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          width="100%"
        >
          {data.map((item, i) => {
            const radius = maxRadius - i * (maxRadius / data.length) * 0.9;
            const delay = i * 12;
            const progress = spring({
              config: { damping: 14, mass: 0.6, stiffness: 80 },
              fps,
              frame: Math.max(0, frame - delay),
              from: 0,
              to: 1,
            });

            const circumference = 2 * Math.PI * radius;
            const targetDash = circumference * (item.value / 100);
            const currentDash = targetDash * progress;

            const counter = interpolate(
              frame,
              [delay + 20, delay + 70],
              [0, item.value],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );

            const labelX = cx + radius + 20;
            const labelY = cy + (i - data.length / 2 + 0.5) * 32;

            return (
              <g key={`arc-${i}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  fill="none"
                  r={radius}
                  stroke={theme.cardBorderColor}
                  strokeWidth={18}
                />

                <circle
                  cx={cx}
                  cy={cy}
                  fill="none"
                  opacity={0.8 + i * 0.05}
                  r={radius}
                  stroke={item.color || theme.accentColor}
                  strokeDasharray={`${currentDash} ${circumference}`}
                  strokeLinecap="round"
                  strokeWidth={18}
                  transform={`rotate(-90, ${cx}, ${cy})`}
                />

                <line
                  stroke={labelColorResolved}
                  strokeWidth={1}
                  x1={cx + radius + 8}
                  x2={labelX - 8}
                  y1={cy}
                  y2={labelY}
                  opacity={interpolate(
                    frame,
                    [delay + 30, delay + 45],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                    },
                  )}
                />

                <rect
                  fill={showCard ? cardBackgroundColor : backgroundColor}
                  height={22}
                  rx={4}
                  width={Math.ceil((`${item.value}% ${item.label}`).length * 7.2 + 12)}
                  x={labelX - 6}
                  y={labelY - 10}
                  opacity={interpolate(
                    frame,
                    [delay + 35, delay + 50],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                    },
                  )}
                />

                <text
                  fill={labelColorResolved}
                  fontFamily={fontFamily}
                  fontSize={14}
                  fontWeight={600}
                  x={labelX}
                  y={labelY + 5}
                  opacity={interpolate(
                    frame,
                    [delay + 35, delay + 50],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                    },
                  )}
                >
                  {`${Math.round(counter)}% ${item.label}`}
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
