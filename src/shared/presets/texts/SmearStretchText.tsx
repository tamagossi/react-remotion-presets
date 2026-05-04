import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type SmearStretchTextProps = {
  animationDuration?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  smearAmount?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const SmearStretchText: React.FC<SmearStretchTextProps> = ({
  animationDuration = 40,
  durationInFrames,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton, Impact, sans-serif",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  smearAmount = 1.8,
  startFrame = 0,
  text = "SMOOTH TEXT",
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

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        transform: `translate3d(0, ${holdFloat}px, 0)`,
      }}
    >
      {chars.map((char, i) => {
        const revealStart = startFrame + i * charDelay;
        const revealEnd = revealStart + charDelay;

        const entryT = interpolate(frame, [revealStart, revealEnd], [0, 1], {
          easing: Easing.bezier(...easing),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const entryOpacity = interpolate(
          frame,
          [revealStart, revealStart + charDelay * 0.5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const overshootT = interpolate(
          entryT,
          [0, 0.6, 1],
          [smearAmount, 1 + (smearAmount - 1) * 0.3, 1],
        );

        const scaleX = overshootT;
        const scaleY = 1 / overshootT;

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

        const exitScaleX = interpolate(charExitT, [0, 1], [smearAmount, 1]);

        const exitScaleY = 1 / exitScaleX;

        const finalScaleX = frame >= exitStart ? exitScaleX : scaleX;
        const finalScaleY = frame >= exitStart ? exitScaleY : scaleY;

        const finalOpacity =
          frame >= exitStart + exitCharDelay
            ? Math.max(entryOpacity * charExitT, 0)
            : entryOpacity;

        return (
          <span
            key={i}
            style={{
              color: textColor,
              display: "inline-block",
              fontFamily,
              fontSize,
              fontWeight,
              letterSpacing: `${letterSpacing}em`,
              lineHeight: 1,
              opacity: finalOpacity,
              textTransform,
              transform: `scale(${finalScaleX}, ${finalScaleY})`,
              whiteSpace: "pre",
              willChange: "transform, opacity",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
