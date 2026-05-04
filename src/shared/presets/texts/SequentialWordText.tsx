import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type SequentialWordTextProps = {
  animationDuration?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  staggerDelay?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const SequentialWordText: React.FC<SequentialWordTextProps> = ({
  animationDuration = 40,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton, Impact, sans-serif",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  staggerDelay = 10,
  startFrame = 0,
  text = "THANK YOU FOR WATCHING",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const effectiveHoldDuration =
    durationInFrames !== undefined
      ? Math.max(0, durationInFrames - animationDuration - exitDuration)
      : holdDuration;

  const words = text.split(" ");
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
        flexWrap: "wrap",
        gap: fontSize * 0.3,
        justifyContent: "center",
        opacity: containerOpacity,
        transform: `translate3d(0, ${holdFloat}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {words.map((word, i) => {
        const wordStart = startFrame + i * staggerDelay;
        const wordEnd = wordStart + animationDuration * 0.5;

        const entryT = interpolate(frame, [wordStart, wordEnd], [0, 1], {
          easing: Easing.bezier(...easing),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const opacity = interpolate(frame, [wordStart, wordEnd], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const scale = interpolate(entryT, [0, 0.7, 1], [0.8, 1.04, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const exitWordDelay = Math.min(
          (words.length - 1 - i) * staggerDelay,
          Math.max(0, exitDuration - 1),
        );
        const wordExitT = interpolate(
          frame,
          [exitStart + exitWordDelay, exitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const finalOpacity =
          frame >= exitStart + exitWordDelay
            ? Math.max(opacity * wordExitT, 0)
            : opacity;

        const finalScale =
          frame >= exitStart + exitWordDelay ? scale * wordExitT : scale;

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
              transform: `scale(${finalScale})`,
              whiteSpace: "nowrap",
              willChange: "transform, opacity",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
