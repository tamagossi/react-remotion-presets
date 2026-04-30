import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type WiggleTextProps = {
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  jitterIntensity?: number;
  jitterSpeed?: number;
  letterSpacing?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const WiggleText: React.FC<WiggleTextProps> = ({
  animationDuration = 40,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  jitterIntensity = 12,
  jitterSpeed = 0.4,
  letterSpacing = 0.02,
  startFrame = 0,
  text = "WIGGLE POSITION",
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

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {chars.map((char, i) => {
        const revealStart = startFrame + i * charDelay;

        const entryOpacity = interpolate(
          frame,
          [revealStart, revealStart + charDelay * 0.5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const localFrame = Math.max(0, frame - revealStart);

        const decayT = interpolate(localFrame, [0, animationDuration], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const jitterX =
          Math.sin(frame * jitterSpeed + seededRandom(i) * 10) *
          jitterIntensity *
          decayT;
        const jitterY =
          Math.cos(frame * jitterSpeed * 0.7 + seededRandom(i + 100) * 10) *
          jitterIntensity *
          decayT;

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

        const exitJitterIntensity =
          frame >= exitStart + exitCharDelay
            ? (1 - charExitT) * jitterIntensity * 2
            : 0;

        const finalJitterX =
          jitterX + Math.sin(frame * jitterSpeed + i) * exitJitterIntensity;
        const finalJitterY =
          jitterY +
          Math.cos(frame * jitterSpeed * 0.7 + i) * exitJitterIntensity;

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
              transform: `translate3d(${finalJitterX}px, ${finalJitterY}px, 0)`,
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
