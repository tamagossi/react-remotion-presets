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
import { useAnimatedCounter } from "./utils/animations";

export type DualGaugeChartProps = BaseChartProps & {
  gauge1: {
    color: string;
    label: string;
    max: number;
    value: number;
  };
  gauge2: {
    color: string;
    label: string;
    max: number;
    value: number;
  };
};

export const DualGaugeChart: React.FC<DualGaugeChartProps> = ({
  animationDuration: _animationDuration = 90,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  gauge1,
  gauge2,
  showCard = true,
  theme: themeOverride,
  title = "",
  titleColor = "#ffffff",
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80);
  const centerY = chartHeight * 0.55;
  const radius = Math.min(chartWidth, chartHeight) * 0.32;
  const strokeWidth = 24;

  const arcStart = Math.PI;
  const arcEnd = 2 * Math.PI;
  const arcLength = arcEnd - arcStart;

  const counter1 = useAnimatedCounter({
    delay: 20,
    duration: 60,
    end: gauge1.value,
    springConfig: { damping: 12, mass: 0.8, stiffness: 80 },
  });

  const counter2 = useAnimatedCounter({
    delay: 30,
    duration: 60,
    end: gauge2.value,
    springConfig: { damping: 12, mass: 0.8, stiffness: 80 },
  });

  const needleAngle1 = useMemo(() => {
    const progress = spring({
      config: { damping: 12, mass: 0.8, stiffness: 80 },
      fps,
      frame: Math.max(0, frame - 20),
      from: 0,
      to: 1,
    });
    return arcStart + arcLength * progress * (gauge1.value / gauge1.max);
  }, [arcLength, arcStart, fps, frame, gauge1.max, gauge1.value]);

  const needleAngle2 = useMemo(() => {
    const progress = spring({
      config: { damping: 12, mass: 0.8, stiffness: 80 },
      fps,
      frame: Math.max(0, frame - 30),
      from: 0,
      to: 1,
    });
    return arcStart + arcLength * progress * (gauge2.value / gauge2.max);
  }, [arcLength, arcStart, fps, frame, gauge2.max, gauge2.value]);

  const arcPath = (
    start: number,
    end: number,
    cx: number,
    cy: number,
    r: number,
  ) => {
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const gaugePositions = [
    { cx: chartWidth * 0.28, data: gauge1 },
    { cx: chartWidth * 0.72, data: gauge2 },
  ];

  const innerContent = (
    <svg
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width={chartWidth}
    >
      {title && (
        <text
          fill={titleColor}
          fontFamily={fontFamily}
          fontSize={20}
          fontWeight={600}
          textAnchor="middle"
          x={chartWidth / 2}
          y={36}
        >
          {title}
        </text>
      )}
      {gaugePositions.map((g, i) => {
        const isFirst = i === 0;
        const angle = isFirst ? needleAngle1 : needleAngle2;
        const counter = isFirst ? counter1 : counter2;
        const arcProgress = interpolate(
          frame,
          [isFirst ? 20 : 30, isFirst ? 80 : 90],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const currentArcEnd =
          arcStart + arcLength * arcProgress * (g.data.value / g.data.max);

        return (
          <g key={`gauge-${i}`}>
            {/* Background arc */}
            <path
              d={arcPath(arcStart, arcEnd, g.cx, centerY, radius)}
              fill="none"
              stroke={theme.cardBorderColor}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />

            {/* Active arc */}
            <path
              d={arcPath(arcStart, currentArcEnd, g.cx, centerY, radius)}
              fill="none"
              stroke={g.data.color}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />

            {/* Needle */}
            <g
              transform={`rotate(${(angle * 180) / Math.PI - 90}, ${g.cx}, ${centerY})`}
            >
              <polygon
                fill="#ffffff"
                points={`${g.cx - 6},${centerY - radius + 12} ${g.cx + 6},${centerY - radius + 12} ${g.cx},${centerY - radius - 8}`}
              />
            </g>

            {/* Center value */}
            <text
              fill="#ffffff"
              fontFamily={fontFamily}
              fontSize={42}
              fontWeight={700}
              textAnchor="middle"
              x={g.cx}
              y={centerY + 16}
            >
              {Math.round(counter)}
            </text>

            {/* Label */}
            <text
              fill={theme.secondaryTextColor}
              fontFamily={fontFamily}
              fontSize={12}
              fontWeight={500}
              textAnchor="middle"
              x={g.cx}
              y={centerY + radius + 40}
            >
              {g.data.label}
            </text>
          </g>
        );
      })}
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
