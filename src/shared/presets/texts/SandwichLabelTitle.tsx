import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type SandwichLabelTitleProps = {
  animationDuration?: number;
  bottomText: string;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: number;
  gap?: number;
  holdDuration?: number;
  label: string;
  labelColor?: string;
  labelFontSize?: number;
  labelFontWeight?: number;
  labelLetterSpacing?: number;
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
  topText: string;
};

export const SandwichLabelTitle: React.FC<SandwichLabelTitleProps> = ({
  animationDuration = 50,
  bottomText = "DESIGN",
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 120,
  fontStyle = "italic",
  fontWeight = 400,
  gap = 4,
  holdDuration = 30,
  label = "JOIN THE TRENDY DESIGN CLUB",
  labelColor = "#2dd4bf",
  labelFontSize = 20,
  labelFontWeight = 600,
  labelLetterSpacing = 0.15,
  startFrame = 0,
  textColor = "#ffffff",
  textTransform = "uppercase",
  topText = "TRENDY",
}) => {
  const frame = useCurrentFrame();

  const topEntryStart = startFrame;
  const topEntryEnd = topEntryStart + animationDuration;
  const topExitStart = topEntryEnd + holdDuration;
  const topExitEnd = topExitStart + exitDuration;

  const topEntryT = interpolate(frame, [topEntryStart, topEntryEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const topExitT = interpolate(frame, [topExitStart, topExitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const topOpacity = interpolate(
    frame,
    [topEntryStart, topEntryStart + animationDuration * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const bottomEntryStart = startFrame + 10;
  const bottomEntryEnd = bottomEntryStart + animationDuration;
  const bottomExitStart = bottomEntryEnd + holdDuration;
  const bottomExitEnd = bottomExitStart + exitDuration;

  const bottomEntryT = interpolate(
    frame,
    [bottomEntryStart, bottomEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const bottomExitT = interpolate(
    frame,
    [bottomExitStart, bottomExitEnd],
    [1, 0],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const bottomOpacity = interpolate(
    frame,
    [bottomEntryStart, bottomEntryStart + animationDuration * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const labelEntryStart = startFrame + animationDuration * 0.4;
  const labelEntryEnd = labelEntryStart + animationDuration * 0.5;
  const labelExitStart = labelEntryEnd + holdDuration;
  const labelExitEnd = labelExitStart + exitDuration * 0.6;

  const labelEntryT = interpolate(
    frame,
    [labelEntryStart, labelEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const labelExitT = interpolate(
    frame,
    [labelExitStart, labelExitEnd],
    [1, 0],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const labelOpacity = interpolate(
    frame,
    [labelEntryStart, labelEntryStart + animationDuration * 0.25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap,
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
          opacity: Math.max(Math.min(topOpacity, topExitT), 0),
          textTransform,
          transform: `translate3d(${(1 - topEntryT) * -60 * topExitT}px, 0, 0)`,
          whiteSpace: "nowrap",
          willChange: "transform, opacity",
        }}
      >
        {topText}
      </div>
      <div
        style={{
          color: labelColor,
          fontFamily,
          fontSize: labelFontSize,
          fontStyle,
          fontWeight: labelFontWeight,
          letterSpacing: `${labelLetterSpacing}em`,
          lineHeight: 1,
          opacity: Math.max(Math.min(labelOpacity, labelExitT), 0),
          textTransform,
          transform: `scale(${0.95 + labelEntryT * 0.05})`,
          whiteSpace: "nowrap",
          willChange: "opacity, transform",
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: textColor,
          fontFamily,
          fontSize,
          fontStyle,
          fontWeight,
          lineHeight: 1,
          opacity: Math.max(Math.min(bottomOpacity, bottomExitT), 0),
          textTransform,
          transform: `translate3d(${(1 - bottomEntryT) * 60 * bottomExitT}px, 0, 0)`,
          whiteSpace: "nowrap",
          willChange: "transform, opacity",
        }}
      >
        {bottomText}
      </div>
    </div>
  );
};
