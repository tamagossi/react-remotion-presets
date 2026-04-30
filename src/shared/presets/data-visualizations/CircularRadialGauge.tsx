import React, { useMemo } from "react";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import { BaseChartProps, ChartTheme, defaultDarkTheme } from "./types";
import { useAnimatedCounter, useStaggeredReveal } from "./utils/animations";

export type CircularRadialGaugeProps = BaseChartProps & {
  gradientColors?: string[];
  max: number;
  value: number;
};

export const CircularRadialGauge: React.FC<CircularRadialGaugeProps> = ({
  animationDuration: _animationDuration = 90,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  gradientColors = ["#7c3aed", "#3b82f6"],
  max: _max,
  showCard = true,
  theme: themeOverride,
  title: _title = "",
  value,
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80);
  const cx = chartWidth / 2;
  const cy = chartHeight / 2;
  const radius = Math.min(chartWidth, chartHeight) * 0.38;

  const tickCount = 60;
  const tickProgress = useStaggeredReveal({
    baseDelay: 0,
    count: tickCount,
    itemDuration: 10,
    stagger: 2,
  });

  const counter = useAnimatedCounter({
    delay: 40,
    duration: 60,
    end: value,
    springConfig: { damping: 10, mass: 0.6, stiffness: 100 },
  });

  const blobScale = spring({
    config: { damping: 12, mass: 0.5, stiffness: 80 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const ticks = useMemo(() => {
    return Array.from({ length: tickCount }, (_, i) => {
      const angle = (i / tickCount) * 360;
      const rad = (angle * Math.PI) / 180;
      const isMajor = i % 15 === 0;
      const innerR = isMajor ? radius - 20 : radius - 12;
      const outerR = radius - 4;
      return {
        angle,
        isMajor,
        x1: cx + innerR * Math.cos(rad),
        x2: cx + outerR * Math.cos(rad),
        y1: cy + innerR * Math.sin(rad),
        y2: cy + outerR * Math.sin(rad),
      };
    });
  }, [cx, cy, radius]);

  const innerContent = (
    <svg
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width={chartWidth}
    >
      <defs>
        <radialGradient cx="50%" cy="50%" id="gaugeGradient" r="50%">
          <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.8} />
          <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0.3} />
        </radialGradient>
      </defs>

      {/* Center gradient blob */}
      <circle
        cx={cx}
        cy={cy}
        fill="url(#gaugeGradient)"
        r={radius * 0.55 * blobScale}
        style={{ opacity: 0.7 }}
      />

      {/* Tick marks */}
      {ticks.map((tick, i) => (
        <line
          key={`tick-${i}`}
          opacity={tickProgress[i]}
          stroke={tick.isMajor ? "#ffffff" : "#555566"}
          strokeLinecap="round"
          strokeWidth={tick.isMajor ? 2 : 1}
          x1={tick.x1}
          x2={tick.x2}
          y1={tick.y1}
          y2={tick.y2}
        />
      ))}

      {/* Numbers */}
      {[0, 25, 50, 75].map((num, i) => {
        const angle = (i / 4) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const nr = radius - 30;
        return (
          <text
            fill={theme.secondaryTextColor}
            fontFamily={fontFamily}
            fontSize={12}
            fontWeight={500}
            key={`num-${i}`}
            textAnchor="middle"
            x={cx + nr * Math.cos(rad)}
            y={cy + nr * Math.sin(rad) + 5}
          >
            {num}
          </text>
        );
      })}

      {/* Center percentage */}
      <text
        fill="#ffffff"
        fontFamily={fontFamily}
        fontSize={52}
        fontWeight={700}
        textAnchor="middle"
        x={cx}
        y={cy + 10}
      >
        {`${Math.round(counter)}%`}
      </text>
    </svg>
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
        <div style={{ opacity: exitProgress, width: "100%" }}>
          {innerContent}
        </div>
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
          opacity: exitProgress,
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
