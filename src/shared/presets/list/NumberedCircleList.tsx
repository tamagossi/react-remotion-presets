import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { useBebasNeue, useInter, useMontserrat } from "../../hooks";

export type NumberedCircleListItem = {
  description?: string;
  label: string;
  number: number;
};

export type NumberedCircleListProps = {
  accentColor?: string;
  backgroundColor?: string;
  circleSize?: number;
  descriptionColor?: string;
  descriptionFontSize?: number;
  enterDuration?: number;
  enterEasing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  itemGap?: number;
  items: NumberedCircleListItem[];
  labelFontSize?: number;
  numberFontSize?: number;
  ringWidth?: number;
  showRipple?: boolean;
  staggerDelay?: number;
  startFrame?: number;
  textColor?: string;
};

export const NumberedCircleList: React.FC<NumberedCircleListProps> = ({
  accentColor = "#6688cc",
  backgroundColor = "#09090c",
  circleSize = 48,
  descriptionColor = "#78788a",
  descriptionFontSize = 14,
  enterDuration = 45,
  enterEasing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  exitEasing = [0.55, 0, 1, 1],
  itemGap = 28,
  items,
  labelFontSize = 22,
  numberFontSize = 24,
  ringWidth = 2,
  showRipple = false,
  staggerDelay = 10,
  startFrame = 0,
  textColor = "#f0f0f0",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  useBebasNeue();
  useInter();
  useMontserrat();

  const exitStart = durationInFrames - exitDuration;
  const svgSize = circleSize + ringWidth * 2;
  const svgCenter = svgSize / 2;
  const circumference = Math.PI * circleSize;

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
      {items.map((item, index) => {
        const itemStart = startFrame + index * staggerDelay;
        const itemEnterEnd = itemStart + enterDuration;
        const itemExitStart = exitStart + index * staggerDelay * 0.4;
        const itemExitEnd = itemExitStart + exitDuration;

        const ringEndFrame = itemStart + enterDuration * 0.45;

        const ringEntry = interpolate(
          frame,
          [itemStart, ringEndFrame],
          [0, 1],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const ringExit = interpolate(
          frame,
          [itemExitStart, itemExitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...exitEasing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const rippleEntry = interpolate(
          frame,
          [itemStart, itemStart + enterDuration * 0.6],
          [0, 1],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const rippleExit = interpolate(
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
          [itemStart + staggerDelay * 0.4, itemEnterEnd],
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

        const ringProgress = Math.max(0, Math.min(ringEntry, ringExit));
        const ringDashoffset = circumference * (1 - ringProgress);
        const numberFade = interpolate(
          frame,
          [ringEndFrame, ringEndFrame + 8],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
        const numberOpacity = Math.max(0, Math.min(numberFade, ringExit));
        const rippleOpacity = Math.max(
          0,
          Math.min(rippleEntry, rippleExit),
        );
        const rippleScale = 0.8 + rippleEntry * 0.7;
        const textOpacity = Math.max(0, Math.min(textEntry, textExit));
        const textX = (1 - textEntry) * 10;

        const spineTotalHeight =
          (items.length - 1) * (svgSize + itemGap);

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
                flexShrink: 0,
                height: svgSize,
                position: "relative",
                width: svgSize,
              }}
            >
              {index === 0 && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    borderRadius: 0.5,
                    height: spineTotalHeight,
                    left: svgCenter - 0.5,
                    position: "absolute",
                    top: svgSize,
                    transform: `scaleY(${spineScale})`,
                    transformOrigin: "top",
                    width: 1,
                    willChange: "transform",
                    zIndex: 0,
                  }}
                />
              )}
              <svg
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                width={svgSize}
                style={{
                  left: 0,
                  position: "absolute",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <circle
                  cx={svgCenter}
                  cy={svgCenter}
                  fill="transparent"
                  r={circleSize / 2}
                  stroke={accentColor}
                  strokeDasharray={circumference.toFixed(1)}
                  strokeDashoffset={ringDashoffset.toFixed(1)}
                  strokeLinecap="round"
                  strokeWidth={ringWidth}
                  transform={`rotate(-90 ${svgCenter} ${svgCenter})`}
                />
              </svg>
              {showRipple && (
                <div
                  style={{
                    border: `1px solid ${accentColor}`,
                    borderRadius: "50%",
                    height: svgSize * 1.2,
                    left: "50%",
                    opacity: rippleOpacity,
                    position: "absolute",
                    top: "50%",
                    transform: `translate(-50%, -50%) scale(${rippleScale})`,
                    width: svgSize * 1.2,
                    willChange: "transform, opacity",
                    zIndex: 0,
                  }}
                />
              )}
              <div
                style={{
                  alignItems: "center",
                  color: accentColor,
                  display: "flex",
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: numberFontSize,
                  height: svgSize,
                  justifyContent: "center",
                  left: 0,
                  lineHeight: 1,
                  opacity: numberOpacity,
                  position: "absolute",
                  top: 0,
                  width: svgSize,
                  willChange: "opacity",
                  zIndex: 2,
                }}
              >
                {String(item.number).padStart(2, "0")}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div
                style={{
                  color: textColor,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: labelFontSize,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  opacity: textOpacity,
                  transform: `translateX(${textX}px)`,
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
                    transform: `translateX(${textX * 0.7}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
