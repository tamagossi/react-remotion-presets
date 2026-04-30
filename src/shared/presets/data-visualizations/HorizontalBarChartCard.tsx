import React from "react";

import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { DataCard, type DataCardProps } from "./DataCard";

export type HorizontalBarChartCardProps = Omit<
  DataCardProps,
  "children" | "metricValue"
> & {
  barHeight?: number;
  barRadius?: number;
  data: { color: string; label: string; maxValue?: number; value: number }[];
  gridLines?: boolean;
  metricValue?: number;
  showPercentages?: boolean;
  showValues?: boolean;
  trackColor?: string;
};

export const HorizontalBarChartCard: React.FC<HorizontalBarChartCardProps> = ({
  barHeight = 16,
  barRadius = 8,
  data,
  gridLines: _gridLines = false,
  metricValue,
  showPercentages = true,
  showValues = true,
  trackColor,
  ...cardProps
}) => {
  const frame = useCurrentFrame();
  const chartWidth = 460;
  const itemGap = 20;

  const trackBg =
    trackColor ?? (cardProps.theme === "light" ? "#e5e5e5" : "#333333");
  const textColor = cardProps.theme === "light" ? "#666666" : "#a0a0a0";
  const labelColor = cardProps.theme === "light" ? "#1a1a1a" : "#ffffff";

  const barStart = 20;
  const barEnd = 40;

  const maxValue = Math.max(...data.map((d) => d.maxValue ?? d.value));

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
        <div style={{ width: chartWidth }}>
          {data.map((item, i) => {
            const itemDelay = barStart + i * 3;
            const barProgress = interpolate(
              frame,
              [itemDelay, barEnd],
              [0, 1],
              {
                easing: Easing.out(Easing.quad),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            const labelOpacity = interpolate(
              frame,
              [itemDelay, itemDelay + 8],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            const percentage = Math.round(
              (item.value / (item.maxValue ?? maxValue)) * 100,
            );

            const countProgress = interpolate(
              frame,
              [itemDelay + 3, itemDelay + 18],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(
                  cardProps.enterEasing?.[0] ?? 0.16,
                  cardProps.enterEasing?.[1] ?? 1,
                  cardProps.enterEasing?.[2] ?? 0.3,
                  cardProps.enterEasing?.[3] ?? 1,
                ),
              },
            );
            const countValue = item.value * countProgress;

            return (
              <div
                key={i}
                style={{
                  marginBottom: itemGap,
                  opacity: labelOpacity,
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      color: labelColor,
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </span>
                  {showPercentages && (
                    <span
                      style={{
                        color: textColor,
                        fontFamily: "sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {percentage}%
                    </span>
                  )}
                </div>

                <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
                  <div
                    style={{
                      background: trackBg,
                      borderRadius: barRadius,
                      flex: 1,
                      height: barHeight,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: item.color,
                        borderRadius: barRadius,
                        height: "100%",
                        transition: "none",
                        width: `${barProgress * ((item.value / maxValue) * 100)}%`,
                      }}
                    />
                  </div>
                  {showValues && (
                    <span
                      style={{
                        color: labelColor,
                        fontFamily: "sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        minWidth: 50,
                        textAlign: "right",
                      }}
                    >
                      {Math.round(countValue).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DataCard>
    </AbsoluteFill>
  );
};
