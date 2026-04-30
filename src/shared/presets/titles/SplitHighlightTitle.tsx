import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type SplitHighlightTitleProps = {
  lines: string[];
  subtitle?: string;
  boxColor?: string;
  boxWidth?: number;
  boxHeight?: number;
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

export const SplitHighlightTitle: React.FC<SplitHighlightTitleProps> = ({
  animationDuration = 45,
  boxColor = "#c9a96e",
  boxHeight = 160,
  boxWidth = 100,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 0,
  fontFamily = "Oswald",
  holdDuration = 0,
  lines = ["HIGHLIGHT"],
  secondaryFontFamily = "Montserrat",
  startFrame = 0,
  subtitle = "FEATURED",
  subtitleColor = "#a0a0a0",
  subtitleFontSize = 20,
  subtitleLetterSpacing = 0.2,
  textColor = "#ffffff",
  textFontSize = 64,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const boxStart = startFrame;
  const boxEnd = boxStart + animationDuration * 0.5;
  const textStart = startFrame + animationDuration * 0.25;
  const textEnd = textStart + animationDuration * 0.7;
  const dividerStart = startFrame + animationDuration * 0.4;
  const dividerEnd = dividerStart + animationDuration * 0.4;

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
  const dividerT = interpolate(frame, [dividerStart, dividerEnd], [0, 1], {
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
        flexDirection: "row",
        gap: 28,
      }}
    >
      <div
        style={{
          backgroundColor: boxColor,
          height: boxHeight,
          opacity: boxT * exitT,
          transform: `scaleX(${boxT * 0.8}) translate3d(${(1 - boxT) * 20}px, 0, 0)`,
          transformOrigin: "center",
          width: boxWidth,
          willChange: "transform, opacity",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
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
            textTransform: "uppercase",
          }}
        >
          {lines[0]}
        </div>
        {subtitle && (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <div
              style={{
                backgroundColor: textColor,
                height: 2,
                opacity: dividerT * exitT,
                width: 32,
              }}
            />
            <div
              style={{
                color: subtitleColor,
                fontFamily: secondaryFontFamily,
                fontSize: subtitleFontSize,
                fontWeight: 500,
                letterSpacing: `${subtitleLetterSpacing}em`,
                opacity: textT * exitT,
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
