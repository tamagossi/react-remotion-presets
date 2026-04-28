import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type RoundedBoxTitleProps = {
  animationDuration?: number;
  borderRadius?: number;
  boxColor?: string;
  boxSize?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: number;
  holdDuration?: number;
  startFrame?: number;
  subtitle?: string;
  subtitleColor?: string;
  subtitleFontSize?: number;
  subtitleFontWeight?: number;
  subtitleLetterSpacing?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const RoundedBoxTitle: React.FC<RoundedBoxTitleProps> = ({
  animationDuration = 45,
  borderRadius = 20,
  boxColor = "#ffffff",
  boxSize = 280,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 120,
  fontStyle = "italic",
  fontWeight = 400,
  holdDuration = 30,
  startFrame = 0,
  subtitle = "NEW TYPE BOX",
  subtitleColor = "#ffffff",
  subtitleFontSize = 20,
  subtitleFontWeight = 500,
  subtitleLetterSpacing = 0.1,
  text = "TYPE",
  textColor = "#000000",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const boxEntryStart = startFrame;
  const boxEntryEnd = boxEntryStart + animationDuration * 0.6;
  const boxExitStart = boxEntryEnd + holdDuration;
  const boxExitEnd = boxExitStart + exitDuration;

  const boxEntryT = interpolate(
    frame,
    [boxEntryStart, boxEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const boxExitT = interpolate(frame, [boxExitStart, boxExitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxScale = 0.85 + boxEntryT * 0.15;
  const boxRotate = (1 - boxEntryT) * -4;
  const boxOpacity = boxEntryT;

  const textEntryStart = startFrame + animationDuration * 0.25;
  const textEntryEnd = textEntryStart + animationDuration * 0.5;
  const textExitStart = textEntryEnd + holdDuration;
  const textExitEnd = textExitStart + exitDuration * 0.7;

  const textEntryT = interpolate(
    frame,
    [textEntryStart, textEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const textExitT = interpolate(
    frame,
    [textExitStart, textExitEnd],
    [1, 0],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const textOpacity = interpolate(
    frame,
    [textEntryStart, textEntryStart + animationDuration * 0.25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const subtitleEntryStart = startFrame + animationDuration * 0.5;
  const subtitleEntryEnd = subtitleEntryStart + animationDuration * 0.4;
  const subtitleExitStart = subtitleEntryEnd + holdDuration;
  const subtitleExitEnd = subtitleExitStart + exitDuration * 0.5;

  const subtitleExitT = interpolate(
    frame,
    [subtitleExitStart, subtitleExitEnd],
    [1, 0],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const subtitleOpacity = interpolate(
    frame,
    [subtitleEntryStart, subtitleEntryStart + animationDuration * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: boxColor,
          borderRadius,
          display: "flex",
          height: boxSize,
          justifyContent: "center",
          opacity: Math.max(Math.min(boxOpacity, boxExitT), 0),
          transform: `scale(${boxScale}) rotate(${boxRotate}deg)`,
          width: boxSize,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            color: textColor,
            fontFamily,
            fontSize,
            fontStyle,
            fontWeight,
            lineHeight: 1,
            opacity: Math.max(Math.min(textOpacity, textExitT), 0),
            textTransform,
            transform: `translate3d(0, ${(1 - textEntryT) * 15}px, 0)`,
            willChange: "transform, opacity",
          }}
        >
          {text}
        </div>
      </div>
      {subtitle && (
        <div
          style={{
            color: subtitleColor,
            fontFamily,
            fontSize: subtitleFontSize,
            fontStyle,
            fontWeight: subtitleFontWeight,
            letterSpacing: `${subtitleLetterSpacing}em`,
            lineHeight: 1,
            opacity: Math.max(Math.min(subtitleOpacity, subtitleExitT), 0),
            textTransform,
            willChange: "opacity",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
