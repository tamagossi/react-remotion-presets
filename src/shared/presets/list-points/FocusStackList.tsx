import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type FocusStackListProps = {
  animationDuration?: number;
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
  scaleStep?: number;
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const FocusStackList: React.FC<FocusStackListProps> = ({
  animationDuration = 40,
  dimOpacity = 0.2,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  focusDuration = 50,
  fontFamily = "Anton",
  fontSize = 48,
  fontWeight = 400,
  holdDuration = 30,
  itemGap = 8,
  items,
  scaleStep = 0.15,
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
  const focusProgress =
    (Math.max(0, frame - startFrame) / cycleDuration) * items.length;
  const activeIndexRaw = Math.floor(focusProgress) % items.length;
  const focusT = focusProgress % 1;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: itemGap,
        opacity: listOpacity,
        transform: `translate3d(0, ${(1 - listEntryT) * 30}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {items.map((item, index) => {
        const distFromActive = Math.abs(index - activeIndexRaw);
        const isActive = distFromActive === 0;

        const itemScale = isActive
          ? 1 + (1 - focusT) * 0.1
          : Math.max(0.6, 1 - distFromActive * scaleStep);

        const itemOpacity = isActive
          ? 1
          : Math.max(0.1, dimOpacity - distFromActive * 0.05);

        const itemEntryDelay = index * 4;
        const itemEntryStart = startFrame + itemEntryDelay;
        const itemEntryEnd = itemEntryStart + 16;

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
              color: textColor,
              fontFamily,
              fontSize,
              fontWeight,
              opacity: itemOpacity * itemEntryT,
              textTransform,
              transform: `translate3d(0, ${(1 - itemEntryT) * 20}px, 0) scale(${itemScale})`,
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
