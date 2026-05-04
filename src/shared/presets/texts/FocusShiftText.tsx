import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type FocusShiftTextProps = {
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
  shiftX?: number;
  shiftY?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const FocusShiftText: React.FC<FocusShiftTextProps> = ({
  animationDuration = 50,
  blurAmount = 16,
  durationInFrames,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton, Impact, sans-serif",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  shiftX = 60,
  shiftY = 0,
  startFrame = 0,
  text = "FOCUS SHIFT",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

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

  const currentBlur = interpolate(
    frame,
    [startFrame, startFrame + animationDuration],
    [blurAmount, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const currentX = interpolate(
    frame,
    [startFrame, startFrame + animationDuration],
    [shiftX, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const currentY = interpolate(
    frame,
    [startFrame, startFrame + animationDuration],
    [shiftY, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = frame >= exitStart ? exitT : 1;
  const exitBlur = frame >= exitStart ? (1 - exitT) * blurAmount : 0;
  const exitX = frame >= exitStart ? (1 - exitT) * -shiftX : 0;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        opacity: containerOpacity,
        transform: `translate3d(${currentX + exitX}px, ${currentY + holdFloat}px, 0)`,
        willChange: "opacity, transform",
      }}
    >
      <span
        style={{
          color: textColor,
          filter: `blur(${currentBlur + exitBlur}px)`,
          fontFamily,
          fontSize,
          fontWeight,
          letterSpacing: `${letterSpacing}em`,
          lineHeight: 1,
          textTransform,
          whiteSpace: "nowrap",
          willChange: "filter",
        }}
      >
        {text}
      </span>
    </div>
  );
};
