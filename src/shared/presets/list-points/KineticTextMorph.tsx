import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type KineticTextMorphProps = {
  animationDuration?: number;
  dimOpacity?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  gradientColors?: string[];
  holdDuration?: number;
  itemGap?: number;
  items: string[];
  morphBlur?: number;
  morphDuration?: number;
  prefixText?: string;
  prefixTextColor?: string;
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const KineticTextMorph: React.FC<KineticTextMorphProps> = ({
  animationDuration = 40,
  dimOpacity = 0.15,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  gradientColors = ["#f472b6", "#a78bfa", "#06b6d4"],
  holdDuration = 30,
  itemGap = 8,
  items,
  morphBlur = 8,
  morphDuration = 30,
  prefixText = "You are",
  prefixTextColor = "#ffffff",
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

  const morphProgress =
    (Math.max(0, frame - startFrame) / morphDuration) % items.length;
  const activeIndex = Math.floor(morphProgress);
  const morphT = morphProgress % 1;

  const prefixEntryStart = startFrame;
  const prefixEntryEnd = prefixEntryStart + 20;
  const prefixEntryT = interpolate(
    frame,
    [prefixEntryStart, prefixEntryEnd],
    [0, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

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
      <div
        style={{
          color: prefixTextColor,
          fontFamily,
          fontSize,
          fontWeight,
          opacity: prefixEntryT,
          textTransform,
          transform: `translate3d(0, ${(1 - prefixEntryT) * 20}px, 0)`,
          willChange: "transform, opacity",
        }}
      >
        {prefixText}
      </div>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const isPrev =
          index === (activeIndex - 1 + items.length) % items.length;
        const isNext = index === (activeIndex + 1) % items.length;

        let itemOpacity = dimOpacity;
        let itemBlur = morphBlur;
        let itemScale = 0.9;

        if (isActive) {
          itemOpacity = 1 - morphT * 0.5;
          itemBlur = morphT * morphBlur;
          itemScale = 1 - morphT * 0.05;
        } else if (isNext) {
          itemOpacity = dimOpacity + morphT * (1 - dimOpacity);
          itemBlur = (1 - morphT) * morphBlur;
          itemScale = 0.9 + morphT * 0.1;
        } else if (isPrev) {
          itemOpacity = Math.max(0, dimOpacity - morphT);
          itemBlur = morphBlur;
          itemScale = 0.85;
        }

        const gradientIndex = index % gradientColors.length;
        const useGradient = index % 2 === 0 && gradientColors.length > 0;

        return (
          <div
            key={item}
            style={{
              color: useGradient ? gradientColors[gradientIndex] : textColor,
              filter: `blur(${itemBlur}px)`,
              fontFamily,
              fontSize: fontSize * 0.8,
              fontWeight,
              opacity: itemOpacity,
              textTransform,
              transform: `scale(${itemScale})`,
              transition: "none",
              willChange: "transform, opacity, filter",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
