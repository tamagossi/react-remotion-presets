import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type OffsetFramesTitleProps = {
  lines: string[];
  subtitle?: string;
  frame1Color?: string;
  frame2Color?: string;
  frameThickness?: number;
  frameWidth?: number;
  frameHeight?: number;
  frameOffset?: number;
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

export const OffsetFramesTitle: React.FC<OffsetFramesTitleProps> = ({
  animationDirection: _animationDirection = "left",
  animationDuration = 45,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 0,
  fontFamily = "Oswald",
  frame1Color = "#c9a96e",
  frame2Color = "#ffffff",
  frameHeight = 140,
  frameOffset = 16,
  frameThickness = 2,
  frameWidth = 440,
  holdDuration = 0,
  lines = ["OFFSET FRAMES"],
  secondaryFontFamily = "Montserrat",
  startFrame = 0,
  subtitle = "DYNAMIC LAYOUT",
  subtitleColor = "#909090",
  subtitleFontSize = 20,
  subtitleLetterSpacing = 0.15,
  textColor = "#ffffff",
  textFontSize = 48,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const frame1Start = startFrame;
  const frame1End = frame1Start + animationDuration * 0.4;
  const frame2Start = startFrame + animationDuration * 0.15;
  const frame2End = frame2Start + animationDuration * 0.45;
  const textStart = startFrame + animationDuration * 0.25;
  const textEnd = textStart + animationDuration * 0.65;

  const frame1T = interpolate(frame, [frame1Start, frame1End], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const frame2T = interpolate(frame, [frame2Start, frame2End], [0, 1], {
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
  const exitT = exitDuration > 0
    ? interpolate(frame, [exitStart, exitStart + exitDuration], [1, 0], {
        easing: Easing.bezier(...easing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const rotate1 = (1 - frame1T) * -2.5;
  const rotate2 = frame2T * 1.5;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          alignItems: "center",
          borderColor: frame1Color,
          borderRadius: 0,
          borderStyle: "solid",
          borderWidth: frameThickness,
          display: "flex",
          height: frameHeight,
          justifyContent: "center",
          left: -frameOffset,
          opacity: frame1T * exitT,
          position: "absolute",
          top: -frameOffset,
          transform: `rotate(${rotate1}deg) scale(${0.9 + frame1T * 0.1})`,
          transformOrigin: "center",
          width: frameWidth,
          willChange: "transform, opacity",
        }}
      />
      <div
        style={{
          alignItems: "center",
          borderColor: frame2Color,
          borderRadius: 0,
          borderStyle: "solid",
          borderWidth: frameThickness,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          height: frameHeight,
          justifyContent: "center",
          opacity: frame2T * exitT,
          position: "relative",
          transform: `rotate(${rotate2}deg) scale(${0.9 + frame2T * 0.1})`,
          transformOrigin: "center",
          width: frameWidth,
          willChange: "transform, opacity",
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
  );
};