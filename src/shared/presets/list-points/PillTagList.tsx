import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type PillTagListProps = {
  animationDuration?: number;
  borderColor?: string;
  dimOpacity?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  focusDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  highlightBgColor?: string;
  highlightTextColor?: string;
  holdDuration?: number;
  itemGap?: number;
  items: string[];
  pillPaddingX?: number;
  pillPaddingY?: number;
  pillRadius?: number;
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const PillTagList: React.FC<PillTagListProps> = ({
  animationDuration = 40,
  borderColor = "#ffffff",
  dimOpacity = 0.35,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  focusDuration = 45,
  fontFamily = "Anton",
  fontSize = 32,
  fontWeight = 400,
  highlightBgColor = "#ffffff",
  highlightTextColor = "#000000",
  holdDuration = 30,
  itemGap = 12,
  items,
  pillPaddingX = 28,
  pillPaddingY = 12,
  pillRadius = 32,
  startFrame = 0,
  textColor = "#ffffff",
  textTransform = "none",
}) => {
  const frame = useCurrentFrame();

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

  const cycleDuration = focusDuration;
  const activeIndexRaw =
    Math.floor(
      (Math.max(0, frame - startFrame) / cycleDuration) * items.length,
    ) % items.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: itemGap,
        opacity: listOpacity,
        transform: `translate3d(0, ${(1 - listEntryT) * 30}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndexRaw;

        const itemEntryDelay = index * 6;
        const itemEntryStart = startFrame + itemEntryDelay;
        const itemEntryEnd = itemEntryStart + 20;

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

        return (
          <div
            key={item}
            style={{
              alignItems: "center",
              backgroundColor: isActive ? highlightBgColor : "transparent",
              border: `2px solid ${borderColor}`,
              borderRadius: pillRadius,
              color: isActive ? highlightTextColor : textColor,
              display: "inline-flex",
              fontFamily,
              fontSize,
              fontWeight,
              opacity: isActive ? 1 : dimOpacity * itemEntryT,
              padding: `${pillPaddingY}px ${pillPaddingX}px`,
              textTransform,
              transform: `translate3d(0, ${(1 - itemEntryT) * 20}px, 0)`,
              transition: "none",
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
