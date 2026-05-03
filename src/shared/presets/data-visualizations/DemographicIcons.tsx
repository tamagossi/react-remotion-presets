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

export type DemographicIconsProps = BaseChartProps & {
  groups: {
    color: string;
    icon: "person" | "woman";
    label: string;
    value: number;
  }[];
};

export const DemographicIcons: React.FC<DemographicIconsProps> = ({
  animationDuration: _animationDuration = 90,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  groups,
  showCard = true,
  theme: themeOverride,
  title,
  titleColor,
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const chartWidth = width - (showCard ? cardPadding * 2 : 80);
  const chartHeight = height - (showCard ? cardPadding * 2 : 80);
  const gap = chartWidth / (groups.length + 1);

  const titleOpacity = spring({
    config: { damping: 12, mass: 0.5, stiffness: 100 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const lastEntryEndFrame = (groups.length - 1) * 10 + 65;
  const exitStartFrame = Math.max(durationInFrames - 20, lastEntryEndFrame + 5);
  const exitProgress = interpolate(
    frame,
    [exitStartFrame, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const innerContent = (
    <svg
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width={chartWidth}
    >
      {title ? (
        <text
          fill={titleColor ?? theme.primaryTextColor}
          fontFamily={fontFamily}
          fontSize={28}
          fontWeight={700}
          letterSpacing={2}
          opacity={titleOpacity}
          textAnchor="middle"
          x={chartWidth / 2}
          y={50}
        >
          {title}
        </text>
      ) : null}
      {groups.map((group, i) => {
        const cx = gap * (i + 1);
        const cy = chartHeight * 0.48;
        const iconScale = spring({
          config: { damping: 12, mass: 0.5, stiffness: 100 },
          fps,
          frame: Math.max(0, frame - i * 10),
          from: 0,
          to: 1,
        });

        const counter = interpolate(
          frame,
          [i * 10 + 15, i * 10 + 65],
          [0, group.value],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <g key={`group-${i}`}>
            {/* Icon silhouette */}
            <g transform={`translate(${cx}, ${cy}) scale(${iconScale})`}>
              {group.icon === "person" ? (
                <g>
                  <circle cx={0} cy={-40} fill={group.color} r={18} />
                  <path
                    d="M-30,20 Q-30,-10 0,-10 Q30,-10 30,20 L30,80 L-30,80 Z"
                    fill={group.color}
                  />
                </g>
              ) : (
                <g>
                  <circle cx={0} cy={-40} fill={group.color} r={18} />
                  <path
                    d="M-25,20 Q-25,-5 0,-5 Q25,-5 25,20 L25,70 L15,70 L15,90 L-15,90 L-15,70 L-25,70 Z"
                    fill={group.color}
                  />
                </g>
              )}
            </g>

            {/* Percentage */}
            <text
              fill="#ffffff"
              fontFamily={fontFamily}
              fontSize={36}
              fontWeight={700}
              textAnchor="end"
              x={cx - 45}
              y={cy + 8}
            >
              {`${Math.round(counter)}%`}
            </text>

            {/* Label */}
            <text
              fill="#ffffff"
              fontFamily={fontFamily}
              fontSize={24}
              fontWeight={700}
              textAnchor="end"
              x={cx - 45}
              y={cy + 38}
            >
              {group.label}
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
