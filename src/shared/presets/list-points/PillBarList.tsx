import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type PillBarListProps = {
  borderRadius?: number;
  direction?: "down" | "up";
  easing?: [number, number, number, number];
  enterDuration?: number;
  exitDuration?: number;
  holdDuration?: number;
  items: string[];
  pillBorderColor?: string;
  pillColor?: string;
  staggerDelay?: number;
  startFrame?: number;
  textColor?: string;
};

export const PillBarList: React.FC<PillBarListProps> = ({
  borderRadius = 60,
  direction = "up",
  easing = [0.34, 1.56, 0.64, 1],
  enterDuration = 25,
  exitDuration = 20,
  holdDuration = 40,
  items,
  pillBorderColor = "#fbbf24",
  pillColor = "#c2410c",
  staggerDelay = 12,
  startFrame = 0,
  textColor = "#ffffff",
}) => {
  const frame = useCurrentFrame();

  const entryEnd = startFrame + enterDuration;
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

  const directionMultiplier = direction === "up" ? 1 : -1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: listOpacity,
      }}
    >
      {items.map((item, index) => {
        const itemEntryStart = startFrame + index * staggerDelay;
        const itemEntryEnd = itemEntryStart + 25;

        const itemEntryT = interpolate(
          frame,
          [itemEntryStart, itemEntryEnd],
          [0, 1],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const slideOffset = (1 - itemEntryT) * 50 * directionMultiplier;

        return (
          <div
            key={item}
            style={{
              alignSelf: "flex-start",
              backgroundColor: pillColor,
              border: `2px solid ${pillBorderColor}`,
              borderRadius,
              color: textColor,
              fontFamily: "Anton",
              fontSize: 24,
              fontWeight: 400,
              opacity: itemEntryT,
              padding: "12px 32px",
              textTransform: "uppercase",
              transform: `translate3d(0, ${slideOffset}px, 0) scale(${0.8 + 0.2 * itemEntryT})`,
              willChange: "transform, opacity",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
