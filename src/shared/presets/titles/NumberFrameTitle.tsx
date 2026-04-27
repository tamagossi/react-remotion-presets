import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type NumberFrameTitleProps = {
  lines: string[];
  number?: string;
  numberColor?: string;
  frameColor?: string;
  frameThickness?: number;
  frameSize?: number;
  animationDuration?: number;
  animationDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  fontFamily?: string;
  secondaryFontFamily?: string;
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textLetterSpacing?: number;
  startFrame?: number;
  showExitAnimation?: boolean;
};

export const NumberFrameTitle: React.FC<NumberFrameTitleProps> = ({
  animationDirection: _animationDirection = "left",
  animationDuration = 45,
  easing = [0.34, 1.56, 0.64, 1],
  fontFamily = "Oswald",
  frameColor = "#c9a96e",
  frameSize = 90,
  frameThickness = 2,
  lines = ["FRAME TITLE"],
  number = "01",
  numberColor = "#c9a96e",
  secondaryFontFamily: _secondaryFontFamily = "Montserrat",
  showExitAnimation = false,
  startFrame = 0,
  textColor = "#ffffff",
  textFontSize = 64,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const frameStart = startFrame;
  const frameEnd = frameStart + animationDuration * 0.5;
  const textStart = startFrame + animationDuration * 0.25;
  const textEnd = textStart + animationDuration * 0.7;

  const frameT = interpolate(frame, [frameStart, frameEnd], [0, 1], {
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

  const rotate = frameT * 1.5 - 0.75;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        gap: 28,
      }}
    >
      <div
        style={{
          alignItems: "center",
          borderColor: frameColor,
          borderRadius: 0,
          borderStyle: "solid",
          borderWidth: frameThickness,
          display: "flex",
          height: frameSize,
          justifyContent: "center",
          opacity: frameT * exitT,
          transform: `rotate(${rotate}deg) scale(${frameT})`,
          transformOrigin: "center",
          width: frameSize,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            color: numberColor,
            fontFamily,
            fontSize: frameSize * 0.38,
            fontWeight: 700,
            opacity: frameT * exitT,
            textTransform: "uppercase",
          }}
        >
          {number}
        </div>
      </div>
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
          transform: `translate3d(${(1 - textT) * 25}px, 0, 0)`,
        }}
      >
        {lines[0]}
      </div>
    </div>
  );
};