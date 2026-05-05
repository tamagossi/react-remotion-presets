import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { useBebasNeue, useInter, useMontserrat } from "../../hooks";

export type TimelineScheduleListItem = {
  duration?: string;
  icon?: string;
  label: string;
  time: string;
};

export type TimelineScheduleListProps = {
  accentColor?: string;
  backgroundColor?: string;
  barHeight?: number;
  enterDuration?: number;
  enterEasing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  iconColor?: string;
  iconSize?: number;
  itemGap?: number;
  items: TimelineScheduleListItem[];
  labelFontSize?: number;
  markerSize?: number;
  secondaryTextColor?: string;
  spineWidth?: number;
  staggerDelay?: number;
  startFrame?: number;
  textColor?: string;
  timeFontSize?: number;
  trackColor?: string;
};

export const TimelineScheduleList: React.FC<
  TimelineScheduleListProps
> = ({
  accentColor = "#b8945c",
  backgroundColor = "#09090c",
  barHeight = 1,
  enterDuration = 45,
  enterEasing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  exitEasing = [0.55, 0, 1, 1],
  iconColor = "#b8945c",
  iconSize = 20,
  itemGap = 28,
  items,
  labelFontSize = 20,
  markerSize = 6,
  secondaryTextColor = "#78788a",
  spineWidth = 1,
  staggerDelay = 10,
  startFrame = 0,
  textColor = "#f0f0f0",
  timeFontSize = 16,
  trackColor = "rgba(255, 255, 255, 0.04)",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  useBebasNeue();
  useInter();
  useMontserrat();

  const exitStart = durationInFrames - exitDuration;

  const spineEntry = interpolate(
    frame,
    [startFrame, startFrame + enterDuration * 0.4],
    [0, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const spineExit = interpolate(
    frame,
    [exitStart, exitStart + exitDuration],
    [1, 0],
    {
      easing: Easing.bezier(...exitEasing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const spineScale = Math.max(0, Math.min(spineEntry, spineExit));

  const hasDuration = items.some((i) => i.duration);
  const approxRowHeight =
    labelFontSize * 1.2 +
    8 +
    barHeight +
    4 +
    itemGap +
    (hasDuration ? timeFontSize * 0.8 * 1.2 + 4 : 0);
  const spineTotalHeight = (items.length - 1) * approxRowHeight;

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
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: spineWidth / 2,
          height: spineTotalHeight,
          left: 48 + markerSize / 2,
          position: "absolute",
          top: 48,
          transform: `scaleY(${spineScale})`,
          transformOrigin: "top",
          width: spineWidth,
          willChange: "transform",
          zIndex: 0,
        }}
      />
      {items.map((item, index) => {
        const itemStart = startFrame + index * staggerDelay;
        const itemEnterEnd = itemStart + enterDuration;
        const itemExitStart = exitStart + index * staggerDelay * 0.4;
        const itemExitEnd = itemExitStart + exitDuration;

        // FIXED: use itemStart + enterDuration * 0.7 instead of itemEnterEnd * 0.7
        const barEntry = interpolate(
          frame,
          [itemStart, itemStart + enterDuration * 0.7],
          [0, 1],
          {
            easing: Easing.bezier(...enterEasing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const barExit = interpolate(
          frame,
          [itemExitStart, itemExitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...exitEasing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        // FIXED: use itemStart + enterDuration * 0.45 instead of itemEnterEnd * 0.55
        const markerEntry = interpolate(
          frame,
          [
            itemStart + staggerDelay * 0.1,
            itemStart + enterDuration * 0.45,
          ],
          [0, 1],
          {
            easing: Easing.out(Easing.back(1.3)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const markerExit = interpolate(
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

        const barScale = Math.max(0, Math.min(barEntry, barExit));
        const markerScale = Math.max(0, Math.min(markerEntry, markerExit));
        const textOpacity = Math.max(0, Math.min(textEntry, textExit));
        const textX = (1 - textEntry) * 8;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              paddingLeft: markerSize + 16,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: 12,
                position: "relative",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  backgroundColor: accentColor,
                  borderRadius: "50%",
                  display: "flex",
                  flexShrink: 0,
                  height: markerSize,
                  justifyContent: "center",
                  left: -markerSize - 16,
                  position: "absolute",
                  top: "50%",
                  transform: `translateY(-50%) scale(${markerScale})`,
                  width: markerSize,
                  willChange: "transform",
                  zIndex: 2,
                }}
              />
              {item.icon && (
                <div
                  style={{
                    color: iconColor,
                    fontSize: iconSize * 0.8,
                    lineHeight: 1,
                    opacity: textOpacity,
                    willChange: "opacity",
                  }}
                >
                  {item.icon}
                </div>
              )}
              <div
                style={{
                  color: textColor,
                  flex: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: labelFontSize,
                  fontWeight: 500,
                  lineHeight: 1.2,
                  opacity: textOpacity,
                  transform: `translateX(${textX}px)`,
                  willChange: "transform, opacity",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  color: secondaryTextColor,
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: timeFontSize,
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                  lineHeight: 1.2,
                  opacity: textOpacity,
                  transform: `translateX(${-textX * 0.5}px)`,
                  willChange: "transform, opacity",
                }}
              >
                {item.time}
              </div>
            </div>
            {item.duration && (
              <div
                style={{
                  color: secondaryTextColor,
                  fontFamily: "Inter, sans-serif",
                  fontSize: timeFontSize * 0.8,
                  fontWeight: 300,
                  lineHeight: 1.2,
                  opacity: textOpacity * 0.8,
                  paddingLeft: item.icon ? iconSize * 0.8 + 12 : 0,
                  transform: `translateX(${textX * 0.6}px)`,
                  willChange: "transform, opacity",
                }}
              >
                {item.duration}
              </div>
            )}
            <div
              style={{
                backgroundColor: trackColor,
                borderRadius: barHeight / 2,
                height: barHeight,
                marginTop: 4,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: accentColor,
                  borderRadius: barHeight / 2,
                  height: "100%",
                  transform: `scaleX(${barScale})`,
                  transformOrigin: "left",
                  width: "100%",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
