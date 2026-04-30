import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type GiantInitialTitleProps = {
  lines: string[];
  initial?: string;
  initialColor?: string;
  lineColor?: string;
  lineThickness?: number;
  lineWidth?: number;
  animationDuration?: number;
  animationDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  fontFamily?: string;
  secondaryFontFamily?: string;
  initialFontSize?: number;
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textLetterSpacing?: number;
  startFrame?: number;
  exitDuration?: number;
  holdDuration?: number;
};

export const GiantInitialTitle: React.FC<GiantInitialTitleProps> = ({
  animationDirection: _animationDirection = "right",
  animationDuration = 45,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 0,
  fontFamily = "Oswald",
  holdDuration = 0,
  initial = "G",
  initialColor = "#c9a96e",
  initialFontSize = 180,
  lineColor = "#ffffff",
  lines = ["GIANT INITIAL"],
  lineThickness = 2,
  lineWidth = 180,
  secondaryFontFamily: _secondaryFontFamily = "Montserrat",
  startFrame = 0,
  textColor = "#ffffff",
  textFontSize = 42,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const initialStart = startFrame;
  const initialEnd = initialStart + animationDuration * 0.5;
  const lineStart = startFrame + animationDuration * 0.3;
  const lineEnd = lineStart + animationDuration * 0.4;
  const textStart = startFrame + animationDuration * 0.35;
  const textEnd = textStart + animationDuration * 0.65;

  const initialT = interpolate(frame, [initialStart, initialEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineT = interpolate(frame, [lineStart, lineEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textT = interpolate(frame, [textStart, textEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const entryEnd = startFrame + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitT =
    exitDuration > 0
      ? interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0], {
          easing: Easing.bezier(...easing),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const rotate = (1 - initialT) * -4;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        gap: 20,
      }}
    >
      <div
        style={{
          color: initialColor,
          fontFamily,
          fontSize: initialFontSize,
          fontWeight: 700,
          lineHeight: 0.8,
          opacity: initialT * exitT,
          textShadow: "0 4px 30px rgba(0,0,0,0.4)",
          transform: `translate3d(${(1 - initialT) * 25}px, 0, 0) rotate(${rotate}deg) scale(${0.5 + initialT * 0.5})`,
          transformOrigin: "left center",
          willChange: "transform, opacity",
        }}
      >
        {initial}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            backgroundColor: lineColor,
            height: lineThickness,
            opacity: lineT * exitT,
            transform: `scaleX(${lineT})`,
            transformOrigin: "left",
            width: lineWidth,
            willChange: "transform",
          }}
        />
        <div
          style={{
            color: textColor,
            fontFamily,
            fontSize: textFontSize,
            fontWeight: textFontWeight,
            letterSpacing: `${textLetterSpacing}em`,
            lineHeight: 1.2,
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
