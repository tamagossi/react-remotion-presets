import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type StackedBarChartProps = {
  animationDuration?: number;
  backgroundColor?: string;
  barColor?: string;
  barWidth?: number;
  data: Array<{
    label: string;
    secondaryValue?: number;
    value: number;
  }>;
  easing?: [number, number, number, number];
  exitDuration?: number;
  gridColor?: string;
  holdDuration?: number;
  labelColor?: string;
  primaryLabel?: string;
  secondaryColor?: string;
  secondaryLabel?: string;
  showValues?: boolean;
  staggerDelay?: number;
  subtitle?: string;
  subtitleColor?: string;
  textColor?: string;
  title?: string;
  titleColor?: string;
  valueColor?: string;
  yMax?: number;
};

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  animationDuration = 40,
  backgroundColor = "#0f1115",
  barColor = "#a7f3d0",
  barWidth = 48,
  data,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  gridColor = "#2a2d35",
  holdDuration = 60,
  labelColor = "#9ca3af",
  primaryLabel = "Primary",
  secondaryColor = "#34d399",
  secondaryLabel = "Secondary",
  showValues = true,
  staggerDelay = 5,
  subtitle = "",
  subtitleColor = "#6b7280",
  textColor = "#ffffff",
  title = "",
  titleColor = "#ffffff",
  valueColor = "#ffffff",
  yMax,
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const calculatedYMax = useMemo(() => {
    if (yMax !== undefined) return yMax;

    const maxTotal = Math.max(
      ...data.map((d) => d.value + (d.secondaryValue ?? 0)),
    );

    return Math.ceil(maxTotal * 1.12);
  }, [data, yMax]);

  const chartTop = 120;
  const chartBottom = height - 260;
  const chartLeft = (width - data.length * (barWidth + 24)) / 2;
  const chartHeight = chartBottom - chartTop;
  const chartTotalWidth = data.length * (barWidth + 24);

  const totalFrames =
    animationDuration +
    holdDuration +
    exitDuration +
    staggerDelay * data.length;

  const easingFn = Easing.bezier(easing[0], easing[1], easing[2], easing[3]);

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
    easing: easingFn,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [-20, 0], {
    easing: easingFn,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gridOpacity = interpolate(frame, [5, 20], [0, 1], {
    easing: easingFn,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const legendOpacity = interpolate(frame, [25, 40], [0, 1], {
    easing: easingFn,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "0.02em",
            marginTop: 50,
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

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          marginTop: 40,
          opacity: legendOpacity * exitProgress,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 8,
          }}
        >
          <div
            style={{
              background: barColor,
              borderRadius: 3,
              height: 12,
              width: 12,
            }}
          />
          <span
            style={{
              color: textColor,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {primaryLabel}
          </span>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 8,
          }}
        >
          <div
            style={{
              background: secondaryColor,
              borderRadius: 3,
              height: 12,
              width: 12,
            }}
          />
          <span
            style={{
              color: textColor,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {secondaryLabel}
          </span>
        </div>
      </div>

      {/* Chart area */}
      <div
        style={{
          height: chartBottom + 40,
          position: "relative",
          width: "100%",
        }}
      >
        {/* Y-axis spine */}
        <div
          style={{
            backgroundColor: gridColor,
            height: chartHeight + 6,
            left: chartLeft - 20,
            opacity: gridOpacity * exitProgress,
            position: "absolute",
            top: chartTop - 3,
            width: 2,
          }}
        />

        {/* Y-axis grid lines + labels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const value = Math.round((calculatedYMax / 4) * i);
          const y = chartBottom - (chartHeight / 4) * i;

          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div
                  style={{
                    backgroundColor: gridColor,
                    height: 1,
                    left: chartLeft - 20,
                    opacity: gridOpacity * 0.3 * exitProgress,
                    position: "absolute",
                    top: y,
                    width: chartTotalWidth + 40,
                  }}
                />
              )}
              <div
                style={{
                  color: labelColor,
                  fontSize: 12,
                  left: chartLeft - 48,
                  opacity: gridOpacity * exitProgress,
                  position: "absolute",
                  textAlign: "right",
                  top: y - 6,
                  width: 34,
                }}
              >
                {value}
              </div>
            </React.Fragment>
          );
        })}

        {/* Baseline */}
        <div
          style={{
            backgroundColor: gridColor,
            height: 2,
            left: chartLeft - 20,
            opacity: gridOpacity * exitProgress,
            position: "absolute",
            top: chartBottom,
            width: chartTotalWidth + 40,
          }}
        />

        {/* X-axis ticks */}
        {data.map((_d, i) => {
          const barX = chartLeft + i * (barWidth + 24);
          const tickOpacity = interpolate(
            frame,
            [10 + i * 2, 20 + i * 2],
            [0, 1],
            {
              easing: easingFn,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          return (
            <div
              key={`tick-${i}`}
              style={{
                backgroundColor: gridColor,
                height: 4,
                left: barX + barWidth / 2,
                opacity: tickOpacity * exitProgress,
                position: "absolute",
                top: chartBottom,
                width: 1,
              }}
            />
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const barX = chartLeft + i * (barWidth + 24);
          const delay = i * staggerDelay;

          const primaryProgress = interpolate(
            frame,
            [15 + delay, 35 + delay],
            [0, 1],
            {
              easing: easingFn,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const secondaryProgress = d.secondaryValue
            ? interpolate(
                frame,
                [23 + delay, 43 + delay],
                [0, 1],
                {
                  easing: easingFn,
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              )
            : 0;

          const totalValue = d.value + (d.secondaryValue ?? 0);
          const primaryTargetHeight =
            (d.value / calculatedYMax) * chartHeight;
          const secondaryTargetHeight = d.secondaryValue
            ? ((d.secondaryValue / calculatedYMax) * chartHeight)
            : 0;

          const primaryHeight = primaryTargetHeight * primaryProgress;
          const secondaryHeight = secondaryTargetHeight * secondaryProgress;
          const totalHeight = primaryHeight + secondaryHeight;

          const valueOpacity = interpolate(
            frame,
            [30 + delay, 40 + delay],
            [0, 1],
            {
              easing: easingFn,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const labelOpacity = interpolate(
            frame,
            [10 + i * 2, 20 + i * 2],
            [0, 1],
            {
              easing: easingFn,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          return (
            <React.Fragment key={i}>
              {/* Primary segment */}
              <div
                style={{
                  background: `linear-gradient(180deg, ${barColor} 0%, ${barColor}dd 100%)`,
                  borderRadius: d.secondaryValue ? "0 0 0 0" : "6px 6px 0 0",
                  height: primaryHeight,
                  left: barX,
                  opacity: exitProgress,
                  position: "absolute",
                  top: chartBottom - totalHeight,
                  width: barWidth,
                }}
              />

              {/* Secondary segment */}
              {d.secondaryValue !== undefined && d.secondaryValue > 0 && (
                <div
                  style={{
                    background: `linear-gradient(180deg, ${secondaryColor} 0%, ${secondaryColor}dd 100%)`,
                    borderRadius: "6px 6px 0 0",
                    height: secondaryHeight,
                    left: barX,
                    opacity: exitProgress,
                    position: "absolute",
                    top: chartBottom - totalHeight + primaryHeight,
                    width: barWidth,
                  }}
                />
              )}

              {/* Total value label */}
              {showValues && (
                <div
                  style={{
                    color: valueColor,
                    fontSize: 13,
                    fontWeight: 600,
                    left: barX,
                    opacity: valueOpacity * exitProgress,
                    position: "absolute",
                    textAlign: "center",
                    top: chartBottom - totalHeight - 22,
                    width: barWidth,
                  }}
                >
                  {Math.round(totalValue * (primaryProgress > 0.8 ? secondaryProgress > 0 ? 1 : primaryProgress : primaryProgress))}
                </div>
              )}

              {/* X label */}
              <div
                style={{
                  color: labelColor,
                  fontSize: 12,
                  left: barX,
                  opacity: labelOpacity * exitProgress,
                  position: "absolute",
                  textAlign: "center",
                  top: chartBottom + 14,
                  width: barWidth,
                }}
              >
                {d.label}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
