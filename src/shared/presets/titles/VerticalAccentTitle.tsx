import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type VerticalAccentTitleProps = {
  lines: string[];
  accentColor?: string;
  accentThickness?: number;
  accentHeight?: number;
  animationDuration?: number;
  animationDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  fontFamily?: string;
  secondaryFontFamily?: string;
  smallTextColor?: string;
  smallTextFontSize?: number;
  smallTextLetterSpacing?: number;
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textLetterSpacing?: number;
  startFrame?: number;
  showExitAnimation?: boolean;
};

export const VerticalAccentTitle: React.FC<VerticalAccentTitleProps> = ({
  accentColor = "#c9a96e",
  accentHeight = 160,
  accentThickness = 3,
  animationDirection: _animationDirection = "right",
  animationDuration = 45,
  easing = [0.34, 1.56, 0.64, 1],
  fontFamily = "Oswald",
  lines = ["VERTICAL"],
  secondaryFontFamily = "Montserrat",
  showExitAnimation = false,
  smallTextColor = "#a0a0a0",
  smallTextFontSize = 24,
  smallTextLetterSpacing = 0.2,
  startFrame = 0,
  textColor = "#ffffff",
  textFontSize = 96,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const accentStart = startFrame;
  const accentEnd = accentStart + animationDuration * 0.4;
  const smallTextStart = startFrame + animationDuration * 0.25;
  const smallTextEnd = smallTextStart + animationDuration * 0.5;
  const textStart = startFrame + animationDuration * 0.35;
  const textEnd = textStart + animationDuration * 0.7;

  const accentT = interpolate(frame, [accentStart, accentEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const smallTextT = interpolate(frame, [smallTextStart, smallTextEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textT = interpolate(frame, [textStart, textEnd], [0, 1], {
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
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        gap: 20,
      }}
    >
      <div
        style={{
          backgroundColor: accentColor,
          height: accentHeight * accentT,
          opacity: accentT * exitT,
          transform: `translate3d(0, ${(1 - accentT) * 25}px, 0)`,
          width: accentThickness,
          willChange: "height, opacity, transform",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            color: smallTextColor,
            fontFamily: secondaryFontFamily,
            fontSize: smallTextFontSize,
            fontWeight: 500,
            letterSpacing: `${smallTextLetterSpacing}em`,
            opacity: smallTextT * exitT,
            textTransform: "uppercase",
          }}
        >
          {lines[1] || "ACCENT"}
        </div>
        <div
          style={{
            color: textColor,
            fontFamily,
            fontSize: textFontSize,
            fontWeight: textFontWeight,
            letterSpacing: `${textLetterSpacing}em`,
            lineHeight: 0.9,
            opacity: textT * exitT,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            textTransform: "uppercase",
          }}
        >
          {lines[0]}
        </div>
      </div>
    </div>
  );
};