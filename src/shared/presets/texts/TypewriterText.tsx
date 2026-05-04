import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type TypewriterTextProps = {
  animationDuration?: number;
  blinkingCursor?: boolean;
  cursorColor?: string;
  cursorWidth?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  animationDuration = 60,
  blinkingCursor = true,
  cursorColor = "#ffffff",
  cursorWidth = 3,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton, Impact, sans-serif",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  startFrame = 0,
  text = "HELLO WORLD",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const effectiveHoldDuration =
    durationInFrames !== undefined
      ? Math.max(0, durationInFrames - animationDuration - exitDuration)
      : holdDuration;

  const chars = text.split("");
  const totalCharFrames = animationDuration;
  const charDelay = totalCharFrames / Math.max(chars.length, 1);

  const exitStart = startFrame + animationDuration + effectiveHoldDuration;
  const exitEnd = exitStart + exitDuration;

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = frame >= exitStart ? exitT : 1;
  const containerY = frame >= exitStart ? (1 - exitT) * 30 : 0;

  const revealedCount = Math.floor(
    interpolate(
      frame,
      [startFrame, startFrame + animationDuration],
      [0, chars.length],
      {
        easing: Easing.bezier(...easing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );

  const cursorVisible =
    blinkingCursor && frame >= startFrame && frame < exitStart
      ? Math.sin(((frame - startFrame) * Math.PI * 2) / 15) > 0
        ? 1
        : 0.2
      : frame >= startFrame && frame < exitStart
        ? 1
        : 0;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        opacity: containerOpacity,
        transform: `translate3d(0, ${containerY}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {chars.map((char, i) => {
        const isRevealed = i < revealedCount;
        const charEntryT = interpolate(
          frame,
          [startFrame + i * charDelay, startFrame + i * charDelay + 5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const charExitDelay =
          (i / Math.max(chars.length - 1, 1)) * exitDuration * 0.7;
        const charExitT = interpolate(
          frame,
          [exitStart + charExitDelay, exitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const finalOpacity =
          frame >= exitStart + charExitDelay
            ? Math.max(charEntryT * charExitT, 0)
            : isRevealed
              ? charEntryT
              : 0;

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
              transform: `translate3d(0, ${isRevealed ? 0 : 10}px, 0)`,
              whiteSpace: "pre",
              willChange: "transform, opacity",
            }}
          >
            {char}
          </span>
        );
      })}
      <span
        style={{
          backgroundColor: cursorColor,
          display: "inline-block",
          height: fontSize * 0.85,
          marginLeft: 2,
          opacity: cursorVisible,
          transform: `scaleY(${cursorVisible})`,
          width: cursorWidth,
          willChange: "opacity, transform",
        }}
      />
    </div>
  );
};
