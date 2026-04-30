import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type WaveTextProps = {
  animationDuration?: number;
  amplitude?: number;
  damping?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  frequency?: number;
  holdDuration?: number;
  letterSpacing?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
  waveDirection?: "center-out" | "left-to-right" | "right-to-left";
};

export const WaveText: React.FC<WaveTextProps> = ({
  amplitude = 40,
  animationDuration = 40,
  damping = 0.92,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  frequency = 0.3,
  holdDuration = 30,
  letterSpacing = 0.02,
  startFrame = 0,
  text = "WAVE TEXT",
  textColor = "#ffffff",
  textTransform = "uppercase",
  waveDirection = "left-to-right",
}) => {
  const frame = useCurrentFrame();

  const effectiveHoldDuration =
    durationInFrames !== undefined
      ? Math.max(0, durationInFrames - animationDuration - exitDuration)
      : holdDuration;

  const chars = text.split("");
  const charCount = chars.length;

  const exitStart = startFrame + animationDuration + effectiveHoldDuration;
  const exitEnd = exitStart + exitDuration;

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
        gap: 0,
        opacity: containerOpacity,
        willChange: "opacity",
      }}
    >
      {chars.map((char, i) => {
        let normalizedIndex: number;
        if (waveDirection === "left-to-right") {
          normalizedIndex = i;
        } else if (waveDirection === "right-to-left") {
          normalizedIndex = charCount - 1 - i;
        } else {
          normalizedIndex = Math.abs(i - (charCount - 1) / 2);
        }

        const charDelay = normalizedIndex * 3;
        const localFrame = Math.max(0, frame - startFrame - charDelay);

        const entryT = interpolate(
          frame,
          [startFrame + charDelay, startFrame + charDelay + animationDuration],
          [0, 1],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const waveOffset =
          Math.sin(localFrame * frequency) *
          amplitude *
          Math.pow(damping, localFrame * 0.1);

        const entryY = (1 - entryT) * 60;
        const entryOpacity = interpolate(
          frame,
          [
            startFrame + charDelay,
            startFrame + charDelay + animationDuration * 0.3,
          ],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const exitCharDelay = Math.min(
          normalizedIndex * 2,
          Math.max(0, exitDuration - 1),
        );
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

        const finalY =
          frame >= exitStart + exitCharDelay
            ? entryY + (1 - charExitT) * -40
            : entryY;

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
              transform: `translate3d(0, ${finalY + waveOffset}px, 0)`,
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
