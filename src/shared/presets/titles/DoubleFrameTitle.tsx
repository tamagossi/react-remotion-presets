import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type DoubleFrameTitleProps = {
  lines: string[];
  subtitle?: string;
  outerBorderColor?: string;
  innerBorderColor?: string;
  borderThickness?: number;
  boxPadding?: number;
  boxWidth?: number;
  animationDuration?: number;
  animationDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  fontFamily?: string;
  secondaryFontFamily?: string;
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textLetterSpacing?: number;
  subtitleColor?: string;
  subtitleFontSize?: number;
  subtitleLetterSpacing?: number;
  startFrame?: number;
  exitDuration?: number;
  holdDuration?: number;
};

export const DoubleFrameTitle: React.FC<DoubleFrameTitleProps> = ({
  animationDuration = 45,
  borderThickness = 2,
  boxPadding = 40,
  boxWidth = 600,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 0,
  fontFamily = "Oswald",
  holdDuration = 0,
  innerBorderColor = "#ffffff",
  lines = ["DOUBLE FRAME"],
  outerBorderColor = "#c9a96e",
  secondaryFontFamily = "Montserrat",
  startFrame = 0,
  subtitle = "PREMIUM",
  subtitleColor = "#909090",
  subtitleFontSize = 20,
  subtitleLetterSpacing = 0.2,
  textColor = "#ffffff",
  textFontSize = 64,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const outerStart = startFrame;
  const outerEnd = outerStart + animationDuration * 0.4;
  const innerStart = startFrame + animationDuration * 0.2;
  const innerEnd = innerStart + animationDuration * 0.5;
  const textStart = startFrame + animationDuration * 0.3;
  const textEnd = textStart + animationDuration * 0.7;

  const outerT = interpolate(frame, [outerStart, outerEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const innerT = interpolate(frame, [innerStart, innerEnd], [0, 1], {
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

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignItems: "center",
          borderColor: outerBorderColor,
          borderRadius: 0,
          borderStyle: "solid",
          borderWidth: borderThickness,
          display: "flex",
          justifyContent: "center",
          opacity: outerT * exitT,
          padding: boxPadding + 12,
          transform: `scale(${0.9 + outerT * 0.1})`,
          width: boxWidth + 24,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderColor: innerBorderColor,
            borderRadius: 0,
            borderStyle: "solid",
            borderWidth: borderThickness,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            justifyContent: "center",
            opacity: innerT * exitT,
            padding: boxPadding,
            width: boxWidth,
          }}
        >
          <div
            style={{
              color: textColor,
              fontFamily,
              fontSize: textFontSize,
              fontWeight: textFontWeight,
              letterSpacing: `${textLetterSpacing}em`,
              lineHeight: 0.95,
              opacity: textT * exitT,
              textAlign: "center",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              textTransform: "uppercase",
            }}
          >
            {lines[0]}
          </div>
          {subtitle && (
            <div
              style={{
                color: subtitleColor,
                fontFamily: secondaryFontFamily,
                fontSize: subtitleFontSize,
                fontWeight: 400,
                letterSpacing: `${subtitleLetterSpacing}em`,
                opacity: textT * exitT,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
