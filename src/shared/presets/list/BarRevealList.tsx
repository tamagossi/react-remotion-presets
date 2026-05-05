import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { useBebasNeue, useInter, useSpaceGrotesk } from "../../hooks";

export type BarRevealListItem = {
  label: string;
  sublabel?: string;
};

export type BarRevealListProps = {
  accentColor?: string;
  backgroundColor?: string;
  barHeight?: number;
  enterDuration?: number;
  enterEasing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  itemFontSize?: number;
  itemGap?: number;
  items: BarRevealListItem[];
  ruleWidth?: number;
  secondaryTextColor?: string;
  staggerDelay?: number;
  startFrame?: number;
  sublabelFontSize?: number;
  textColor?: string;
  title?: string;
  titleFontSize?: number;
};

export const BarRevealList: React.FC<BarRevealListProps> = ({
  accentColor = "#cc4444",
  backgroundColor = "#09090c",
  // eslint-disable-next-line unused-imports/no-unused-vars
  barHeight = 32,
  enterDuration = 45,
  enterEasing = [0.16, 1, 0.3, 1],
  exitDuration = 30,
  exitEasing = [0.55, 0, 1, 1],
  itemFontSize = 24,
  itemGap = 28,
  items,
  ruleWidth = 2,
  secondaryTextColor = "#78788a",
  staggerDelay = 10,
  startFrame = 0,
  sublabelFontSize = 15,
  textColor = "#f0f0f0",
  title,
  titleFontSize = 56,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  useBebasNeue();
  useInter();
  useSpaceGrotesk();

  const exitStart = durationInFrames - exitDuration;

  const titleEntryEnd = startFrame + enterDuration * 0.45;

  const titleEntry = interpolate(
    frame,
    [startFrame, titleEntryEnd],
    [0, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const titleExit = interpolate(
    frame,
    [exitStart, exitStart + exitDuration],
    [1, 0],
    {
      easing: Easing.bezier(...exitEasing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const titleOpacity = Math.max(0, Math.min(titleEntry, titleExit));
  const titleScale = 0.94 + titleEntry * 0.06;
  const titleLetterSpacing = `${(
    (1 - titleEntry) * 0.06 +
    0.05
  ).toFixed(3)}em`;

  const itemOffset = startFrame + enterDuration * 0.25;
  const ruleHeight = itemFontSize * 1.2;

  return (
    <div
      style={{
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        gap: itemGap,
        height: "100%",
        justifyContent: "center",
        padding: 48,
        width: "100%",
      }}
    >
      {title && (
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              color: textColor,
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: titleFontSize,
              letterSpacing: titleLetterSpacing,
              lineHeight: 1.1,
              opacity: titleOpacity,
              textTransform: "uppercase",
              transform: `scale(${Math.max(0, Math.min(titleScale, 1))})`,
              transformOrigin: "left",
              willChange: "transform, opacity",
            }}
          >
            {title}
          </div>
          <div
            style={{
              backgroundColor: accentColor,
              borderRadius: 1,
              height: 2,
              marginTop: 6,
              opacity: titleOpacity,
              transform: `scaleX(${titleEntry})`,
              transformOrigin: "left",
              width: 56,
              willChange: "transform, opacity",
            }}
          />
        </div>
      )}
      {items.map((item, index) => {
        const itemStart = itemOffset + index * staggerDelay;
        const itemEnterEnd = itemStart + enterDuration;
        const itemExitStart = exitStart + index * staggerDelay * 0.4;
        const itemExitEnd = itemExitStart + exitDuration;

        const isInHold =
          frame >= itemEnterEnd && frame <= itemExitStart;
        const ambientOpacity = isInHold
          ? 0.7 + Math.sin((frame - itemEnterEnd + index * 40) * 0.03) * 0.2
          : 1;

        const ruleEntry = interpolate(frame, [itemStart, itemEnterEnd], [0, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const ruleExit = interpolate(
          frame,
          [itemExitStart, itemExitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...exitEasing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const textEntry = interpolate(
          frame,
          [itemStart + staggerDelay * 0.3, itemEnterEnd],
          [0, 1],
          {
            easing: Easing.bezier(...enterEasing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const textExit = interpolate(
          frame,
          [itemExitStart, itemExitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...exitEasing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const ruleProgress = Math.max(0, Math.min(ruleEntry, ruleExit));
        const ruleOpacity = ruleProgress * ambientOpacity;
        const textOpacity = Math.max(0, Math.min(textEntry, textExit));
        const textY = (1 - textEntry) * 10;

        const sublabelEntry = interpolate(
          frame,
          [itemStart + staggerDelay * 0.55, itemEnterEnd],
          [0, 1],
          {
            easing: Easing.bezier(...enterEasing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const sublabelOpacity = Math.max(0, Math.min(sublabelEntry, textExit));

        return (
          <div
            key={index}
            style={{
              alignItems: "flex-start",
              display: "flex",
              gap: 18,
              position: "relative",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                height: ruleHeight,
                position: "relative",
                width: ruleWidth,
              }}
            >
              <div
                style={{
                  backgroundColor: accentColor,
                  borderRadius: ruleWidth / 2,
                  height: ruleHeight,
                  opacity: ruleOpacity,
                  transform: `scaleY(${ruleProgress})`,
                  transformOrigin: "top",
                  width: ruleWidth,
                  willChange: "transform, opacity",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  color: textColor,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: itemFontSize,
                  fontWeight: 500,
                  lineHeight: 1.2,
                  opacity: textOpacity,
                  transform: `translateY(${textY}px)`,
                  willChange: "transform, opacity",
                }}
              >
                {item.label}
              </div>
              {item.sublabel && (
                <div
                  style={{
                    color: secondaryTextColor,
                    fontFamily: "Inter, sans-serif",
                    fontSize: sublabelFontSize,
                    fontWeight: 400,
                    lineHeight: 1.35,
                    marginTop: 3,
                    opacity: sublabelOpacity,
                    transform: `translateY(${textY * 0.4}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  {item.sublabel}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
