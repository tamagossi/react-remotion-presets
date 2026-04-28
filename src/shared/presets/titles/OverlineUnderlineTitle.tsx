import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type OverlineUnderlineTitleProps = {
  lines: string[];
  overline?: string;
  accentColor?: string;
  accentThickness?: number;
  accentWidth?: number;
  animationDuration?: number;
  animationDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  fontFamily?: string;
  secondaryFontFamily?: string;
  overlineColor?: string;
  overlineFontSize?: number;
  overlineLetterSpacing?: number;
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textLetterSpacing?: number;
  startFrame?: number;
  exitDuration?: number;
  holdDuration?: number;
};

export const OverlineUnderlineTitle: React.FC<OverlineUnderlineTitleProps> = ({
  accentColor = "#c9a96e",
  accentThickness = 3,
  accentWidth = 180,
  animationDirection = "down",
  animationDuration = 45,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 0,
  fontFamily = "Oswald",
  holdDuration = 0,
  lines = ["OVERLINE"],
  overline = "EST. 2024",
  overlineColor = "#a0a0a0",
  overlineFontSize = 20,
  overlineLetterSpacing = 0.25,
  secondaryFontFamily = "Montserrat",
  startFrame = 0,
  textColor = "#ffffff",
  textFontSize = 84,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const getTranslate = (t: number, dir: "down" | "left" | "right" | "up") => {
    const dist = (1 - t) * 25;
    switch (dir) {
      case "down":
        return { x: 0, y: -dist };
      case "left":
        return { x: dist, y: 0 };
      case "right":
        return { x: -dist, y: 0 };
      case "up":
      default:
        return { x: 0, y: dist };
    }
  };

  const overlineStart = startFrame;
  const overlineEnd = overlineStart + animationDuration * 0.4;
  const textStart = startFrame + animationDuration * 0.25;
  const textEnd = textStart + animationDuration * 0.7;
  const underlineStart = startFrame + animationDuration * 0.6;
  const underlineEnd = underlineStart + animationDuration * 0.5;

  const overlineT = interpolate(frame, [overlineStart, overlineEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textT = interpolate(frame, [textStart, textEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const underlineT = interpolate(
    frame,
    [underlineStart, underlineEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const entryEnd = startFrame + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitT = exitDuration > 0
    ? interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0], {
        easing: Easing.bezier(...easing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          color: overlineColor,
          fontFamily: secondaryFontFamily,
          fontSize: overlineFontSize,
          fontWeight: 500,
          letterSpacing: `${overlineLetterSpacing}em`,
          opacity: overlineT * exitT,
          textTransform: "uppercase",
          transform: `translate3d(${getTranslate(overlineT, animationDirection).x}px, ${getTranslate(overlineT, animationDirection).y}px, 0)`,
        }}
      >
        {overline}
      </div>
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
            transform: `translate3d(${getTranslate(textT, animationDirection).x}px, ${getTranslate(textT, animationDirection).y}px, 0)`,
          }}
        >
          {lines[0]}
        </div>
        <div
          style={{
            backgroundColor: accentColor,
            height: accentThickness,
            left: 0,
            opacity: underlineT * exitT,
            position: "absolute",
            top: textFontSize + 10,
            transform: `scaleX(${underlineT})`,
            transformOrigin: "left",
            width: accentWidth,
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
};