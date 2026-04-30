import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type RotateInTextProps = {
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  perspective?: number;
  rotationAmount?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const RotateInText: React.FC<RotateInTextProps> = ({
  animationDuration = 45,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  perspective = 800,
  rotationAmount = 90,
  startFrame = 0,
  text = "CHARACTERS",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const chars = text.split("");
  const charCount = chars.length;
  const charDelay = animationDuration / Math.max(charCount, 1);

  const exitStart = Math.max(
    startFrame + animationDuration + holdDuration,
    durationInFrames - exitDuration,
  );
  const exitEnd = exitStart + exitDuration;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        perspective: `${perspective}px`,
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

        const rotateX = interpolate(
          entryT,
          [0, 1],
          [i % 2 === 0 ? -rotationAmount : rotationAmount, 0],
        );

        const rotateY = interpolate(
          entryT,
          [0, 1],
          [i % 3 === 0 ? rotationAmount : -rotationAmount, 0],
        );

        const translateZ = interpolate(entryT, [0, 1], [-200, 0]);

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

        const exitRotateX = interpolate(
          charExitT,
          [0, 1],
          [i % 2 === 0 ? rotationAmount : -rotationAmount, 0],
        );

        const exitRotateY = interpolate(
          charExitT,
          [0, 1],
          [i % 3 === 0 ? -rotationAmount : rotationAmount, 0],
        );

        const finalRotateX = frame >= exitStart ? exitRotateX : rotateX;
        const finalRotateY = frame >= exitStart ? exitRotateY : rotateY;
        const finalTranslateZ =
          frame >= exitStart
            ? interpolate(charExitT, [0, 1], [100, 0])
            : translateZ;

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
              transform: `translate3d(0, 0, ${finalTranslateZ}px) rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg)`,
              transformStyle: "preserve-3d",
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
