import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type GradientCarouselListProps = {
  direction?: "left" | "right";
  easing?: [number, number, number, number];
  enterDuration?: number;
  exitDuration?: number;
  gradientColors?: [string, string];
  holdDuration?: number;
  items: string[];
  label?: string;
  labelColor?: string;
  scrollSpeed?: number;
  startFrame?: number;
};

export const GradientCarouselList: React.FC<GradientCarouselListProps> = ({
  direction = "left",
  easing = [0.16, 1, 0.3, 1],
  enterDuration = 30,
  exitDuration = 20,
  gradientColors = ["#a855f7", "#6366f1"],
  holdDuration = 45,
  items,
  label = "",
  labelColor = "#ffffff",
  scrollSpeed = 1,
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

  const dirMultiplier = direction === "left" ? -1 : 1;

  const scrollOffset =
    ((frame - startFrame) * scrollSpeed * 80) % (items.length * 180);

  return (
    <div
      style={{
        opacity: listOpacity,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {label ? (
        <div
          style={{
            color: labelColor,
            fontFamily: "Anton",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: "0.08em",
            marginBottom: 20,
            opacity: labelEntryT,
            textAlign: "center",
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
          flexDirection: "row",
          gap: 24,
          transform: `translate3d(${scrollOffset * dirMultiplier}px, 0, 0)`,
          willChange: "transform",
        }}
      >
        {[...items, ...items].map((item, index) => {
          const itemEntryStart = startFrame + (index % items.length) * 8;
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

          const isEven = index % 2 === 0;
          const color1 = isEven ? gradientColors[0] : gradientColors[1];
          const color2 = isEven ? gradientColors[1] : gradientColors[0];

          return (
            <div
              key={`${item}-${index}`}
              style={{
                backgroundClip: "text",
                backgroundImage: `linear-gradient(135deg, ${color1}, ${color2})`,
                fontFamily: "Anton",
                fontSize: 32,
                fontWeight: 400,
                opacity: itemEntryT,
                textTransform: "uppercase",
                transform: `translate3d(0, ${(1 - itemEntryT) * 20}px, 0)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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
