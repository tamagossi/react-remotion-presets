import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type BulletFocusListProps = {
  animationDuration?: number;
  bulletColor?: string;
  bulletLength?: number;
  bulletThickness?: number;
  dimOpacity?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  focusDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  itemGap?: number;
  items: string[];
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const BulletFocusList: React.FC<BulletFocusListProps> = ({
  animationDuration = 40,
  bulletColor = "#ffffff",
  bulletLength = 20,
  bulletThickness = 2,
  dimOpacity = 0.25,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  focusDuration = 40,
  fontFamily = "Anton",
  fontSize = 28,
  fontWeight = 400,
  holdDuration = 30,
  itemGap = 16,
  items,
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

        const itemEntryDelay = index * 5;
        const itemEntryStart = startFrame + itemEntryDelay;
        const itemEntryEnd = itemEntryStart + 18;

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
              display: "flex",
              flexDirection: "row",
              gap: 16,
              opacity: itemEntryT,
              transform: `translate3d(0, ${(1 - itemEntryT) * 15}px, 0)`,
              willChange: "transform, opacity",
            }}
          >
            <div
              style={{
                backgroundColor: bulletColor,
                height: bulletThickness,
                opacity: isActive ? 1 : dimOpacity,
                width: bulletLength,
              }}
            />
            <div
              style={{
                color: textColor,
                fontFamily,
                fontSize,
                fontWeight,
                opacity: isActive ? 1 : dimOpacity,
                textTransform,
                transition: "none",
                willChange: "opacity",
              }}
            >
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
};
