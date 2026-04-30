import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type CardFillTitleProps = {
  lines: string[];
  subtitle?: string;
  cardColor?: string;
  cardPadding?: number;
  cardWidth?: number;
  cardBorderRadius?: number;
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

export const CardFillTitle: React.FC<CardFillTitleProps> = ({
  animationDuration = 45,
  cardBorderRadius = 6,
  cardColor = "#f5f5f5",
  cardPadding = 40,
  cardWidth = 700,
  easing = [0.34, 1.56, 0.64, 1],
  exitDuration = 0,
  fontFamily = "Oswald",
  holdDuration = 0,
  lines = ["CARD FILL"],
  secondaryFontFamily = "Montserrat",
  startFrame = 0,
  subtitle = "Premium Collection",
  subtitleColor = "#6b6b6b",
  subtitleFontSize = 20,
  subtitleFontWeight = 400,
  subtitleLetterSpacing = 0.1,
  textColor = "#0f0f0f",
  textFontSize = 64,
  textFontWeight = 700,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  const getTranslate = (t: number) => {
    return (1 - t) * 20;
  };

  const cardStart = startFrame;
  const cardEnd = cardStart + animationDuration * 0.6;
  const textStart = startFrame + animationDuration * 0.25;
  const textEnd = textStart + animationDuration * 0.5;
  const subtitleStart = startFrame + animationDuration * 0.5;
  const subtitleEnd = subtitleStart + animationDuration * 0.4;

  const cardT = interpolate(frame, [cardStart, cardEnd], [0, 1], {
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

  const rotate = (1 - cardT) * 1;

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
          backgroundColor: cardColor,
          borderRadius: cardBorderRadius,
          opacity: cardT * exitT,
          padding: cardPadding,
          transform: `rotate(${rotate}deg) scale(${0.92 + cardT * 0.08}) translate3d(0, ${getTranslate(cardT)}px, 0)`,
          transformOrigin: "center",
          width: cardWidth,
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
            lineHeight: 1,
            opacity: textT * exitT,
            textAlign: "center",
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
              fontWeight: subtitleFontWeight,
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
