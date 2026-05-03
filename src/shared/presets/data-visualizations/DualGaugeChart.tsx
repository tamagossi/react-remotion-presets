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
    suffix?: string;
    value: number;
  };
  gauge2: {
    color: string;
    label: string;
    max: number;
    suffix?: string;
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

  const chartWidth = width - (showCard ? 80 + cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? 80 + cardPadding * 2 : 80);
  const titleHeight = title ? 56 : 0;
  const gaugeSvgHeight = chartHeight - titleHeight;
  const centerY = gaugeSvgHeight * 0.48;
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

  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
  });
  const titleTranslateY = interpolate(frame, [5, 25], [15, 0], {
    extrapolateLeft: "clamp",
  });

  const gaugePositions = [
    { cx: chartWidth * 0.28, data: gauge1 },
    { cx: chartWidth * 0.72, data: gauge2 },
  ];

  const innerContent = (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {title && (
        <div
          style={{
            color: titleColor,
            flexShrink: 0,
            fontFamily,
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 12,
            opacity: titleOpacity,
            textAlign: "center",
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          {title}
        </div>
      )}
      <svg
        height="100%"
        viewBox={`0 0 ${chartWidth} ${gaugeSvgHeight}`}
        width="100%"
      >
        <defs>
          <filter height="200%" id="arcGlow" width="200%" x="-50%" y="-50%">
            <feGaussianBlur result="blur" stdDeviation="4" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
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

          const labelEntryProgress = interpolate(
            frame,
            [isFirst ? 55 : 65, isFirst ? 75 : 85],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          const tickBaseDelay = isFirst ? 15 : 25;

          return (
            <g key={`gauge-${i}`}>
              {/* Inner rim ring */}
              <path
                fill="none"
                opacity={0.3}
                stroke={theme.cardBorderColor}
                strokeLinecap="round"
                strokeWidth={1}
                d={arcPath(
                  arcStart,
                  arcEnd,
                  g.cx,
                  centerY,
                  radius - strokeWidth / 2 - 4,
                )}
              />

              {/* Background arc */}
              <path
                d={arcPath(arcStart, arcEnd, g.cx, centerY, radius)}
                fill="none"
                stroke={theme.cardBorderColor}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
              />

              {/* Active arc glow */}
              <path
                d={arcPath(arcStart, currentArcEnd, g.cx, centerY, radius)}
                fill="none"
                opacity={0.18}
                stroke={g.data.color}
                strokeLinecap="round"
                strokeWidth={strokeWidth + 10}
              />

              {/* Active arc */}
              <path
                d={arcPath(arcStart, currentArcEnd, g.cx, centerY, radius)}
                fill="none"
                filter="url(#arcGlow)"
                stroke={g.data.color}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
              />

              {/* Tick marks */}
              {Array.from({ length: 11 }, (_, tickIdx) => {
                const isMajor = tickIdx % 5 === 0;
                const outerR =
                  radius + strokeWidth / 2 + (isMajor ? 14 : 10);
                const tickAngle =
                  arcStart + arcLength * (tickIdx / 10);
                const tickInnerR = radius + strokeWidth / 2 + 4;
                const tickOpacity = interpolate(
                  frame,
                  [
                    tickBaseDelay + tickIdx * 2,
                    tickBaseDelay + tickIdx * 2 + 12,
                  ],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                );
                const tx1 =
                  g.cx + tickInnerR * Math.cos(tickAngle);
                const tx2 = g.cx + outerR * Math.cos(tickAngle);
                const ty1 =
                  centerY + tickInnerR * Math.sin(tickAngle);
                const ty2 = centerY + outerR * Math.sin(tickAngle);

                return (
                  <line
                    key={`tick-${i}-${tickIdx}`}
                    opacity={tickOpacity}
                    stroke={isMajor ? "#ffffff" : "#555566"}
                    strokeLinecap="round"
                    strokeWidth={isMajor ? 2 : 1}
                    x1={tx1}
                    x2={tx2}
                    y1={ty1}
                    y2={ty2}
                  />
                );
              })}

              {/* Endpoint labels */}
              {[0, 50, 100].map((pct) => {
                const labelR = radius + strokeWidth / 2 + 28;
                const lx =
                  g.cx +
                  labelR *
                    Math.cos(
                      arcStart +
                        arcLength * (pct / 100),
                    );
                const ly =
                  centerY +
                  labelR *
                    Math.sin(
                      arcStart +
                        arcLength * (pct / 100),
                    ) +
                  4;
                const pctOpacity = interpolate(
                  frame,
                  [tickBaseDelay + 20, tickBaseDelay + 35],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                );

                return (
                  <text
                    dominantBaseline="middle"
                    fill={theme.secondaryTextColor}
                    fontFamily={fontFamily}
                    fontSize={11}
                    fontWeight={500}
                    key={`pct-${i}-${pct}`}
                    opacity={pctOpacity}
                    textAnchor="middle"
                    x={lx}
                    y={ly}
                  >
                    {pct}
                  </text>
                );
              })}

              {/* Needle */}
              <g
                transform={`rotate(${(angle * 180) / Math.PI + 90}, ${g.cx}, ${centerY})`}
              >
                <polygon
                  fill="#ffffff"
                  points={`${g.cx - 2},${centerY + 6} ${g.cx + 2},${centerY + 6} ${g.cx},${centerY - radius - 8}`}
                />
                <circle
                  cx={g.cx}
                  cy={centerY}
                  fill="#ffffff"
                  r={5}
                  stroke={g.data.color}
                  strokeWidth={2}
                />
              </g>

              {/* Center value */}
              <text
                dominantBaseline="middle"
                fill="#ffffff"
                fontFamily={fontFamily}
                fontSize={42}
                fontWeight={700}
                textAnchor="middle"
                x={g.cx}
                y={centerY + 12}
              >
                {Math.round(counter)}
                <tspan
                  fill={theme.secondaryTextColor}
                  fontSize={16}
                  fontWeight={500}
                >
                  {g.data.suffix ?? "%"}
                </tspan>
              </text>

              {/* Label */}
              <g
                opacity={labelEntryProgress}
                transform={`translate(0, ${8 * (1 - labelEntryProgress)})`}
              >
                <text
                  dominantBaseline="middle"
                  fill={theme.secondaryTextColor}
                  fontFamily={fontFamily}
                  fontSize={14}
                  fontWeight={600}
                  letterSpacing="0.05em"
                  style={{ textTransform: "uppercase" }}
                  textAnchor="middle"
                  x={g.cx}
                  y={centerY + radius + 52}
                >
                  {g.data.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
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
        <div style={{ height: "100%", opacity: exitProgress, width: "100%" }}>
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
          display: "flex",
          flexDirection: "column",
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
