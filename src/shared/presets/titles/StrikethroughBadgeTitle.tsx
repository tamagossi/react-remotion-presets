import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type StrikethroughBadgeTitleProps = {
  lines: string[];
  badge?: string;
  lineColor?: string;
  lineThickness?: number;
  animationDuration?: number;
  animationDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  fontFamily?: string;
  secondaryFontFamily?: string;
  badgeColor?: string;
  badgeFontSize?: number;
  badgePaddingX?: number;
  badgePaddingY?: number;
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textLetterSpacing?: number;
  startFrame?: number;
  showExitAnimation?: boolean;
};

export const StrikethroughBadgeTitle: React.FC<StrikethroughBadgeTitleProps> = ({
  animationDuration = 45,
  badge = "NEW",
  badgeColor = "#c9a96e",
  badgeFontSize = 16,
  badgePaddingX = 14,
  badgePaddingY = 5,
  easing = [0.34, 1.56, 0.64, 1],
  fontFamily = "Oswald",
  lineColor = "#ffffff",
  lines = ["STRIKETHROUGH"],
  lineThickness = 2,
  secondaryFontFamily = "Montserrat",
  showExitAnimation = false,
  startFrame = 0,
  textColor = "#ffffff",
  textFontSize = 64,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const textStart = startFrame;
  const textEnd = textStart + animationDuration * 0.7;
  const strikeStart = startFrame + animationDuration * 0.35;
  const strikeEnd = strikeStart + animationDuration * 0.45;
  const badgeStart = startFrame + animationDuration * 0.55;
  const badgeEnd = badgeStart + animationDuration * 0.5;

  const textT = interpolate(frame, [textStart, textEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strikeT = interpolate(frame, [strikeStart, strikeEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeT = interpolate(frame, [badgeStart, badgeEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitT = showExitAnimation
    ? interpolate(
        frame,
        [frame - 30, frame - 15],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 1;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ position: "relative" }}>
        <div
          style={{
            color: textColor,
            fontFamily,
            fontSize: textFontSize,
            fontWeight: textFontWeight,
            letterSpacing: `${textLetterSpacing}em`,
            lineHeight: 0.95,
            opacity: textT * exitT,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            textTransform: "uppercase",
            transform: `translate3d(0, ${(1 - textT) * 25}px, 0)`,
          }}
        >
          {lines[0]}
        </div>
        <div
          style={{
            backgroundColor: lineColor,
            height: lineThickness,
            left: 0,
            opacity: strikeT * exitT,
            position: "absolute",
            top: "50%",
            transform: `scaleX(${strikeT}) translateY(-50%)`,
            transformOrigin: "center",
            width: "100%",
            willChange: "transform",
          }}
        />
      </div>
      {badge && (
        <div
          style={{
            alignItems: "center",
            backgroundColor: badgeColor,
            borderRadius: 3,
            display: "flex",
            opacity: badgeT * exitT,
            padding: `${badgePaddingY}px ${badgePaddingX}px`,
            transform: `scale(${0.8 + badgeT * 0.2})`,
          }}
        >
          <div
            style={{
              color: "#0f0f0f",
              fontFamily: secondaryFontFamily,
              fontSize: badgeFontSize,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </div>
        </div>
      )}
    </div>
  );
};