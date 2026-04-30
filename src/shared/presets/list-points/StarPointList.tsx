import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type StarPointListProps = {
  accentColor?: string;
  activeIndex?: number;
  backgroundColor?: string;
  easing?: [number, number, number, number];
  enterDuration?: number;
  exitDuration?: number;
  holdDuration?: number;
  items: string[];
  staggerDelay?: number;
  starColor?: string;
  starSize?: number;
  startFrame?: number;
  title?: string;
  titleColor?: string;
};

const StarIcon: React.FC<{ color: string; opacity: number; size: number }> = ({
  color,
  opacity,
  size,
}) => (
  <svg
    fill={color}
    height={size}
    style={{ flexShrink: 0, opacity }}
    viewBox="0 0 24 24"
    width={size}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const StarPointList: React.FC<StarPointListProps> = ({
  accentColor = "#86efac",
  activeIndex = 0,
  backgroundColor = "#000000",
  easing = [0.16, 1, 0.3, 1],
  enterDuration = 30,
  exitDuration = 20,
  holdDuration = 45,
  items,
  staggerDelay = 10,
  starColor = "#e0f2fe",
  starSize = 32,
  startFrame = 0,
  title = "",
  titleColor = "#7dd3fc",
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

  const titleEntryEnd = startFrame + 12;

  const titleEntryT = interpolate(frame, [startFrame, titleEntryEnd], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        opacity: listOpacity,
        width: "100%",
      }}
    >
      {title ? (
        <div
          style={{
            color: titleColor,
            fontFamily: "Anton",
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: "0.04em",
            marginBottom: 32,
            opacity: titleEntryT,
            textTransform: "uppercase",
            transform: `translate3d(0, ${(1 - titleEntryT) * 16}px, 0)`,
            willChange: "transform, opacity",
          }}
        >
          {title}
        </div>
      ) : null}
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          const itemEntryStart = startFrame + index * staggerDelay;
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

          const itemColor = isActive ? accentColor : starColor;
          const itemOpacity = isActive ? 1 : 0.6 * itemEntryT;
          const starOpacity = isActive ? 1 : 0.4 * itemEntryT;

          const starRotate = interpolate(
            frame,
            [itemEntryStart, itemEntryEnd],
            [-30, 0],
            {
              easing: Easing.out(Easing.back(1.7)),
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
                gap: 12,
                opacity: itemOpacity,
                transform: `translate3d(${(1 - itemEntryT) * 40}px, 0, 0) scale(${0.9 + 0.1 * itemEntryT})`,
                willChange: "transform, opacity",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  color: itemColor,
                  display: "flex",
                  fontFamily: "Anton",
                  fontSize: 18,
                  fontWeight: 400,
                  justifyContent: "center",
                  minWidth: 28,
                  opacity: itemOpacity,
                }}
              >
                0{index + 1}
              </div>
              <StarIcon
                color={isActive ? accentColor : starColor}
                opacity={starOpacity}
                size={starSize}
              />
              <div
                style={{
                  color: itemColor,
                  fontFamily: "Anton",
                  fontSize: 28,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  transform: `rotate(${starRotate * 0.1}deg)`,
                  willChange: "transform",
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
