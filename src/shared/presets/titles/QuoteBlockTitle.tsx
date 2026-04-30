import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type QuoteBlockTitleProps = {
  align?: "center" | "left" | "right";
  animationDuration?: number;
  attribution?: string;
  attributionColor?: string;
  attributionFontSize?: number;
  chromaticAberration?: boolean;
  chromaticOffset?: number;
  color?: string;
  context?: string;
  contextColor?: string;
  contextFontSize?: number;
  easing?: [number, number, number, number];
  fontFamily?: string;
  gap?: number;
  quote?: string;
  quoteFontSize?: number;
  startFrame?: number;
  exitDuration?: number;
  holdDuration?: number;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

const GHOST_LAYERS: { color: string; axis: "x" | "y"; sign: -1 | 1 }[] = [
  { axis: "x", color: "#00f0ff", sign: -1 },
  { axis: "x", color: "#ff0080", sign: 1 },
  { axis: "y", color: "#fff200", sign: 1 },
];

export const QuoteBlockTitle: React.FC<QuoteBlockTitleProps> = ({
  align = "center",
  animationDuration = 60,
  attribution = "",
  attributionColor = "#a0a0a0",
  attributionFontSize = 24,
  chromaticAberration = true,
  chromaticOffset = 18,
  color = "#ffffff",
  context = "",
  contextColor = "#a0a0a0",
  contextFontSize = 28,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 0,
  fontFamily = "Anton",
  gap = 16,
  holdDuration = 0,
  quote = "",
  quoteFontSize = 64,
  startFrame = 0,
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const entryEndGlobal = startFrame + animationDuration;
  const exitStartGlobal = entryEndGlobal + holdDuration;
  const exitFade =
    exitDuration > 0
      ? interpolate(
          frame,
          [exitStartGlobal, exitStartGlobal + exitDuration],
          [1, 0],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        )
      : 1;

  const contextStart = startFrame;
  const contextEnd = contextStart + animationDuration * 0.3;
  const quoteStart = startFrame + animationDuration * 0.2;
  const quoteEnd = quoteStart + animationDuration * 0.5;
  const attributionStart = startFrame + animationDuration * 0.5;
  const attributionEnd = attributionStart + animationDuration * 0.35;

  const contextT = interpolate(frame, [contextStart, contextEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteT = interpolate(frame, [quoteStart, quoteEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const attributionT = interpolate(
    frame,
    [attributionStart, attributionEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const quoteOpacity = interpolate(
    frame,
    [quoteStart, quoteStart + animationDuration * 0.35],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const aberrationEnd = quoteStart + animationDuration * 0.4;
  const offset = chromaticAberration
    ? interpolate(frame, [quoteStart, aberrationEnd], [chromaticOffset, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const ghostOpacity = chromaticAberration
    ? interpolate(frame, [quoteStart, aberrationEnd], [0.85, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const yDist = (1 - quoteT) * 50;

  const quoteStyle: React.CSSProperties = {
    color,
    fontFamily,
    fontSize: quoteFontSize,
    fontWeight: 700,
    letterSpacing: "0.02em",
    lineHeight: 1.15,
    opacity: Math.max(quoteOpacity * exitFade, 0),
    textAlign: align,
    textTransform,
    transform: `translate3d(0, ${yDist}px, 0)`,
    willChange: "transform, opacity",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
        alignItems:
          align === "left"
            ? "flex-start"
            : align === "right"
              ? "flex-end"
              : "center",
      }}
    >
      {context && (
        <div
          style={{
            color: contextColor,
            fontFamily,
            fontSize: contextFontSize,
            fontWeight: 400,
            letterSpacing: "0.15em",
            opacity: Math.max(contextT * exitFade, 0),
            textAlign: align,
            textTransform,
            transform: `translate3d(0, ${(1 - contextT) * 20}px, 0)`,
            willChange: "transform, opacity",
          }}
        >
          {context}
        </div>
      )}

      {quote && (
        <div
          style={{
            position: "relative",
          }}
        >
          {chromaticAberration && offset > 0.01
            ? GHOST_LAYERS.map((layer, gi) => {
                const dx = layer.axis === "x" ? layer.sign * offset : 0;
                const dy = layer.axis === "y" ? layer.sign * offset : 0;
                return (
                  <div
                    aria-hidden
                    key={gi}
                    style={{
                      ...quoteStyle,
                      color: layer.color,
                      left: 0,
                      mixBlendMode: "screen",
                      opacity: ghostOpacity,
                      pointerEvents: "none",
                      position: "absolute",
                      top: 0,
                      transform: `translate3d(${dx}px, ${dy + yDist}px, 0)`,
                    }}
                  >
                    {quote}
                  </div>
                );
              })
            : null}
          <div style={quoteStyle}>{quote}</div>
        </div>
      )}

      {attribution && (
        <div
          style={{
            color: attributionColor,
            fontFamily,
            fontSize: attributionFontSize,
            fontWeight: 400,
            letterSpacing: "0.1em",
            opacity: Math.max(attributionT * exitFade, 0),
            textAlign: align,
            textTransform: "none",
            transform: `translate3d(0, ${(1 - attributionT) * 15}px, 0)`,
            willChange: "transform, opacity",
          }}
        >
          {attribution}
        </div>
      )}
    </div>
  );
};
