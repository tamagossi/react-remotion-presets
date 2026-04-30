import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type CascadeLetterTextProps = {
  animationDuration?: number;
  cascadeDirection?: "down" | "left" | "right" | "up";
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  rotation?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const CascadeLetterText: React.FC<CascadeLetterTextProps> = ({
  animationDuration = 45,
  cascadeDirection = "down",
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  rotation = 45,
  startFrame = 0,
  text = "CASCADE",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();
  const chars = text.split("");
  const charCount = chars.length;
  const charDelay = animationDuration / Math.max(charCount, 1);

  const exitStart = startFrame + animationDuration + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = frame >= exitStart ? exitT : 1;

  const getEntryOffset = (t: number) => {
    switch (cascadeDirection) {
      case "down":
        return { x: 0, y: -60 * (1 - t) };
      case "left":
        return { x: 60 * (1 - t), y: 0 };
      case "right":
        return { x: -60 * (1 - t), y: 0 };
      case "up":
        return { x: 0, y: 60 * (1 - t) };
      default:
        return { x: 0, y: 0 };
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        opacity: containerOpacity,
        willChange: "opacity",
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

        const currentRotation = interpolate(
          frame,
          [revealStart, revealEnd],
          [rotation, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const offset = getEntryOffset(entryT);

        const exitCharDelay = Math.min(i * 2, Math.max(0, exitDuration - 1));
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

        const exitOffset = getEntryOffset(charExitT);

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
              transform: `translate3d(${offset.x + exitOffset.x}px, ${offset.y + exitOffset.y}px, 0) rotate(${currentRotation * charExitT}deg)`,
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
