import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { useAnton, useInter } from "../../hooks";

export type CardBulletListItem = {
  icon?: string;
  text: string;
};

export type CardBulletListProps = {
  backgroundColor?: string;
  bulletColor?: string;
  cardBackgroundColor?: string;
  cardBorderColor?: string;
  cardBorderRadius?: number;
  cardPadding?: number;
  enterDuration?: number;
  enterEasing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  itemFontSize?: number;
  itemGap?: number;
  items: CardBulletListItem[];
  staggerDelay?: number;
  startFrame?: number;
  textColor?: string;
  title: string;
  titleAccentUnderline?: boolean;
  titleFontSize?: number;
};

export const CardBulletList: React.FC<CardBulletListProps> = ({
  backgroundColor = "#09090c",
  bulletColor = "#cc4444",
  cardBackgroundColor = "transparent",
  cardBorderColor = "#cc4444",
  cardBorderRadius = 12,
  cardPadding = 36,
  enterDuration = 50,
  enterEasing = [0.16, 1, 0.3, 1],
  exitDuration = 30,
  exitEasing = [0.55, 0, 1, 1],
  itemFontSize = 20,
  itemGap = 18,
  items,
  staggerDelay = 10,
  startFrame = 0,
  textColor = "#f0f0f0",
  title,
  titleAccentUnderline = true,
  titleFontSize = 28,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  useAnton();
  useInter();

  const exitStart = durationInFrames - exitDuration;

  const cardEntryStart = startFrame;
  const cardEntryEnd = cardEntryStart + enterDuration * 0.6;
  const cardExitStart = exitStart;
  const cardExitEnd = cardExitStart + exitDuration;

  const cardEntry = interpolate(
    frame,
    [cardEntryStart, cardEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...enterEasing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const cardExit = interpolate(
    frame,
    [cardExitStart, cardExitEnd],
    [1, 0],
    {
      easing: Easing.bezier(...exitEasing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const cardScale = 0.94 + cardEntry * 0.06;
  const cardOpacity = Math.max(0, Math.min(cardEntry, cardExit));

  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: 48,
        width: "100%",
      }}
    >
      <div style={{ maxWidth: 560, width: "100%" }}>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              color: textColor,
              fontFamily: "Anton, Impact, sans-serif",
              fontSize: titleFontSize,
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              opacity: cardOpacity,
              textTransform: "uppercase",
              willChange: "opacity",
            }}
          >
            {title}
          </div>
          {titleAccentUnderline && (
            <div
              style={{
                backgroundColor: cardBorderColor,
                borderRadius: 1,
                height: 2,
                marginTop: 6,
                transform: `scaleX(${cardEntry})`,
                transformOrigin: "left",
                width: 32,
                willChange: "transform",
              }}
            />
          )}
        </div>
        <div
          style={{
            backgroundColor: cardBackgroundColor,
            border: `1px solid ${cardBorderColor}`,
            borderRadius: cardBorderRadius,
            opacity: cardOpacity,
            padding: cardPadding,
            transform: `scale(${Math.max(0, Math.min(cardScale, 1))})`,
            willChange: "transform, opacity",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: itemGap }}>
            {items.map((item, index) => {
              const itemStart =
                startFrame + enterDuration * 0.4 + index * staggerDelay;
              const itemEnterEnd = itemStart + enterDuration * 0.5;
              const itemExitStart =
                exitStart + index * staggerDelay * 0.5;
              const itemExitEnd = itemExitStart + exitDuration;

              const itemEntry = interpolate(
                frame,
                [itemStart, itemEnterEnd],
                [0, 1],
                {
                  easing: Easing.bezier(...enterEasing),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              const itemExit = interpolate(
                frame,
                [itemExitStart, itemExitEnd],
                [1, 0],
                {
                  easing: Easing.bezier(...exitEasing),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              const itemOpacity = Math.max(0, Math.min(itemEntry, itemExit));
              const itemX = (1 - itemEntry) * 10;
              const bulletScale = Math.max(0, Math.min(itemEntry, itemExit));
              const bulletRotate = (1 - itemEntry) * -90;

              const bulletMarginTop = itemFontSize * 0.4 + 2;

              return (
                <div
                  key={index}
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                    gap: 12,
                    opacity: itemOpacity,
                    transform: `translateX(${itemX}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    style={{
                      border: `1.5px solid ${bulletColor}`,
                      borderRadius: "50%",
                      flexShrink: 0,
                      height: 5,
                      marginTop: bulletMarginTop,
                      transform: `scale(${bulletScale}) rotate(${bulletRotate}deg)`,
                      width: 5,
                      willChange: "transform",
                    }}
                  />
                  {item.icon && (
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: itemFontSize,
                        lineHeight: 1,
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <div
                    style={{
                      color: textColor,
                      fontFamily: "Inter, sans-serif",
                      fontSize: itemFontSize,
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
