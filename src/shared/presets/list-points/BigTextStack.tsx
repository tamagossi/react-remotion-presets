import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type BigTextStackProps = {
  animationDuration?: number;
  driftSpeed?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  itemGap?: number;
  items: string[];
  lineHeight?: number;
  scrollSpeed?: number;
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const BigTextStack: React.FC<BigTextStackProps> = ({
  animationDuration = 40,
  driftSpeed = 0.3,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 96,
  fontWeight = 700,
  holdDuration = 30,
  itemGap = 0,
  items,
  lineHeight = 1,
  scrollSpeed = 40,
  startFrame = 0,
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  const entryEnd = startFrame + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const listEntryT = interpolate(frame, [startFrame, entryEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listExitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listOpacity = Math.min(listEntryT, listExitT);

  const scrollOffset =
    ((frame - startFrame) * scrollSpeed) %
    (items.length * fontSize * lineHeight);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          opacity: listOpacity,
          transform: `translate3d(0, ${-scrollOffset}px, 0)`,
          willChange: "transform, opacity",
        }}
      >
        {[...items, ...items].map((item, index) => {
          const itemEntryDelay = (index % items.length) * 3;
          const itemEntryStart = startFrame + itemEntryDelay;
          const itemEntryEnd = itemEntryStart + 15;

          const itemEntryT = interpolate(
            frame,
            [itemEntryStart, itemEntryEnd],
            [0, 1],
            {
              easing: Easing.out(Easing.quad),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const drift = Math.sin((frame + index * 50) * 0.02) * driftSpeed * 20;

          return (
            <div
              key={`${item}-${index}`}
              style={{
                color: textColor,
                fontFamily,
                fontSize,
                fontWeight,
                lineHeight,
                marginBottom: itemGap,
                opacity: itemEntryT,
                textTransform,
                transform: `translate3d(${drift}px, 0, 0)`,
                whiteSpace: "nowrap",
                willChange: "transform, opacity",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
