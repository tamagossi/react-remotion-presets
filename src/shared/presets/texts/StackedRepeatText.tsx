import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type StackedRepeatTextProps = {
  animationDuration?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  layerCount?: number;
  layerOffset?: number;
  layerOpacity?: number;
  letterSpacing?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const StackedRepeatText: React.FC<StackedRepeatTextProps> = ({
  animationDuration = 40,
  durationInFrames,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton, Impact, sans-serif",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  layerCount = 4,
  layerOffset = 4,
  layerOpacity = 0.15,
  letterSpacing = 0.02,
  startFrame = 0,
  text = "STACKED",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const exitStart = startFrame + animationDuration + holdDuration;
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
        justifyContent: "center",
        opacity: containerOpacity,
        position: "relative",
        willChange: "opacity",
      }}
    >
      {Array.from({ length: layerCount }, (_, i) => {
        const layerDelay = Math.min(i * 4, Math.max(0, animationDuration - 1));
        const layerEntryT = interpolate(
          frame,
          [startFrame + layerDelay, startFrame + animationDuration],
          [0, 1],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const offsetX = i * layerOffset * layerEntryT;
        const offsetY = i * layerOffset * layerEntryT;
        const opacity =
          i === 0
            ? interpolate(layerEntryT, [0, 1], [0.5, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : layerOpacity * (1 - i / layerCount) * layerEntryT;

        return (
          <span
            key={i}
            style={{
              color: textColor,
              fontFamily,
              fontSize,
              fontWeight,
              letterSpacing: `${letterSpacing}em`,
              lineHeight: 1,
              opacity,
              position: "absolute",
              textTransform,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
              whiteSpace: "nowrap",
              willChange: "opacity, transform",
              zIndex: layerCount - i,
            }}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
};
