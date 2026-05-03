import React from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type GroupedBarChartProps = {
  animationDuration?: number;
  backgroundColor?: string;
  barWidth?: number;
  description?: string;
  easing?: [number, number, number, number];
  exitDuration?: number;
  gridColor?: string;
  groupGap?: number;
  holdDuration?: number;
  labelColor?: string;
  legendStaggerDelay?: number;
  series: Array<{ color: string; name: string; values: number[] }>;
  showValues?: boolean;
  staggerDelay?: number;
  subtitle?: string;
  subtitleColor?: string;
  textColor?: string;
  title?: string;
  titleColor?: string;
  valueColor?: string;
  xLabels: string[];
  yMax?: number;
};

export const GroupedBarChart: React.FC<GroupedBarChartProps> = ({
  animationDuration = 40,
  backgroundColor = "#0f1115",
  barWidth = 24,
  description = "",
  easing: _easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  gridColor = "#2a2d35",
  groupGap = 16,
  holdDuration = 60,
  labelColor = "#9ca3af",
  legendStaggerDelay = 6,
  series,
  showValues = true,
  staggerDelay = 4,
  subtitle = "",
  subtitleColor = "#6b7280",
  textColor = "#ffffff",
  title = "",
  titleColor = "#ffffff",
  valueColor = "#ffffff",
  xLabels,
  yMax = 10,
}) => {
  const frame = useCurrentFrame();
  const {
    durationInFrames: _durationInFrames,
    height,
    width,
  } = useVideoConfig();

  const chartTop = 140;
  const chartBottom = height - 210;
  const chartLeft = 80;
  const chartRight = width - 280;
  const chartHeight = chartBottom - chartTop;
  const chartWidth = chartRight - chartLeft;

  const totalFrames =
    animationDuration +
    holdDuration +
    exitDuration +
    staggerDelay * xLabels.length;

  const exitProgress = interpolate(
    frame,
    [totalFrames - exitDuration, totalFrames],
    [1, 0],
    {
      easing: Easing.in(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gridOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const descOpacity = interpolate(
    frame,
    [animationDuration + 20, animationDuration + 35],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const groupWidth = chartWidth / xLabels.length;
  const barSpacing = 4;
  const actualBarWidth =
    series.length > 0
      ? (groupWidth - groupGap * 2 - barSpacing * (series.length - 1)) /
        series.length
      : barWidth;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity * exitProgress,
          textAlign: "center",
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            color: titleColor,
            fontSize: 36,
            fontWeight: 700,
            marginTop: 40,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              color: subtitleColor,
              fontSize: 14,
              letterSpacing: "0.05em",
              marginTop: 6,
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Chart area */}
      <div style={{ marginTop: 30, position: "relative" }}>
        {/* Y-axis labels and grid */}
        {[0, 1, 2, 3, 4].map((i) => {
          const value = Math.round((yMax / 4) * i);
          const y = chartBottom - (chartHeight / 4) * i;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  color: labelColor,
                  fontSize: 12,
                  left: chartLeft - 40,
                  opacity: gridOpacity * exitProgress,
                  position: "absolute",
                  textAlign: "right",
                  top: y - 6,
                  width: 30,
                }}
              >
                {value}
              </div>
              {i > 0 && (
                <div
                  style={{
                    backgroundColor: gridColor,
                    height: 1,
                    left: chartLeft,
                    opacity: gridOpacity * 0.5 * exitProgress,
                    position: "absolute",
                    top: y,
                    width: chartWidth,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Y-axis vertical line */}
        <div
          style={{
            backgroundColor: gridColor,
            height: chartHeight,
            left: chartLeft,
            opacity: gridOpacity * exitProgress,
            position: "absolute",
            top: chartTop,
            width: 2,
          }}
        />

        {/* X-axis baseline */}
        <div
          style={{
            backgroundColor: gridColor,
            height: 2,
            left: chartLeft,
            opacity: gridOpacity * exitProgress,
            position: "absolute",
            top: chartBottom,
            width: chartWidth,
          }}
        />

        {/* Bars */}
        {xLabels.map((label, groupIndex) => {
          const groupX = chartLeft + groupGap + groupIndex * groupWidth;

          return (
            <React.Fragment key={label}>
              {/* X label */}
              <div
                style={{
                  color: labelColor,
                  fontSize: 12,
                  left: groupX,
                  position: "absolute",
                  textAlign: "center",
                  top: chartBottom + 18,
                  width: groupWidth - groupGap * 2,
                  opacity:
                    interpolate(
                      frame,
                      [10 + groupIndex * 3, 20 + groupIndex * 3],
                      [0, 1],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      },
                    ) * exitProgress,
                }}
              >
                {label}
              </div>

              {/* Series bars */}
              {series.map((s, seriesIndex) => {
                const value = s.values[groupIndex] ?? 0;
                const barHeight = (value / yMax) * chartHeight;
                const barX =
                  groupX + seriesIndex * (actualBarWidth + barSpacing);
                const delay = groupIndex * staggerDelay + seriesIndex * 2;

                const barProgress = interpolate(
                  frame,
                  [15 + delay, 35 + delay],
                  [0, 1],
                  {
                    easing: Easing.out(Easing.quad),
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                );

                const valueOpacity = interpolate(
                  frame,
                  [30 + delay, 40 + delay],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                );

                return (
                  <React.Fragment key={seriesIndex}>
                    <div
                      style={{
                        backgroundColor: s.color,
                        borderRadius: "2px 2px 0 0",
                        height: barHeight * barProgress,
                        left: barX,
                        opacity: exitProgress,
                        position: "absolute",
                        top: chartBottom - barHeight * barProgress,
                        transformOrigin: "bottom",
                        width: actualBarWidth,
                      }}
                    />
                    {showValues && (
                      <div
                        style={{
                          color: valueColor,
                          fontSize: 11,
                          fontWeight: 600,
                          left: barX,
                          opacity: valueOpacity * exitProgress,
                          position: "absolute",
                          textAlign: "center",
                          width: actualBarWidth,
                          top:
                            chartBottom - barHeight * barProgress - 20,
                        }}
                      >
                        {value}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}

        {/* Legend */}
        <div
          style={{
            left: chartRight + 30,
            position: "absolute",
            top: chartTop + 20,
          }}
        >
          {series.map((s, i) => {
            const legendDelay = animationDuration + 10 + i * legendStaggerDelay;
            const legendOpacity = interpolate(
              frame,
              [legendDelay, legendDelay + 12],
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
                  gap: 10,
                  marginBottom: 12,
                  opacity: legendOpacity * exitProgress,
                }}
              >
                <div
                  style={{
                    backgroundColor: s.color,
                    borderRadius: "50%",
                    height: 10,
                    width: 10,
                  }}
                />
                <span
                  style={{
                    color: textColor,
                    fontSize: 13,
                  }}
                >
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div
          style={{
            color: labelColor,
            fontSize: 12,
            left: chartLeft,
            lineHeight: 1.6,
            opacity: descOpacity * exitProgress,
            position: "absolute",
            textAlign: "center",
            top: chartBottom + 60,
            width: chartWidth,
          }}
        >
          {description}
        </div>
      )}
    </AbsoluteFill>
  );
};
