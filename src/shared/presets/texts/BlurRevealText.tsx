import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type BlurRevealTextProps = {
  animationDuration?: number;
  blurAmount?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  scaleStart?: number;
  staggerDelay?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const BlurRevealText: React.FC<BlurRevealTextProps> = ({
  animationDuration = 45,
  blurAmount = 12,
  durationInFrames,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton, Impact, sans-serif",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  scaleStart = 0.85,
  staggerDelay = 3,
  startFrame = 0,
  text = "BLUR REVEAL",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();
  const chars = text.split("");
  const charCount = chars.length;
  const charDelay = animationDuration / Math.max(charCount, 1);

  const effectiveHoldDuration =
    durationInFrames !== undefined
      ? Math.max(0, durationInFrames - animationDuration - exitDuration)
      : holdDuration;

  const exitStart = startFrame + animationDuration + effectiveHoldDuration;
  const exitEnd = exitStart + exitDuration;

  const holdFloat =
    frame >= startFrame && frame < exitStart
      ? Math.sin((frame - startFrame) * 0.08) * 2
      : 0;

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = frame >= exitStart ? exitT : 1;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        opacity: containerOpacity,
        transform: `translate3d(0, ${holdFloat}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {chars.map((char, i) => {
        const revealStart = startFrame + i * staggerDelay;
        const revealEnd = revealStart + charDelay;

        const currentBlur = interpolate(
          frame,
          [revealStart, revealEnd],
          [blurAmount, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const currentScale = interpolate(
          frame,
          [revealStart, revealEnd],
          [scaleStart, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const scaleEntryT = interpolate(
          frame,
          [revealStart, revealEnd],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const overshootScale = interpolate(
          scaleEntryT,
          [0, 0.7, 1],
          [scaleStart, 1.04, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const entryOpacity = interpolate(
          frame,
          [revealStart, revealStart + charDelay * 0.5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const exitCharDelay =
          (i / Math.max(charCount - 1, 1)) * exitDuration * 0.7;
        const charExitT = interpolate(
          frame,
          [exitStart + exitCharDelay, exitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const finalOpacity =
          frame >= exitStart + exitCharDelay
            ? Math.max(entryOpacity * charExitT, 0)
            : entryOpacity;

        const finalScale =
          frame >= exitStart + exitCharDelay
            ? overshootScale * charExitT
            : overshootScale;

        return (
          <span
            key={i}
            style={{
              color: textColor,
              display: "inline-block",
              filter: `blur(${currentBlur}px)`,
              fontFamily,
              fontSize,
              fontWeight,
              letterSpacing: `${letterSpacing}em`,
              lineHeight: 1,
              opacity: finalOpacity,
              textTransform,
              transform: `scale(${finalScale})`,
              whiteSpace: "pre",
              willChange: "filter, opacity, transform",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
