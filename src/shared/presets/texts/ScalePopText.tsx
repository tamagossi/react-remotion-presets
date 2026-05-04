import React from "react";

import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ScalePopTextProps = {
  animationDuration?: number;
  bounceDamping?: number;
  bounceMass?: number;
  bounceStiffness?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  overshoot?: number;
  staggerDelay?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const ScalePopText: React.FC<ScalePopTextProps> = ({
  animationDuration = 40,
  bounceDamping = 8,
  bounceMass = 0.6,
  bounceStiffness = 120,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton, Impact, sans-serif",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  overshoot = 1.15,
  staggerDelay = 6,
  startFrame = 0,
  text = "SCALE POP",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const effectiveHoldDuration =
    durationInFrames !== undefined
      ? Math.max(0, durationInFrames - animationDuration - exitDuration)
      : holdDuration;

  const words = text.split(" ");

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
        flexWrap: "wrap",
        gap: fontSize * 0.25,
        justifyContent: "center",
        opacity: containerOpacity,
        willChange: "opacity",
      }}
    >
      {words.map((word, i) => {
        const wordStart = startFrame + i * staggerDelay;

        const scaleSpring = spring({
          fps,
          frame: Math.max(0, frame - wordStart),
          config: {
            damping: bounceDamping,
            mass: bounceMass,
            stiffness: bounceStiffness,
          },
        });

        const scale = interpolate(scaleSpring, [0, 1], [0, 1], {
          extrapolateRight: "clamp",
        });

        const currentScale =
          scale > 1
            ? scale
            : scale < 1 && scale > 0.8
              ? interpolate(scale, [0.8, 1], [overshoot, 1], {
                  extrapolateRight: "clamp",
                })
              : scale;

        const opacity = interpolate(
          frame,
          [wordStart, wordStart + animationDuration * 0.3],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const rotate = interpolate(scaleSpring, [0, 0.5, 1], [-8, 2, 0], {
          extrapolateRight: "clamp",
        });

        const exitWordDelay = Math.min(
          i * staggerDelay,
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

        const exitScale =
          frame >= exitStart + exitWordDelay
            ? currentScale * wordExitT
            : currentScale;

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
              transform: `scale(${exitScale}) rotate(${rotate}deg)`,
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
