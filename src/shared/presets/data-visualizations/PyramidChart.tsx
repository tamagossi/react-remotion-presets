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

export type PyramidChartProps = BaseChartProps & {
  arrowColor?: string;
  arrowOpacity?: number;
  data: DataPoint[];
  exitDuration?: number;
  labelFontSize?: number;
  showArrow?: boolean;
  subtitle?: string;
  subtitleColor?: string;
};

export const PyramidChart: React.FC<PyramidChartProps> = ({
  animationDuration: _animationDuration = 90,
  arrowColor = "#ffffff",
  arrowOpacity = 0.3,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  data,
  easing: _easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Inter",
  labelFontSize = 16,
  showArrow = true,
  showCard = true,
  subtitle,
  subtitleColor,
  theme: themeOverride,
  title,
  titleColor,
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const hasHeader = Boolean(title || subtitle);
  const headerHeight = hasHeader ? 60 : 0;
  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80) - headerHeight;
  const centerX = chartWidth / 2;
  const baseY = chartHeight * 0.85;
  const pyramidHeight = chartHeight * 0.6;
  const baseWidth = chartWidth * 0.30;

  const titleColorResolved = titleColor || theme.primaryTextColor;
  const subtitleColorResolved = subtitleColor || theme.secondaryTextColor;

  const entryEndFrame = Math.max(50, (data.length - 1) * 10 + 40);
  const exitStartFrame = Math.max(
    entryEndFrame + 20,
    durationInFrames - exitDuration,
  );

  const exitProgress = interpolate(
    frame,
    [exitStartFrame, exitStartFrame + exitDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const exitScale = interpolate(
    frame,
    [exitStartFrame, exitStartFrame + exitDuration],
    [1, 0.96],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const exitY = interpolate(
    frame,
    [exitStartFrame, exitStartFrame + exitDuration],
    [0, -15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleEntryOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleEntryY = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleEntryOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleEntryY = interpolate(frame, [5, 20], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowEntryOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowLineX = centerX - baseWidth * 0.5;
  const arrowTopY = baseY - pyramidHeight;

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: chartHeight + headerHeight,
        width: chartWidth,
      }}
    >
      {hasHeader && (
        <div style={{ marginBottom: 20 }}>
          {title && (
            <div
              style={{
                color: titleColorResolved,
                fontFamily,
                fontSize: 20,
                fontWeight: 600,
                marginBottom: subtitle ? 4 : 0,
                opacity: titleEntryOpacity,
                transform: `translateY(${titleEntryY}px)`,
              }}
            >
              {title}
            </div>
          )}
          {subtitle && (
            <div
              style={{
                color: subtitleColorResolved,
                fontFamily,
                fontSize: 13,
                fontWeight: 400,
                opacity: subtitleEntryOpacity,
                transform: `translateY(${subtitleEntryY}px)`,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      )}
      <div style={{ flex: 1, position: "relative" }}>
        <svg
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          width={chartWidth}
        >
          {showArrow && (
            <g opacity={arrowEntryOpacity * arrowOpacity}>
              <polygon
                fill={arrowColor}
                points={`${arrowLineX},${arrowTopY - 10} ${arrowLineX - 8},${arrowTopY + 6} ${arrowLineX + 8},${arrowTopY + 6}`}
              />
              <line
                stroke={arrowColor}
                strokeWidth={2}
                x1={arrowLineX}
                x2={arrowLineX}
                y1={baseY}
                y2={arrowTopY}
              />
            </g>
          )}

          {data.map((item, i) => {
            const delay = i * 10;
            const progress = spring({
              config: { damping: 14, mass: 0.6, stiffness: 80 },
              fps,
              frame: Math.max(0, frame - delay),
              from: 0,
              to: 1,
            });

            const layerHeight = pyramidHeight / data.length;
            const bottomY = baseY - i * layerHeight;
            const topY = bottomY - layerHeight;
            const bottomWidth = baseWidth * (1 - i / data.length);
            const topWidth = baseWidth * (1 - (i + 1) / data.length);

            const currentBottomY = baseY - (baseY - bottomY) * progress;
            const currentTopY = baseY - (baseY - topY) * progress;

            const labelOpacity = interpolate(
              frame,
              [delay + 20, delay + 35],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            return (
              <g key={`layer-${i}`}>
                <polygon
                  fill={item.color || theme.accentColor}
                  opacity={0.8 + i * 0.05}
                  points={`${centerX - bottomWidth},${currentBottomY} ${centerX + bottomWidth},${currentBottomY} ${centerX + topWidth},${currentTopY} ${centerX - topWidth},${currentTopY}`}
                />
                <text
                  fill="#ffffff"
                  fontFamily={fontFamily}
                  fontSize={labelFontSize}
                  fontWeight={600}
                  opacity={labelOpacity}
                  textAnchor="start"
                  x={centerX + bottomWidth + 20}
                  y={(currentBottomY + currentTopY) / 2 + 6}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );

  const wrapperStyle: React.CSSProperties = {
    height: chartHeight + headerHeight,
    opacity: exitProgress,
    transform: `scale(${exitScale}) translateY(${exitY}px)`,
    transformOrigin: "center center",
    width: chartWidth,
  };

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
        <div style={wrapperStyle}>{content}</div>
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
          overflow: "hidden",
          padding: cardPadding,
          width: width - 80,
        }}
      >
        <div style={wrapperStyle}>{content}</div>
      </div>
    </AbsoluteFill>
  );
};
