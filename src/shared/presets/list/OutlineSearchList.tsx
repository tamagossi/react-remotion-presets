import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { useInter } from "../../hooks";

export type OutlineSearchListItem = {
  iconColor?: string;
  number?: number;
  subtitle?: string;
  title: string;
};

export type OutlineSearchListProps = {
  barBorderRadius?: number;
  barHeight?: number;
  barPaddingX?: number;
  enterDuration?: number;
  enterEasing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  iconSize?: number;
  itemGap?: number;
  itemIconStyle?: "checkmark" | "numbered";
  items: OutlineSearchListItem[];
  itemSubtitleColor?: string;
  itemSubtitleFontSize?: number;
  itemTitleFontSize?: number;
  listStaggerDelay?: number;
  numberFontSize?: number;
  numberSize?: number;
  outlineColor?: string;
  outlineWidth?: number;
  searchBarBackground?: string;
  searchQuery?: string;
  showClearButton?: boolean;
  showSearchIcon?: boolean;
  startFrame?: number;
  textColor?: string;
  typewriterSpeed?: number;
};

export const OutlineSearchList: React.FC<OutlineSearchListProps> = ({
  barBorderRadius = 32,
  barHeight = 56,
  barPaddingX = 24,
  enterDuration = 45,
  enterEasing = [0.16, 1, 0.3, 1],
  exitDuration = 30,
  exitEasing = [0.55, 0, 1, 1],
  iconSize = 20,
  itemGap = 16,
  itemIconStyle = "numbered",
  items,
  itemSubtitleColor = "#a0a0a0",
  itemSubtitleFontSize = 14,
  itemTitleFontSize = 18,
  listStaggerDelay = 10,
  numberFontSize = 14,
  numberSize = 36,
  outlineColor = "#3b82f6",
  outlineWidth = 2,
  searchBarBackground = "transparent",
  searchQuery = "Tips for Starting a Running Routine",
  showClearButton = true,
  showSearchIcon = true,
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
    border: `${outlineWidth}px solid ${outlineColor}`,
    borderRadius: barBorderRadius,
    height: barHeight,
    opacity: barOpacity,
    paddingLeft: barPaddingX,
    paddingRight: barPaddingX,
    transform: `scale(${barScale})`,
    willChange: "transform, opacity",
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 24,
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
          maxWidth: 600,
          width: "100%",
          ...barStyle,
        }}
      >
        {showSearchIcon && (
          <svg
            fill="none"
            height={iconSize}
            stroke={outlineColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            width={iconSize}
          >
            <circle cx={11} cy={11} r={8} />
            <line x1={21} x2={16.65} y1={21} y2={16.65} />
          </svg>
        )}
        <div
          style={{
            color: textColor,
            flex: 1,
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {displayedQuery}
          {showCursor && (
            <span style={{ color: textColor, marginLeft: 1 }}>|</span>
          )}
        </div>
        {showClearButton && (
          <div
            style={{
              color: outlineColor,
              cursor: "default",
              fontFamily: "Inter, sans-serif",
              fontSize: 18,
              opacity: barOpacity,
            }}
          >
            ×
          </div>
        )}
        {!showClearButton && showSearchIcon && (
          <svg
            fill="none"
            height={iconSize}
            stroke={outlineColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            width={iconSize}
          >
            <line x1={5} x2={19} y1={12} y2={12} />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: itemGap,
          maxWidth: 560,
          width: "100%",
        }}
      >
        {items.map((item, index) => {
          const itemStart =
            typewriterStart +
            searchQuery.length * typewriterSpeed +
            10 +
            index * listStaggerDelay;
          const itemEnterEnd = itemStart + enterDuration;
          const itemExitStart = exitStart + index * listStaggerDelay * 0.5;
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
          const itemY = (1 - itemEntry) * 20;

          const iconBg =
            item.iconColor || outlineColor;

          return (
            <div
              key={index}
              style={{
                alignItems: "center",
                display: "flex",
                gap: 14,
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
                willChange: "transform, opacity",
              }}
            >
              {itemIconStyle === "numbered" && item.number !== undefined ? (
                <div
                  style={{
                    alignItems: "center",
                    backgroundColor: iconBg,
                    borderRadius: "50%",
                    color: textColor,
                    display: "flex",
                    flexShrink: 0,
                    fontFamily: "Inter, sans-serif",
                    fontSize: numberFontSize,
                    fontWeight: 700,
                    height: numberSize,
                    justifyContent: "center",
                    width: numberSize,
                  }}
                >
                  {String(item.number).padStart(2, "0")}
                </div>
              ) : (
                <div
                  style={{
                    alignItems: "center",
                    border: `${outlineWidth}px solid ${iconBg}`,
                    borderRadius: "50%",
                    color: iconBg,
                    display: "flex",
                    flexShrink: 0,
                    fontFamily: "Inter, sans-serif",
                    fontSize: numberFontSize,
                    fontWeight: 700,
                    height: numberSize,
                    justifyContent: "center",
                    width: numberSize,
                  }}
                >
                  {itemIconStyle === "checkmark" ? (
                    <svg
                      fill="none"
                      height={14}
                      stroke={iconBg}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                      width={14}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    String(item.number ?? index + 1).padStart(2, "0")
                  )}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <div
                  style={{
                    color: textColor,
                    fontFamily: "Inter, sans-serif",
                    fontSize: itemTitleFontSize,
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </div>
                {item.subtitle && (
                  <div
                    style={{
                      color: itemSubtitleColor,
                      fontFamily: "Inter, sans-serif",
                      fontSize: itemSubtitleFontSize,
                      fontWeight: 400,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.subtitle}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
