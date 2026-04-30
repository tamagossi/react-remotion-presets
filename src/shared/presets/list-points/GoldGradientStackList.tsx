import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type GoldGradientStackListProps = {
  dimOpacity?: number;
  easing?: [number, number, number, number];
  enterDuration?: number;
  exitDuration?: number;
  focusIndex?: number;
  fontSize?: number;
  gradientColors?: [string, string];
  holdDuration?: number;
  items: string[];
  shiftOffset?: number;
  startFrame?: number;
};

export const GoldGradientStackList: React.FC<GoldGradientStackListProps> = ({
  dimOpacity = 0.15,
  easing = [0.16, 1, 0.3, 1],
  enterDuration = 30,
  exitDuration = 20,
  focusIndex = 1,
  fontSize = 96,
  gradientColors = ["#fef08a", "#ca8a04"],
  holdDuration = 45,
  items,
  shiftOffset = 120,
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

  const [color1, color2] = gradientColors;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        opacity: listOpacity,
      }}
    >
      {items.map((item, index) => {
        const isFocus = index === focusIndex;

        const itemEntryStart = startFrame + index * 10;
        const itemEntryEnd = itemEntryStart + 24;

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

        const opacity = isFocus ? 1 : dimOpacity * itemEntryT;
        const itemFontSize = isFocus ? fontSize : fontSize * 0.45;
        const shiftSign = index < focusIndex ? -1 : 1;
        const shift = isFocus ? 0 : shiftOffset * shiftSign * itemEntryT;

        const hasGradient = isFocus && gradientColors.length >= 2;

        return (
          <div
            key={item}
            style={{
              ...(hasGradient
                ? {
                    backgroundClip: "text",
                    backgroundImage: `linear-gradient(135deg, ${color1}, ${color2})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : {
                    color: color1,
                  }),
              fontFamily: "Anton",
              fontSize: itemFontSize,
              fontWeight: isFocus ? 700 : 400,
              lineHeight: 1,
              opacity,
              textTransform: "uppercase",
              transform: `translate3d(0, ${shift}px, 0) scale(${0.85 + 0.15 * itemEntryT})`,
              whiteSpace: "nowrap",
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
