import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type HighlightBarTitleProps = {
  animationDuration?: number;
  barColor?: string;
  barHeight?: number;
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

export const HighlightBarTitle: React.FC<HighlightBarTitleProps> = ({
  animationDuration = 50,
  barColor = "#ec4899",
  barHeight = 60,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 96,
  fontStyle = "italic",
  fontWeight = 400,
  holdDuration = 30,
  startFrame = 0,
  subtitle = "The Brand New Title Animation Pack",
  subtitleColor = "#ffffff",
  subtitleFontSize = 20,
  subtitleFontWeight = 500,
  subtitleLetterSpacing = 0.08,
  text = "HELLO NEW TYPE",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const barEntryStart = startFrame;
  const barEntryEnd = barEntryStart + animationDuration * 0.5;
  const barExitStart = barEntryEnd + holdDuration;
  const barExitEnd = barExitStart + exitDuration * 0.7;

  const barEntryT = interpolate(
    frame,
    [barEntryStart, barEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const barExitT = interpolate(
    frame,
    [barExitStart, barExitEnd],
    [1, 0],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const textEntryStart = startFrame + animationDuration * 0.25;
  const textEntryEnd = textEntryStart + animationDuration * 0.5;
  const textExitStart = textEntryEnd + holdDuration;
  const textExitEnd = textExitStart + exitDuration;

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
    [textEntryStart, textEntryStart + animationDuration * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const subtitleEntryStart = startFrame + animationDuration * 0.5;
  const subtitleEntryEnd = subtitleEntryStart + animationDuration * 0.4;
  const subtitleExitStart = subtitleEntryEnd + holdDuration;
  const subtitleExitEnd = subtitleExitStart + exitDuration * 0.6;

  const subtitleEntryT = interpolate(
    frame,
    [subtitleEntryStart, subtitleEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

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
      <div style={{ position: "relative" }}>
        <div
          style={{
            backgroundColor: barColor,
            height: barHeight,
            left: 0,
            opacity: Math.max(Math.min(barEntryT, barExitT), 0),
            position: "absolute",
            top: "50%",
            transform: `translateY(-50%) scaleX(${barEntryT * barExitT})`,
            transformOrigin: "left",
            width: "100%",
            willChange: "transform, opacity",
          }}
        />
        <div
          style={{
            color: textColor,
            fontFamily,
            fontSize,
            fontStyle,
            fontWeight,
            lineHeight: 1,
            opacity: Math.max(Math.min(textOpacity, textExitT), 0),
            position: "relative",
            textTransform,
            transform: `translate3d(0, ${(1 - textEntryT) * 20}px, 0)`,
            whiteSpace: "nowrap",
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
            transform: `translate3d(0, ${(1 - subtitleEntryT) * 10}px, 0)`,
            willChange: "transform, opacity",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
