import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type ControllersUnderlineTitleProps = {
  lines: string[];
  subtitle?: string;
  accentColor?: string;
  accentThickness?: number;
  animationDuration?: number;
  animationDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  fontFamily?: string;
  secondaryFontFamily?: string;
  subtitleColor?: string;
  subtitleFontSize?: number;
  subtitleFontWeight?: number;
  subtitleLetterSpacing?: number;
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textLetterSpacing?: number;
  startFrame?: number;
  exitDuration?: number;
  holdDuration?: number;
};

export const ControllersUnderlineTitle: React.FC<
  ControllersUnderlineTitleProps
> = ({
  accentColor = "#c9a96e",
  accentThickness = 3,
  animationDirection: _animationDirection = "up",
  animationDuration = 45,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 0,
  fontFamily = "Oswald",
  holdDuration = 0,
  lines = ["CONTROLLERS"],
  secondaryFontFamily = "Montserrat",
  startFrame = 0,
  subtitle = "Premium Gaming Gear",
  subtitleColor = "#a0a0a0",
  subtitleFontSize = 22,
  subtitleFontWeight = 400,
  subtitleLetterSpacing = 0.12,
  textColor = "#ffffff",
  textFontSize = 84,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const textStart = startFrame;
  const textEnd = textStart + animationDuration * 0.7;
  const subtitleStart = startFrame + animationDuration * 0.5;
  const subtitleEnd = subtitleStart + animationDuration * 0.6;
  const underlineStart = startFrame + animationDuration * 0.6;
  const underlineEnd = underlineStart + animationDuration * 0.5;

  const textT = interpolate(frame, [textStart, textEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleT = interpolate(frame, [subtitleStart, subtitleEnd], [0, 1], {
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

  const scale = 0.9 + textT * 0.1;
  const yOffset = (1 - textT) * 30;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 12,
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
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          transform: `translate3d(0, ${yOffset}px, 0) scale(${scale})`,
        }}
      >
        {lines[0]}
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            backgroundColor: accentColor,
            height: accentThickness,
            opacity: underlineT * exitT,
            transform: `scaleX(${underlineT})`,
            transformOrigin: "center",
            width: 160,
            willChange: "transform",
          }}
        />
        <div
          style={{
            color: subtitleColor,
            fontFamily: secondaryFontFamily,
            fontSize: subtitleFontSize,
            fontWeight: subtitleFontWeight,
            letterSpacing: `${subtitleLetterSpacing}em`,
            opacity: subtitleT * exitT,
            transform: `translate3d(0, ${(1 - subtitleT) * 15}px, 0)`,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};