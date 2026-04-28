import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type LetterSpacingRevealTitleProps = {
  animationDuration?: number;
  divider?: string;
  dividerColor?: string;
  easing?: [number, number, number, number];
  endLetterSpacing?: number;
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: number;
  holdDuration?: number;
  startFrame?: number;
  startLetterSpacing?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const LetterSpacingRevealTitle: React.FC<
  LetterSpacingRevealTitleProps
> = ({
  animationDuration = 50,
  divider = "/",
  dividerColor = "#6b7280",
  easing = [0.22, 1, 0.36, 1],
  endLetterSpacing = 0.25,
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 96,
  fontStyle = "italic",
  fontWeight = 400,
  holdDuration = 30,
  startFrame = 0,
  startLetterSpacing = -0.5,
  text = "TYPOGRAPHY",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const entryEnd = startFrame + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const entryT = interpolate(frame, [startFrame, entryEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + animationDuration * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const currentLetterSpacing =
    startLetterSpacing + (endLetterSpacing - startLetterSpacing) * entryT;

  const half = Math.ceil(text.length / 2);
  const leftText = text.slice(0, half);
  const rightText = text.slice(half);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        opacity: Math.max(Math.min(opacity, exitT), 0),
        willChange: "opacity",
      }}
    >
      <div
        style={{
          color: textColor,
          fontFamily,
          fontSize,
          fontStyle,
          fontWeight,
          letterSpacing: `${currentLetterSpacing}em`,
          lineHeight: 1,
          textTransform,
          whiteSpace: "nowrap",
          willChange: "letter-spacing",
        }}
      >
        {leftText}
      </div>
      <div
        style={{
          color: dividerColor,
          fontFamily,
          fontSize: fontSize * 0.6,
          fontStyle,
          fontWeight,
          lineHeight: 1,
          opacity: Math.max(entryT * exitT, 0),
          transform: `rotate(${-15 + entryT * 15}deg)`,
          willChange: "opacity, transform",
        }}
      >
        {divider}
      </div>
      <div
        style={{
          color: textColor,
          fontFamily,
          fontSize,
          fontStyle,
          fontWeight,
          letterSpacing: `${currentLetterSpacing}em`,
          lineHeight: 1,
          textTransform,
          whiteSpace: "nowrap",
          willChange: "letter-spacing",
        }}
      >
        {rightText}
      </div>
    </div>
  );
};
