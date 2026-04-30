import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type FocusHighlightListProps = {
  activeIndex?: number;
  dimColor?: string;
  dimOpacity?: number;
  direction?: "horizontal" | "vertical";
  easing?: [number, number, number, number];
  enterDuration?: number;
  exitDuration?: number;
  highlightColor?: string;
  holdDuration?: number;
  items: string[];
  label?: string;
  labelColor?: string;
  staggerDelay?: number;
  startFrame?: number;
};

export const FocusHighlightList: React.FC<FocusHighlightListProps> = ({
  activeIndex = 2,
  dimColor = "#475569",
  dimOpacity = 0.25,
  direction = "vertical",
  easing = [0.16, 1, 0.3, 1],
  enterDuration = 30,
  exitDuration = 20,
  highlightColor = "#3b82f6",
  holdDuration = 45,
  items,
  label = "",
  labelColor = "#ffffff",
  staggerDelay = 8,
  startFrame = 0,
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

  const labelEntryEnd = startFrame + 14;

  const labelEntryT = interpolate(frame, [startFrame, labelEntryEnd], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isVertical = direction === "vertical";

  return (
    <div style={{ opacity: listOpacity }}>
      {label ? (
        <div
          style={{
            color: labelColor,
            fontFamily: "Anton",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: "0.08em",
            marginBottom: 16,
            opacity: labelEntryT,
            textTransform: "uppercase",
            transform: `translate3d(0, ${(1 - labelEntryT) * 12}px, 0)`,
            willChange: "transform, opacity",
          }}
        >
          {label}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          flexWrap: isVertical ? "nowrap" : "wrap",
          gap: isVertical ? 10 : 16,
        }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          const itemEntryStart = startFrame + index * staggerDelay;
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

          const color = isActive ? highlightColor : dimColor;
          const opacity = isActive ? 1 : dimOpacity * itemEntryT;

          const highlightGlow = isActive
            ? 1 + 0.15 * Math.sin((frame - startFrame) * 0.12)
            : 1;

          return (
            <div
              key={item}
              style={{
                color,
                fontFamily: "Anton",
                fontSize: isActive ? 26 : 20,
                fontWeight: 400,
                opacity,
                textTransform: "uppercase",
                transform: `translate3d(0, ${(1 - itemEntryT) * 16}px, 0) scale(${highlightGlow})`,
                transition: "none",
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
