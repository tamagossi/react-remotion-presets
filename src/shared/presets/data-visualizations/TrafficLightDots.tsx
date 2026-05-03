import React from "react";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import { BaseChartProps, ChartTheme, defaultDarkTheme } from "./types";

export type TrafficLightDotsProps = BaseChartProps & {
  activeIndex?: number;
  dots: {
    color: string;
    label?: string;
  }[];
  showStatusCaption?: boolean;
  showTrack?: boolean;
  subtitle?: string;
  subtitleColor?: string;
};

export const TrafficLightDots: React.FC<TrafficLightDotsProps> = ({
  activeIndex = 0,
  animationDuration: _animationDuration = 90,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  dots,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  showCard = true,
  showStatusCaption = true,
  showTrack = true,
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
  const headerHeight = hasHeader ? 70 : 0;
  const availableHeight = height - (showCard ? cardPadding * 2 : 80);
  const chartHeight = availableHeight - headerHeight;
  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2 + headerHeight;
  const gap = 60;

  const titleColorResolved = titleColor || theme.primaryTextColor;
  const subtitleColorResolved = subtitleColor || theme.secondaryTextColor;

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const exitY = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [0, -15],
    { extrapolateLeft: "clamp" },
  );

  const titleEntryOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleEntryY = interpolate(frame, [0, 15], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleEntryOpacity = interpolate(frame, [8, 23], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleEntryY = interpolate(frame, [8, 23], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const trackEntryOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const trackTopY = centerY + (0 - (dots.length - 1) / 2) * gap;
  const trackBottomY =
    centerY + ((dots.length - 1) - (dots.length - 1) / 2) * gap;

  const activeDot = dots[activeIndex];
  const activeDelay = activeIndex * 8;
  const statusCaptionOpacity = interpolate(
    frame,
    [activeDelay + 15, activeDelay + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const innerContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: availableHeight,
        opacity: exitProgress,
        transform: `translateY(${exitY}px)`,
        width: chartWidth,
      }}
    >
      {hasHeader && (
        <div style={{ height: headerHeight }}>
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
          {showTrack && (
            <line
              opacity={trackEntryOpacity}
              stroke={theme.cardBorderColor}
              strokeLinecap="round"
              strokeWidth={2}
              x1={centerX}
              x2={centerX}
              y1={trackTopY}
              y2={trackBottomY}
            />
          )}

          {dots.map((dot, i) => {
            const delay = i * 8;
            const scale = spring({
              config: { damping: 12, mass: 0.5, stiffness: 100 },
              fps,
              frame: Math.max(0, frame - delay),
              from: 0,
              to: 1,
            });

            const isActive = i === activeIndex;
            const pulse = isActive
              ? 1 + Math.sin((frame * Math.PI) / 15) * 0.1
              : 1;

            const cy = centerY + (i - (dots.length - 1) / 2) * gap;

            return (
              <g key={`dot-${i}`}>
                {/* Glow for active */}
                {isActive && (
                  <circle
                    cx={centerX}
                    cy={cy}
                    fill={dot.color}
                    opacity={0.3}
                    r={20 * pulse}
                  />
                )}

                {/* Dot */}
                <circle
                  cx={centerX}
                  cy={cy}
                  fill={dot.color}
                  r={14 * scale * (isActive ? pulse : 1)}
                />

                {/* Label */}
                {dot.label && (
                  <text
                    fill={theme.primaryTextColor}
                    fontFamily={fontFamily}
                    fontSize={14}
                    fontWeight={500}
                    x={centerX + 30}
                    y={cy + 5}
                    opacity={interpolate(
                      frame,
                      [delay + 10, delay + 25],
                      [0, 1],
                      { extrapolateLeft: "clamp" },
                    )}
                  >
                    {dot.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Status caption */}
          {showStatusCaption && activeDot?.label && (
            <text
              fill={activeDot.color}
              fontFamily={fontFamily}
              fontSize={28}
              fontWeight={700}
              letterSpacing={2}
              opacity={statusCaptionOpacity}
              textAnchor="middle"
              x={centerX}
              y={trackBottomY + 60}
            >
              {activeDot.label.toUpperCase()}
            </text>
          )}
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
        {innerContent}
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
        {innerContent}
      </div>
    </AbsoluteFill>
  );
};
