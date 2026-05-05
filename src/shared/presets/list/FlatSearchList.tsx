import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { useInter } from "../../hooks";

export type FlatSearchListItem = {
  bulletColor?: string;
  title: string;
};

export type FlatSearchListProps = {
  accentColor?: string;
  accentIcon?: string;
  barBorderRadius?: number;
  barHeight?: number;
  barPaddingX?: number;
  barWidth?: number;
  bulletSize?: number;
  columns?: number;
  enterDuration?: number;
  enterEasing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  iconSize?: number;
  itemGap?: number;
  items: FlatSearchListItem[];
  itemTitleFontSize?: number;
  listStaggerDelay?: number;
  searchBarBackground?: string;
  searchQuery?: string;
  showAccentIcon?: boolean;
  startFrame?: number;
  textColor?: string;
  typewriterSpeed?: number;
};

export const FlatSearchList: React.FC<FlatSearchListProps> = ({
  accentColor = "#f59e0b",
  accentIcon = "🔍",
  barBorderRadius = 32,
  barHeight = 56,
  barPaddingX = 24,
  barWidth = 600,
  bulletSize = 10,
  columns = 2,
  enterDuration = 45,
  enterEasing = [0.16, 1, 0.3, 1],
  exitDuration = 30,
  exitEasing = [0.55, 0, 1, 1],
  iconSize = 20,
  itemGap = 16,
  items,
  itemTitleFontSize = 16,
  listStaggerDelay = 8,
  searchBarBackground = "#ffffff",
  searchQuery = "Top Four Acclaimed Films Overview",
  showAccentIcon = true,
  startFrame = 0,
  textColor = "#ffffff",
  typewriterSpeed = 2,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  useInter();

  const exitStart = durationInFrames - exitDuration;

  const barEntryStart = startFrame;
  const barEntryEnd = barEntryStart + enterDuration * 0.6;
  const barExitStart = exitStart;
  const barExitEnd = barExitStart + exitDuration;

  const barScaleEntry = interpolate(
    frame,
    [barEntryStart, barEntryEnd],
    [0.8, 1],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const barOpacityEntry = interpolate(
    frame,
    [barEntryStart, barEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...enterEasing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const barScaleExit = interpolate(
    frame,
    [barExitStart, barExitEnd],
    [1, 0.9],
    {
      easing: Easing.bezier(...exitEasing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const barOpacityExit = interpolate(
    frame,
    [barExitStart, barExitEnd],
    [1, 0],
    {
      easing: Easing.bezier(...exitEasing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const barScale = Math.max(0, Math.min(barScaleEntry, barScaleExit));
  const barOpacity = Math.max(0, Math.min(barOpacityEntry, barOpacityExit));

  const typewriterStart = barEntryEnd + 5;
  const charsToShow = Math.max(
    0,
    Math.floor((frame - typewriterStart) / typewriterSpeed),
  );
  const displayedQuery = searchQuery.slice(0, charsToShow);
  const showCursor =
    frame >= typewriterStart &&
    charsToShow < searchQuery.length &&
    frame % 30 < 15;

  const barStyle: React.CSSProperties = {
    backgroundColor: searchBarBackground,
    borderRadius: barBorderRadius,
    height: barHeight,
    maxWidth: barWidth,
    opacity: barOpacity,
    paddingLeft: barPaddingX,
    paddingRight: barPaddingX,
    transform: `scale(${barScale})`,
    width: "100%",
    willChange: "transform, opacity",
  };

  const midIndex = Math.ceil(items.length / columns);
  const col1 = items.slice(0, midIndex);
  const col2 = items.slice(midIndex);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        height: "100%",
        justifyContent: "center",
        padding: 48,
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 12,
          ...barStyle,
        }}
      >
        {showAccentIcon && (
          <div
            style={{
              alignItems: "center",
              backgroundColor: accentColor,
              borderRadius: "50%",
              color: "#ffffff",
              display: "flex",
              flexShrink: 0,
              fontSize: iconSize * 0.7,
              height: iconSize + 8,
              justifyContent: "center",
              width: iconSize + 8,
            }}
          >
            {accentIcon}
          </div>
        )}
        <div
          style={{
            color: "#1a1a1a",
            flex: 1,
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {displayedQuery}
          {showCursor && (
            <span style={{ color: "#1a1a1a", marginLeft: 1 }}>|</span>
          )}
        </div>
        <div
          style={{
            alignItems: "center",
            backgroundColor: accentColor,
            borderRadius: barBorderRadius,
            color: "#ffffff",
            display: "flex",
            flexShrink: 0,
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            height: 36,
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          Search
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
          maxWidth: barWidth,
          width: "100%",
        }}
      >
        {[col1, col2].map((col, colIndex) => (
          <div
            key={colIndex}
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: itemGap,
            }}
          >
            {col.map((item, index) => {
              const globalIndex = colIndex * midIndex + index;
              const itemStart =
                typewriterStart +
                searchQuery.length * typewriterSpeed +
                10 +
                globalIndex * listStaggerDelay;
              const itemEnterEnd = itemStart + enterDuration;
              const itemExitStart =
                exitStart + globalIndex * listStaggerDelay * 0.5;
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

              const itemOpacity = Math.max(
                0,
                Math.min(itemEntry, itemExit),
              );
              const itemY = (1 - itemEntry) * 16;

              const bulletBg = item.bulletColor || accentColor;

              return (
                <div
                  key={globalIndex}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: 10,
                    opacity: itemOpacity,
                    transform: `translateY(${itemY}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: bulletBg,
                      borderRadius: "50%",
                      flexShrink: 0,
                      height: bulletSize,
                      width: bulletSize,
                    }}
                  />
                  <div
                    style={{
                      color: textColor,
                      fontFamily: "Inter, sans-serif",
                      fontSize: itemTitleFontSize,
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
