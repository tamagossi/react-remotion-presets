import React from "react";

import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { DataCard, type DataCardProps } from "./DataCard";

export type GroupedBarChartCardProps = Omit<
  DataCardProps,
  "children" | "metricValue"
> & {
  barGap?: number;
  barWidth?: number;
  colors?: string[];
  data: { label?: string; values: number[] }[];
  gridLines?: boolean;
  groupGap?: number;
  labels?: string[];
  metricValue?: number;
  seriesNames?: string[];
  showLegend?: boolean;
};

export const GroupedBarChartCard: React.FC<GroupedBarChartCardProps> = ({
  barGap = 2,
  barWidth = 8,
  colors = ["#8b5cf6", "#f97316", "#ec4899", "#fbbf24"],
  data,
  gridLines = true,
  groupGap = 16,
  labels,
  metricValue,
  seriesNames,
  showLegend = true,
  ...cardProps
}) => {
  const frame = useCurrentFrame();
  const chartHeight = 180;
  const chartWidth = 460;
  const padding = { bottom: 24, left: 0, right: 0, top: 10 };

  const maxValue = Math.max(...data.flatMap((d) => d.values)) * 1.1;

  const groupWidth =
    data[0]?.values.length * barWidth + (data[0]?.values.length - 1) * barGap;
  const totalWidth = data.length * groupWidth + (data.length - 1) * groupGap;
  const startX = (chartWidth - totalWidth) / 2;

  const barStart = 20;
  const barEnd = 45;

  const gridColor = cardProps.theme === "light" ? "#e5e5e5" : "#333333";
  const textColor = cardProps.theme === "light" ? "#666666" : "#a0a0a0";

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: cardProps.theme === "light" ? "#f5f5f5" : "#0a0a0a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DataCard {...cardProps} metricValue={metricValue}>
        <svg
          height={chartHeight}
          style={{ overflow: "visible" }}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          width="100%"
        >
          {gridLines && (
            <g opacity={0.3}>
              {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <line
                  key={t}
                  stroke={gridColor}
                  strokeDasharray="4,4"
                  strokeWidth={1}
                  x1={0}
                  x2={chartWidth}
                  y1={
                    padding.top +
                    t * (chartHeight - padding.top - padding.bottom)
                  }
                  y2={
                    padding.top +
                    t * (chartHeight - padding.top - padding.bottom)
                  }
                />
              ))}
            </g>
          )}

          {data.map((item, groupIndex) => {
            const groupX = startX + groupIndex * (groupWidth + groupGap);
            const groupDelay = barStart + groupIndex * 2;

            return item.values.map((value, barIndex) => {
              const barX = groupX + barIndex * (barWidth + barGap);
              const barH =
                (value / maxValue) *
                (chartHeight - padding.top - padding.bottom);
              const barDelay = groupDelay + barIndex * 1.5;

              const barProgress = interpolate(
                frame,
                [barDelay, barEnd],
                [0, 1],
                {
                  easing: Easing.out(Easing.quad),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              const h = barH * barProgress;
              const y = chartHeight - padding.bottom - h;

              return (
                <rect
                  fill={colors[barIndex % colors.length]}
                  height={h}
                  key={`${groupIndex}-${barIndex}`}
                  rx={2}
                  width={barWidth}
                  x={barX}
                  y={y}
                />
              );
            });
          })}

          {labels &&
            labels.map((label, i) => {
              const labelDelay = barStart + i * 2 + 15;
              const labelOpacity = interpolate(
                frame,
                [labelDelay, labelDelay + 8],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              return (
                <text
                  fill={textColor}
                  fontFamily="sans-serif"
                  fontSize={10}
                  key={i}
                  opacity={labelOpacity}
                  textAnchor="middle"
                  x={startX + i * (groupWidth + groupGap) + groupWidth / 2}
                  y={chartHeight - 4}
                >
                  {label}
                </text>
              );
            })}
        </svg>

        {showLegend && seriesNames && (
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            {seriesNames.map((name, i) => {
              const legendDelay = barStart + 20 + i * 3;
              const legendOpacity = interpolate(
                frame,
                [legendDelay, legendDelay + 8],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              return (
                <div
                  key={i}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: 6,
                    opacity: legendOpacity,
                  }}
                >
                  <div
                    style={{
                      background: colors[i % colors.length],
                      borderRadius: 2,
                      height: 8,
                      width: 8,
                    }}
                  />
                  <span
                    style={{
                      color: textColor,
                      fontFamily: "sans-serif",
                      fontSize: 11,
                    }}
                  >
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </DataCard>
    </AbsoluteFill>
  );
};
