import React from "react";

import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { DataCard, type DataCardProps } from "./DataCard";
import { useCountUp } from "./useCountUp";

export type SemiCircleGaugeCardProps = Omit<
  DataCardProps,
  "children" | "metricValue"
> & {
  centerLabel?: string;
  colors?: string[];
  gaugeWidth?: number;
  metricValue?: number;
  segments: { color: string; label: string; percentage: number }[];
  showLegend?: boolean;
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInRadians: number,
): { x: number; y: number } => ({
  x: centerX + radius * Math.cos(angleInRadians),
  y: centerY + radius * Math.sin(angleInRadians),
});

const arcPath = (
  centerX: number,
  centerY: number,
  radius: number,
  fromAngle: number,
  toAngle: number,
): string => {
  const end = polarToCartesian(centerX, centerY, radius, toAngle);
  const start = polarToCartesian(centerX, centerY, radius, fromAngle);
  const angleDelta = fromAngle - toAngle;
  const largeArc = angleDelta > Math.PI ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

export const SemiCircleGaugeCard: React.FC<SemiCircleGaugeCardProps> = ({
  centerLabel,
  colors: _colors = ["#8b5cf6", "#fbbf24", "#f97316"],
  gaugeWidth = 12,
  metricValue,
  segments,
  showLegend = true,
  ...cardProps
}) => {
  const frame = useCurrentFrame();
  const size = 200;
  const radius = size / 2 - gaugeWidth;
  const centerX = size / 2;
  const centerY = size / 2 + 8;
  const startAngle = Math.PI;
  const totalAngle = Math.PI;

  const sweepStart = 20;
  const sweepEnd = 50;

  const textColor = cardProps.theme === "light" ? "#666666" : "#a0a0a0";
  const labelColor = cardProps.theme === "light" ? "#1a1a1a" : "#ffffff";

  const centerCount = useCountUp(
    frame,
    0,
    metricValue ?? 0,
    sweepStart + 10,
    sweepEnd,
    cardProps.enterEasing ?? [0.16, 1, 0.3, 1],
  );

  const progress = interpolate(frame, [sweepStart, sweepEnd], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let currentAngle = startAngle;
  const arcs = segments.map((seg) => {
    const segMaxAngle = (seg.percentage / 100) * totalAngle;
    const segCurrentAngle = segMaxAngle * progress;
    const fromAngle = currentAngle;
    const toAngle = currentAngle - segCurrentAngle;

    currentAngle = toAngle;

    return {
      color: seg.color,
      d: arcPath(centerX, centerY, radius, fromAngle, toAngle),
    };
  });

  const trackEnd = polarToCartesian(centerX, centerY, radius, 0);
  const trackStart = polarToCartesian(centerX, centerY, radius, startAngle);
  const trackD = `M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 0 0 ${trackEnd.x} ${trackEnd.y}`;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: cardProps.theme === "light" ? "#f5f5f5" : "#0a0a0a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DataCard {...cardProps} metricValue={undefined}>
        <div style={{ alignItems: "center", display: "flex", gap: 32 }}>
          <svg
            height={size}
            style={{ overflow: "visible" }}
            viewBox={`0 0 ${size} ${size}`}
            width={size}
          >
            <path
              d={trackD}
              fill="none"
              strokeLinecap="round"
              strokeWidth={gaugeWidth}
              stroke={
                cardProps.theme === "light"
                  ? "rgba(0,0,0,0.08)"
                  : "rgba(255,255,255,0.06)"
              }
            />
            {arcs.map((arc, i) => (
              <path
                d={arc.d}
                fill="none"
                key={i}
                stroke={arc.color}
                strokeLinecap="round"
                strokeWidth={gaugeWidth}
              />
            ))}
            <text
              fill={labelColor}
              fontFamily="sans-serif"
              fontSize={28}
              fontWeight={700}
              textAnchor="middle"
              x={centerX}
              y={centerY - 5}
            >
              {metricValue !== undefined
                ? Math.round(centerCount).toLocaleString()
                : ""}
            </text>
            {centerLabel && (
              <text
                fill={textColor}
                fontFamily="sans-serif"
                fontSize={11}
                textAnchor="middle"
                x={centerX}
                y={centerY + 14}
              >
                {centerLabel}
              </text>
            )}
          </svg>
          {showLegend && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {segments.map((seg, i) => {
                const legendDelay = sweepStart + 20 + i * 4;
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
                          color: seg.color,
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
