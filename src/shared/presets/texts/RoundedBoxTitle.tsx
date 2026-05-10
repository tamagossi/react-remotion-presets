import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

import { useInter } from "../../hooks/useInter";
import { useSpaceGrotesk } from "../../hooks/useSpaceGrotesk";

export type RoundedBoxTitleProps = {
  animationDuration?: number;
  borderRadius?: number;
  boxColor?: string;
  boxSize?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
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
}

export const RoundedBoxTitle: React.FC<RoundedBoxTitleProps> = ({
  animationDuration = 45,
  borderRadius = 20,
  boxColor = "#ffffff",
  boxSize = 260,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 25,
  fontFamily = "Space Grotesk",
  fontSize = 110,
  fontWeight = 600,
  holdDuration = 30,
  startFrame = 0,
  subtitle = "NEW TYPE BOX",
  subtitleColor = "#ffffff",
  subtitleFontSize = 18,
  subtitleFontWeight = 500,
  subtitleLetterSpacing = 0.12,
  text = "TYPE",
  textColor = "#0a0a0a",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  useInter();
  useSpaceGrotesk();

  const entryEnd = startFrame + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxEntryStart = startFrame;
  const boxEntryEnd = boxEntryStart + animationDuration * 0.6;

  const boxEntryT = interpolate(frame, [boxEntryStart, boxEntryEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxScale = 0.85 + boxEntryT * 0.15;
  const boxRotate = (1 - boxEntryT) * -5;
  const boxOpacity = boxEntryT * exitT;

  const textEntryStart = startFrame + animationDuration * 0.2;
  const textEntryEnd = textEntryStart + animationDuration * 0.35;

  const textEntryT = interpolate(
    frame,
    [textEntryStart, textEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const textExitStart = exitStart;
  const textExitEnd = textExitStart + exitDuration * 0.4;

  const textExitT = interpolate(frame, [textExitStart, textExitEnd], [1, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(
    frame,
    [textEntryStart, textEntryStart + animationDuration * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const subtitleEntryStart = startFrame + animationDuration * 0.5;
  const subtitleEntryEnd = subtitleEntryStart + animationDuration * 0.2;

  const subtitleOpacity = interpolate(
    frame,
    [subtitleEntryStart, subtitleEntryEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const subtitleExitStart = exitStart + exitDuration * 0.1;
  const subtitleExitEnd = subtitleExitStart + exitDuration * 0.5;

  const subtitleExitT = interpolate(
    frame,
    [subtitleExitStart, subtitleExitEnd],
    [1, 0],
    {
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const textOpacityCombined = Math.max(Math.min(textOpacity, textExitT), 0);
  const subtitleOpacityCombined = Math.max(
    Math.min(subtitleOpacity, subtitleExitT),
    0,
  );

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: boxColor,
          borderRadius,
          display: "flex",
          justifyContent: "center",
          minHeight: boxSize,
          minWidth: boxSize,
          opacity: Math.max(Math.min(boxOpacity, exitT), 0),
          padding: `${fontSize * 0.25}px ${fontSize * 0.5}px`,
          transform: `rotate(${boxRotate}deg) scale(${boxScale})`,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            color: textColor,
            fontFamily,
            fontSize,
            fontWeight,
            lineHeight: 1,
            opacity: textOpacityCombined,
            textTransform,
            transform: `translate3d(0, ${(1 - textEntryT) * 12}px, 0)`,
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
            fontFamily: "Inter",
            fontSize: subtitleFontSize,
            fontWeight: subtitleFontWeight,
            letterSpacing: `${subtitleLetterSpacing}em`,
            opacity: subtitleOpacityCombined,
            textTransform: "uppercase",
            willChange: "opacity",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
