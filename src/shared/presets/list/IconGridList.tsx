import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { useInter, useMontserrat } from "../../hooks";

export type IconGridListItem = {
  description?: string;
  icon: string;
  label: string;
};

export type IconGridListProps = {
  accentColor?: string;
  backgroundColor?: string;
  cardBorderRadius?: number;
  cardGap?: number;
  cardPadding?: number;
  descriptionColor?: string;
  descriptionFontSize?: number;
  enterDuration?: number;
  enterEasing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  iconColor?: string;
  iconFontSize?: number;
  items: IconGridListItem[];
  labelFontSize?: number;
  startFrame?: number;
  staggerDelay?: number;
  textColor?: string;
};

export const IconGridList: React.FC<IconGridListProps> = ({
  accentColor = "#8b5cf6",
  backgroundColor = "#050508",
  cardBorderRadius = 14,
  cardGap = 16,
  cardPadding = 28,
  descriptionColor = "#94a3b8",
  descriptionFontSize = 14,
  enterDuration = 45,
  enterEasing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  exitEasing = [0.55, 0, 1, 1],
  iconColor = "#8b5cf6",
  iconFontSize = 28,
  items,
  labelFontSize = 18,
  staggerDelay = 10,
  startFrame = 0,
  textColor = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, height, width } = useVideoConfig();
  useInter();
  useMontserrat();

  const exitStart = durationInFrames - exitDuration;

  const cols = items.length <= 2 ? 2 : Math.min(4, Math.ceil(items.length / 2));
  const rows = Math.ceil(items.length / cols);

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
      <div
        style={{
          display: "grid",
          gap: cardGap,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          maxWidth: width - 96,
          width: "100%",
        }}
      >
        {items.map((item, index) => {
          const itemStart = startFrame + index * staggerDelay;
          const itemEnterEnd = itemStart + enterDuration;
          const itemExitStart = exitStart + index * staggerDelay * 0.5;
          const itemExitEnd = itemExitStart + exitDuration;

          const cardEntry = interpolate(
            frame,
            [itemStart, itemEnterEnd],
            [0, 1],
            {
              easing: Easing.out(Easing.back(1.2)),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const cardExit = interpolate(
            frame,
            [itemExitStart, itemExitEnd],
            [1, 0],
            {
              easing: Easing.bezier(...exitEasing),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const iconEntry = interpolate(
            frame,
            [itemStart + staggerDelay * 0.25, itemEnterEnd],
            [0, 1],
            {
              easing: Easing.out(Easing.back(1.4)),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const iconExit = interpolate(
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
            [itemStart + staggerDelay * 0.45, itemEnterEnd],
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

          const cardScale = 0.88 + cardEntry * 0.12;
          const cardOpacity = Math.max(0, Math.min(cardEntry, cardExit));
          const iconScale = Math.max(0, Math.min(iconEntry, iconExit));
          const textOpacity = Math.max(0, Math.min(textEntry, textExit));
          const textY = (1 - textEntry) * 10;

          const isInHold =
            frame >= itemEnterEnd && frame <= itemExitStart;
          const ambientY = isInHold
            ? Math.sin((frame - itemEnterEnd + index * 30) * 0.04) * 3
            : 0;

          const cardShadow = cardEntry * 0.15;

          return (
            <div
              key={index}
              style={{
                alignItems: "center",
                backgroundColor: "#0f0f16",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: cardBorderRadius,
                boxShadow: `0 8px 32px rgba(0, 0, 0, ${cardShadow})`,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                justifyContent: "center",
                opacity: cardOpacity,
                padding: cardPadding,
                transform: `scale(${Math.max(0, Math.min(cardScale, 1))}) translateY(${ambientY}px)`,
                willChange: "transform, opacity",
                minHeight:
                  rows > 1
                    ? Math.max(120, (height - 96 - cardGap * (rows - 1)) / rows)
                    : 140,
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  backgroundColor: `${accentColor}15`,
                  borderRadius: "50%",
                  display: "flex",
                  height: iconFontSize + 24,
                  justifyContent: "center",
                  opacity: iconScale,
                  transform: `scale(${iconScale})`,
                  width: iconFontSize + 24,
                  willChange: "transform, opacity",
                }}
              >
                <div
                  style={{
                    color: iconColor,
                    fontSize: iconFontSize,
                    lineHeight: 1,
                  }}
                >
                  {item.icon}
                </div>
              </div>
              <div
                style={{
                  color: textColor,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: labelFontSize,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  opacity: textOpacity,
                  textAlign: "center",
                  transform: `translateY(${textY}px)`,
                  willChange: "transform, opacity",
                }}
              >
                {item.label}
              </div>
              {item.description && (
                <div
                  style={{
                    color: descriptionColor,
                    fontFamily: "Inter, sans-serif",
                    fontSize: descriptionFontSize,
                    fontWeight: 400,
                    lineHeight: 1.3,
                    opacity: textOpacity * 0.85,
                    textAlign: "center",
                    transform: `translateY(${textY * 0.7}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
