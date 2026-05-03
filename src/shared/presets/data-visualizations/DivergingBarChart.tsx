import React from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type DivergingBarChartProps = {
  animationDuration?: number;
  backgroundColor?: string;
  barWidth?: number;
  data: Array<{
    label: string;
    value: number;
  }>;
  easing?: [number, number, number, number];
  exitDuration?: number;
  gridColor?: string;
  holdDuration?: number;
  labelColor?: string;
  negativeColor?: string;
  positiveColor?: string;
  showLabels?: boolean;
  staggerDelay?: number;
  subtitle?: string;
  subtitleColor?: string;
  textColor?: string;
  title?: string;
  titleColor?: string;
  yMax?: number;
};

export const DivergingBarChart: React.FC<DivergingBarChartProps> = ({
  animationDuration = 40,
  backgroundColor = "#0f1115",
  barWidth = 32,
  data,
  easing: _easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  gridColor = "#2a2d35",
  holdDuration = 60,
  labelColor = "#9ca3af",
  negativeColor = "#a855f7",
  positiveColor = "#10b981",
  showLabels = true,
  staggerDelay = 4,
  subtitle = "",
  subtitleColor = "#6b7280",
  textColor: _textColor = "#ffffff",
  title = "",
  titleColor = "#ffffff",
  yMax = 100,
}) => {
  const frame = useCurrentFrame();
  const {
    durationInFrames: _durationInFrames,
    height,
    width,
  } = useVideoConfig();

  const chartLeft = 80;
  const chartRight = width - 80;
  const chartTop = 140;
  const chartBottom = height - 145;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;
  const centerY = chartTop + chartHeight / 2;

  const totalFrames =
    animationDuration +
    holdDuration +
    exitDuration +
    staggerDelay * data.length;

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

  const gridOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barGap = (chartWidth - data.length * barWidth) / (data.length + 1);

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
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.02em",
            marginTop: 40,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        
        {subtitle && (
          <div
            style={{
              color: subtitleColor,
              fontSize: 13,
              marginTop: 6,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Chart area */}
      <div style={{ position: "relative" }}>
        {/* Y-axis labels */}
        {[-100, -50, 0, 50, 100].map((val) => {
          const y = centerY - (val / yMax) * (chartHeight / 2);
          return (
            <React.Fragment key={val}>
              <div
                style={{
                  color: labelColor,
                  fontSize: 12,
                  left: val >= 0 ? chartRight + 10 : chartLeft - 45,
                  opacity: gridOpacity * exitProgress,
                  position: "absolute",
                  textAlign: val >= 0 ? "left" : "right",
                  top: y - 6,
                  width: 35,
                }}
              >
                {val}%
              </div>
              {val !== 0 && (
                <div
                  style={{
                    backgroundColor: gridColor,
                    height: 1,
                    left: chartLeft,
                    opacity: gridOpacity * 0.4 * exitProgress,
                    position: "absolute",
                    top: y,
                    width: chartWidth,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Center axis */}
        <div
          style={{
            backgroundColor: gridColor,
            height: 2,
            left: chartLeft,
            opacity: gridOpacity * exitProgress,
            position: "absolute",
            top: centerY,
            width: chartWidth,
          }}
        />

        {/* Bars */}
        {data.map((d, i) => {
          const barX = chartLeft + barGap + i * (barWidth + barGap);
          const isPositive = d.value >= 0;
          const barHeight = (Math.abs(d.value) / yMax) * (chartHeight / 2);
          const delay = i * staggerDelay;

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

          const currentHeight = barHeight * barProgress;
          const top = isPositive ? centerY - currentHeight : centerY;

          const labelOpacity = interpolate(
            frame,
            [30 + delay, 40 + delay],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  backgroundColor: isPositive ? positiveColor : negativeColor,
                  borderRadius: isPositive ? "4px 4px 0 0" : "0 0 4px 4px",
                  height: currentHeight,
                  left: barX,
                  opacity: exitProgress,
                  position: "absolute",
                  top,
                  width: barWidth,
                }}
              />
              
              {showLabels && (
                <div
                  style={{
                    color: labelColor,
                    fontSize: 10,
                    left: barX - 2,
                    opacity: labelOpacity * exitProgress,
                    position: "absolute",
                    textAlign: "center",
                    top: chartBottom + 10,
                    width: barWidth + 4,
                  }}
                >
                  {d.label}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
