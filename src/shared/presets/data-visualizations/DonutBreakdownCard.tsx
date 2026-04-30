import React from "react";

import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { DataCard, type DataCardProps } from "./DataCard";

export type DonutBreakdownCardProps = Omit<
  DataCardProps,
  "children" | "metricValue"
> & {
  centerSubtext?: string;
  centerText?: string;
  colors?: string[];
  donutWidth?: number;
  metricValue?: number;
  segments: { color: string; label: string; percentage: number }[];
  showLegend?: boolean;
  size?: number;
};

export const DonutBreakdownCard: React.FC<DonutBreakdownCardProps> = ({
  centerSubtext,
  centerText,
  colors: _colors = ["#ec4899", "#fbbf24", "#8b5cf6", "#22c55e", "#f97316"],
  donutWidth = 16,
  metricValue,
  segments,
  showLegend = true,
  size = 160,
  ...cardProps
}) => {
  const frame = useCurrentFrame();
  const radius = size / 2 - donutWidth;
  const centerX = size / 2;
  const centerY = size / 2;

  const sweepStart = 20;
  const sweepEnd = 50;

  const textColor = cardProps.theme === "light" ? "#666666" : "#a0a0a0";
  const labelColor = cardProps.theme === "light" ? "#1a1a1a" : "#ffffff";

  let currentAngle = -Math.PI / 2;

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
        <div style={{ alignItems: "center", display: "flex", gap: 32 }}>
          <svg
            height={size}
            style={{ overflow: "visible" }}
            viewBox={`0 0 ${size} ${size}`}
            width={size}
          >
            {segments.map((seg, i) => {
              const segAngle = (seg.percentage / 100) * Math.PI * 2;
              const segStart = currentAngle;
              const segEnd = currentAngle + segAngle;
              currentAngle = segEnd;

              const segDelay = sweepStart + i * 4;
              const segProgress = interpolate(
                frame,
                [segDelay, sweepEnd],
                [segStart, segEnd],
                {
                  easing: Easing.out(Easing.quad),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              const largeArc = seg.percentage > 50 ? 1 : 0;

              const x1 = centerX + radius * Math.cos(segStart);
              const y1 = centerY + radius * Math.sin(segStart);
              const x2 = centerX + radius * Math.cos(segProgress);
              const y2 = centerY + radius * Math.sin(segProgress);

              const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

              return (
                <path
                  d={d}
                  fill="none"
                  key={i}
                  stroke={seg.color}
                  strokeLinecap="round"
                  strokeWidth={donutWidth}
                />
              );
            })}

            <text
              fill={labelColor}
              fontFamily="sans-serif"
              fontSize={22}
              fontWeight={700}
              textAnchor="middle"
              x={centerX}
              y={centerY - 2}
            >
              {centerText}
            </text>

            {centerSubtext && (
              <text
                fill={textColor}
                fontFamily="sans-serif"
                fontSize={10}
                textAnchor="middle"
                x={centerX}
                y={centerY + 14}
              >
                {centerSubtext}
              </text>
            )}
          </svg>

          {showLegend && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {segments.map((seg, i) => {
                const legendDelay = sweepStart + 20 + i * 3;
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
                      gap: 8,
                      opacity: legendOpacity,
                    }}
                  >
                    <div
                      style={{
                        background: seg.color,
                        borderRadius: "50%",
                        height: 8,
                        width: 8,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          color: labelColor,
                          fontFamily: "sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {seg.percentage}%
                      </div>
                      <div
                        style={{
                          color: textColor,
                          fontFamily: "sans-serif",
                          fontSize: 11,
                        }}
                      >
                        {seg.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DataCard>
    </AbsoluteFill>
  );
};
