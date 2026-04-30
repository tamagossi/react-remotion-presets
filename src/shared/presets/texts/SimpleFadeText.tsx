import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type SimpleFadeTextProps = {
  animationDuration?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  slideY?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const SimpleFadeText: React.FC<SimpleFadeTextProps> = ({
  animationDuration = 40,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  slideY = 20,
  startFrame = 0,
  text = "INSPIRED BY CURIOSITY",
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

  const entryT = interpolate(
    frame,
    [startFrame, startFrame + animationDuration],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = Math.min(entryT, exitT);
  const y = (1 - entryT) * slideY;
  const exitY = frame >= exitStart ? (1 - exitT) * -slideY : 0;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: textColor,
          display: "inline-block",
          fontFamily,
          fontSize,
          fontWeight,
          letterSpacing: `${letterSpacing}em`,
          lineHeight: 1,
          opacity,
          textTransform,
          transform: `translate3d(0, ${y + exitY}px, 0)`,
          whiteSpace: "pre",
          willChange: "transform, opacity",
        }}
      >
        {text}
      </span>
    </div>
  );
};
