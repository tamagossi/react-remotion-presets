import React from "react";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import { BaseChartProps } from "./types";
import { formatNumber, useAnimatedCounter } from "./utils/animations";

export type ProgressBarCardProps = BaseChartProps & {
  barColors?: string[];
  currentValue: number;
  maxValue: number;
  prefix?: string;
  suffix?: string;
};

export const ProgressBarCard: React.FC<ProgressBarCardProps> = ({
  animationDuration: _animationDuration = 90,
  backgroundColor = "#e8e8e8",
  barColors = ["#ef4444", "#f97316", "#eab308", "#22c55e"],
  cardBackgroundColor = "#f0f0f0",
  cardBorderRadius = 12,
  cardPadding = 40,
  currentValue,
  easing: _easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  maxValue,
  prefix = "$",
  showCard = true,
  suffix = "",
  theme: _themeOverride,
  title = "COMPANY CAPITAL",
  titleColor = "#888888",
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, height, width } = useVideoConfig();

  const counter = useAnimatedCounter({
    delay: 10,
    duration: 70,
    end: currentValue,
  });

  const percentage = Math.round((currentValue / maxValue) * 100);
  const percentageCounter = useAnimatedCounter({
    delay: 10,
    duration: 70,
    end: percentage,
  });

  const barProgress = interpolate(
    frame,
    [20, 90],
    [0, currentValue / maxValue],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const innerContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          color: titleColor,
          fontFamily,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.05em",
          marginBottom: 16,
          textTransform: "uppercase",
          opacity: interpolate(frame, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
          }),
        }}
      >
        {title}
      </div>

      <div
        style={{
          alignItems: "baseline",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            color: "#888888",
            fontFamily,
            fontSize: 56,
            fontWeight: 700,
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
            }),
          }}
        >
          {formatNumber(Math.round(counter), prefix, suffix)}
        </span>
        <span
          style={{
            color: "#ef4444",
            fontFamily,
            fontSize: 28,
            fontWeight: 700,
            opacity: interpolate(frame, [5, 20], [0, 1], {
              extrapolateLeft: "clamp",
            }),
          }}
        >
          {Math.round(percentageCounter)}
          <span style={{ fontSize: 18 }}>%</span>
        </span>
      </div>

      <div
        style={{
          backgroundColor: "#dddddd",
          borderRadius: 8,
          height: 32,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          style={{
            background: `linear-gradient(90deg, ${barColors.join(", ")})`,
            borderRadius: 8,
            height: "100%",
            transform: `scaleX(${barProgress})`,
            transformOrigin: "left",
            width: "100%",
          }}
        />
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
