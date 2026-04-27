import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type ExclusiveLabelTitleProps = {
  lines: string[];
  label?: string;
  accentColor?: string;
  accentThickness?: number;
  accentWidth?: number;
  animationDuration?: number;
  animationDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  fontFamily?: string;
  secondaryFontFamily?: string;
  labelColor?: string;
  labelFontSize?: number;
  labelLetterSpacing?: number;
  labelTextTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textLetterSpacing?: number;
  startFrame?: number;
  showExitAnimation?: boolean;
};

export const ExclusiveLabelTitle: React.FC<ExclusiveLabelTitleProps> = ({
  accentColor = "#c9a96e",
  accentThickness = 2,
  accentWidth = 100,
  animationDirection = "right",
  animationDuration = 45,
  easing = [0.34, 1.56, 0.64, 1],
  fontFamily = "Oswald",
  label = "EXCLUSIVE",
  labelColor = "#b0b0b0",
  labelFontSize = 20,
  labelLetterSpacing = 0.25,
  labelTextTransform = "uppercase",
  lines = ["HEADLINE"],
  secondaryFontFamily = "Montserrat",
  showExitAnimation = false,
  startFrame = 0,
  textColor = "#ffffff",
  textFontSize = 80,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const getTranslate = (t: number) => {
    const dist = (1 - t) * 50;
    switch (animationDirection) {
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

  const labelStart = startFrame;
  const labelEnd = labelStart + animationDuration * 0.5;
  const textStart = startFrame + animationDuration * 0.3;
  const textEnd = textStart + animationDuration * 0.8;
  const barStart = startFrame + animationDuration * 0.5;
  const barEnd = barStart + animationDuration * 0.5;

  const labelT = interpolate(frame, [labelStart, labelEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textT = interpolate(frame, [textStart, textEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barT = interpolate(frame, [barStart, barEnd], [0, 1], {
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

  const labelStyle: React.CSSProperties = {
    color: labelColor,
    fontFamily: secondaryFontFamily,
    fontSize: labelFontSize,
    fontWeight: 500,
    letterSpacing: `${labelLetterSpacing}em`,
    opacity: labelT * exitT,
    textTransform: labelTextTransform,
    transform: `translate3d(${getTranslate(labelT).x}px, ${getTranslate(labelT).y}px, 0)`,
  };

  const textStyle: React.CSSProperties = {
    color: textColor,
    fontFamily,
    fontSize: textFontSize,
    fontWeight: textFontWeight,
    letterSpacing: `${textLetterSpacing}em`,
    lineHeight: 0.95,
    opacity: textT * exitT,
    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
    transform: `translate3d(${getTranslate(textT).x}px, ${getTranslate(textT).y}px, 0)`,
  };

  return (
    <div
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={labelStyle}>{label}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ position: "relative" }}>
            <span style={{ ...textStyle, position: "relative", zIndex: 1 }}>
              {line}
            </span>
            <div
              style={{
                backgroundColor: accentColor,
                bottom: -6,
                height: accentThickness,
                left: 0,
                opacity: barT * exitT,
                position: "absolute",
                transform: `scaleX(${barT * 0.25})`,
                transformOrigin: "left",
                width: accentWidth,
                willChange: "transform",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};