import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { useBebasNeue, useSpaceGrotesk } from "../../hooks";

export type CompactBarListItem = {
  label: string;
  value?: string;
};

export type CompactBarListProps = {
  accentColor?: string;
  backgroundColor?: string;
  barHeight?: number;
  enterDuration?: number;
  enterEasing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  itemFontSize?: number;
  itemGap?: number;
  items: CompactBarListItem[];
  lineWidth?: number;
  showTitleUnderline?: boolean;
  staggerDelay?: number;
  startFrame?: number;
  textColor?: string;
  title?: string;
  titleFontSize?: number;
  valueColor?: string;
  valueFontSize?: number;
};

export const CompactBarList: React.FC<CompactBarListProps> = ({
  accentColor = "#6688cc",
  backgroundColor = "#09090c",
  // eslint-disable-next-line unused-imports/no-unused-vars
  barHeight = 22,
  enterDuration = 40,
  enterEasing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  exitEasing = [0.55, 0, 1, 1],
  itemFontSize = 18,
  itemGap = 14,
  items,
  lineWidth = 3,
  showTitleUnderline = true,
  staggerDelay = 8,
  startFrame = 0,
  textColor = "#f0f0f0",
  title,
  titleFontSize = 36,
  valueColor = "#78788a",
  valueFontSize = 16,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  useBebasNeue();
  useSpaceGrotesk();

  const exitStart = durationInFrames - exitDuration;

  const titleEntryEnd = startFrame + enterDuration * 0.4;

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

  const itemOffset = startFrame + enterDuration * 0.25;
  const lineHeight = itemFontSize * 1.2;

  return (
    <div
      style={{
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        gap: itemGap,
        height: "100%",
        justifyContent: "center",
        padding: 40,
        width: "100%",
      }}
    >
      {title && (
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              color: textColor,
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: titleFontSize,
              letterSpacing: "0.05em",
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
          {showTitleUnderline && (
            <div
              style={{
                backgroundColor: accentColor,
                borderRadius: 1,
                height: 2,
                marginTop: 4,
                transform: `scaleX(${titleEntry})`,
                transformOrigin: "left",
                width: 40,
                willChange: "transform",
              }}
            />
          )}
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
          ? 0.75 + Math.sin((frame - itemEnterEnd + index * 35) * 0.035) * 0.2
          : 1;

        const lineEntry = interpolate(
          frame,
          [itemStart, itemEnterEnd],
          [0, 1],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const lineExit = interpolate(
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

        const lineProgress = Math.max(0, Math.min(lineEntry, lineExit));
        const lineOpacity = lineProgress * ambientOpacity;
        const textOpacity = Math.max(0, Math.min(textEntry, textExit));
        const textY = (1 - textEntry) * 8;

        return (
          <div
            key={index}
            style={{
              alignItems: "center",
              display: "flex",
              gap: 16,
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: accentColor,
                borderRadius: lineWidth / 2,
                flexShrink: 0,
                height: lineHeight,
                opacity: lineOpacity,
                transform: `scaleY(${lineProgress})`,
                transformOrigin: "bottom",
                width: lineWidth,
                willChange: "transform, opacity",
              }}
            />
            <div
              style={{
                color: textColor,
                flex: 1,
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
            {item.value && (
              <div
                style={{
                  color: valueColor,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: valueFontSize,
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  opacity: textOpacity,
                  transform: `translateY(${textY}px)`,
                  willChange: "transform, opacity",
                }}
              >
                {item.value}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
