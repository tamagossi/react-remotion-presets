import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type OutlineBoxTitleProps = {
  lines: string[];
  subtitle?: string;
  boxBorderColor?: string;
  boxBorderThickness?: number;
  boxColor?: string;
  boxPadding?: number;
  boxWidth?: number;
  boxBorderRadius?: number;
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

export const OutlineBoxTitle: React.FC<OutlineBoxTitleProps> = ({
  animationDuration = 45,
  boxBorderColor = "#c9a96e",
  boxBorderRadius = 4,
  boxBorderThickness = 2,
  boxColor = "transparent",
  boxPadding = 40,
  boxWidth = 600,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 0,
  fontFamily = "Oswald",
  holdDuration = 0,
  lines = ["OUTLINE BOX"],
  secondaryFontFamily = "Montserrat",
  startFrame = 0,
  subtitle = "Premium Design",
  subtitleColor = "#a0a0a0",
  subtitleFontSize = 20,
  subtitleLetterSpacing = 0.1,
  textColor = "#ffffff",
  textFontSize = 64,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const boxStart = startFrame;
  const boxEnd = boxStart + animationDuration * 0.6;
  const textStart = startFrame + animationDuration * 0.3;
  const textEnd = textStart + animationDuration * 0.6;
  const subtitleStart = startFrame + animationDuration * 0.5;
  const subtitleEnd = subtitleStart + animationDuration * 0.5;

  const boxT = interpolate(frame, [boxStart, boxEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
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

  const borderOpacity = Math.min(boxT * 1.5, 1);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: boxColor,
          borderColor: boxBorderColor,
          borderRadius: boxBorderRadius,
          borderStyle: "solid",
          borderWidth: boxBorderThickness,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          justifyContent: "center",
          opacity: borderOpacity * exitT,
          padding: boxPadding,
          transform: `scale(${0.95 + boxT * 0.05})`,
          width: boxWidth,
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
              opacity: subtitleT * exitT,
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
