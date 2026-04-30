import React from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type RadialRingChartProps = {
  animationDuration?: number;
  backgroundColor?: string;
  easing?: [number, number, number, number];
  exitDuration?: number;
  holdDuration?: number;
  labelColor?: string;
  legendGap?: number;
  legendStaggerDelay?: number;
  maxValue?: number;
  ringGap?: number;
  rings: Array<{
    color: string;
    label: string;
    value: number;
  }>;
  showLegend?: boolean;
  staggerDelay?: number;
  subtitle?: string;
  subtitleColor?: string;
  textColor?: string;
  title?: string;
  titleColor?: string;
};

export const RadialRingChart: React.FC<RadialRingChartProps> = ({
  animationDuration = 45,
  backgroundColor = "#0f1115",
  easing: _easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  holdDuration = 60,
  labelColor: _labelColor = "#9ca3af",
  legendGap = 18,
  legendStaggerDelay = 6,
  maxValue = 100,
  ringGap = 14,
  rings,
  showLegend = true,
  staggerDelay = 8,
  subtitle = "",
  subtitleColor = "#6b7280",
  textColor = "#ffffff",
  title = "",
  titleColor = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const {
    durationInFrames: _durationInFrames,
    height,
    width,
  } = useVideoConfig();

  const centerX = width * 0.35;
  const centerY = height / 2;
  const maxRadius = 140;

  const totalFrames =
    animationDuration +
    holdDuration +
    exitDuration +
    staggerDelay * rings.length;

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

  // Describe arc for SVG
  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ) => {
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = x + radius * Math.cos(startAngle);
    const y1 = y + radius * Math.sin(startAngle);
    const x2 = x + radius * Math.cos(endAngle);
    const y2 = y + radius * Math.sin(endAngle);

    return [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    ].join(" ");
  };

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

      {/* Rings SVG */}
      <svg
        height={height}
        style={{ left: 0, position: "absolute", top: 0 }}
        width={width}
      >
        {rings.map((ring, i) => {
          const radius = maxRadius - i * (maxRadius / rings.length + ringGap);
          const delay = i * staggerDelay;
          const ringProgress = interpolate(
            frame,
            [15 + delay, 35 + delay],
            [0, 1],
            {
              easing: Easing.out(Easing.quad),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const endAngle =
            -Math.PI / 2 + (ring.value / maxValue) * Math.PI * 2 * ringProgress;

          return (
            <path
              fill="none"
              key={i}
              opacity={exitProgress}
              stroke={ring.color}
              strokeLinecap="round"
              strokeWidth={10}
              d={describeArc(centerX, centerY, radius, -Math.PI / 2, endAngle)}
            />
          );
        })}
      </svg>

      {/* Legend */}
      {showLegend && (
        <div
          style={{
            left: width * 0.62,
            position: "absolute",
            top: centerY - (rings.length * legendGap) / 2,
          }}
        >
          {rings.map((ring, i) => {
            const delay = animationDuration + 10 + i * legendStaggerDelay;
            const legendOpacity = interpolate(
              frame,
              [delay, delay + 12],
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
                  marginBottom: legendGap,
                  opacity: legendOpacity * exitProgress,
                }}
              >
                <div
                  style={{
                    backgroundColor: ring.color,
                    borderRadius: "50%",
                    height: 10,
                    width: 10,
                  }}
                />
                <span
                  style={{
                    color: textColor,
                    fontSize: 14,
                  }}
                >
                  {ring.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
