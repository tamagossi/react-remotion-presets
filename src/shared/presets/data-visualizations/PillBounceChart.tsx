import React from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type PillBounceChartProps = {
  animationDuration?: number;
  backgroundColor?: string;
  ballColor?: string;
  ballSize?: number;
  bounceDamping?: number;
  bounceMass?: number;
  bounceStiffness?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  holdDuration?: number;
  labelColor?: string;
  pillColor?: string;
  pillHeight?: number;
  pillWidth?: number;
  pills: Array<{
    color?: string;
    label: string;
    number: string;
  }>;
  staggerDelay?: number;
  subtitle?: string;
  subtitleColor?: string;
  textColor?: string;
  title?: string;
  titleColor?: string;
};

export const PillBounceChart: React.FC<PillBounceChartProps> = ({
  animationDuration = 40,
  backgroundColor = "#0f1115",
  ballColor = "#ffffff",
  ballSize = 64,
  bounceDamping = 10,
  bounceMass = 0.5,
  bounceStiffness = 100,
  easing: _easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  holdDuration = 60,
  labelColor = "#9ca3af",
  pillColor = "#1e40af",
  pillHeight = 320,
  pills,
  pillWidth = 72,
  staggerDelay = 8,
  subtitle = "",
  subtitleColor = "#6b7280",
  textColor,
  title = "",
  titleColor = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const {
    durationInFrames: _durationInFrames,
    fps,
    height,
    width,
  } = useVideoConfig();

  const totalFrames =
    animationDuration +
    holdDuration +
    exitDuration +
    staggerDelay * pills.length;

  const exitProgress = interpolate(
    frame,
    [totalFrames - exitDuration, totalFrames],
    [1, 0],
    {
      easing: Easing.in(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalWidth = pills.length * (pillWidth + 24) - 24;
  const startX = (width - totalWidth) / 2;
  const pillTop = height / 2 - pillHeight / 2 + 20;
  const actualBallSize = Math.min(ballSize, pillWidth - 8);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity * exitProgress,
          textAlign: "center",
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            color: titleColor,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.02em",
            marginTop: 50,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              color: subtitleColor,
              fontSize: 13,
              marginTop: 6,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Pills and balls */}
      {pills.map((pill, i) => {
        const pillX = startX + i * (pillWidth + 24);
        const delay = i * staggerDelay;

        const pillScale = spring({
          fps,
          frame: frame - (15 + delay),
          from: 0,
          to: 1,
          config: {
            damping: bounceDamping,
            mass: bounceMass,
            stiffness: bounceStiffness,
          },
        });

        const ballDropProgress = spring({
          fps,
          frame: frame - (25 + delay),
          from: 0,
          to: 1,
          config: {
            damping: bounceDamping * 0.8,
            mass: bounceMass * 1.2,
            stiffness: bounceStiffness * 0.8,
          },
        });

        const ballY = interpolate(
          ballDropProgress,
          [0, 1],
          [pillTop - 100, pillTop + (pillHeight - actualBallSize) / 2],
        );

        const labelOpacity = interpolate(
          frame,
          [35 + delay, 45 + delay],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const actualColor = pill.color || pillColor;

        return (
          <React.Fragment key={i}>
            {/* Pill background */}
            <div
              style={{
                background: `linear-gradient(180deg, ${actualColor}dd 0%, ${actualColor}88 100%)`,
                borderRadius: pillWidth / 2,
                height: pillHeight * pillScale,
                left: pillX,
                opacity: exitProgress,
                position: "absolute",
                top: pillTop + pillHeight * (1 - pillScale),
                width: pillWidth,
              }}
            />

            {/* Bouncing ball */}
            <div
              style={{
                alignItems: "center",
                backgroundColor: ballColor,
                borderRadius: "50%",
                boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
                display: "flex",
                height: actualBallSize,
                justifyContent: "center",
                left: pillX + (pillWidth - actualBallSize) / 2,
                opacity: (frame > 25 + delay ? 1 : 0) * exitProgress,
                position: "absolute",
                top: ballY,
                width: actualBallSize,
              }}
            >
              <span
                style={{
                  color: textColor ?? actualColor,
                  fontWeight: 700,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  fontSize: Math.min(
                    28,
                    Math.max(12, actualBallSize * 0.55) /
                      (pill.number.length * 0.5),
                  ),
                }}
              >
                {pill.number}
              </span>
            </div>

            {/* Label */}
            <div
              style={{
                color: labelColor,
                fontSize: 12,
                left: pillX,
                opacity: labelOpacity * exitProgress,
                position: "absolute",
                textAlign: "center",
                top: pillTop + pillHeight + 16,
                transform: `translateY(${(1 - labelOpacity) * 6}px)`,
                width: pillWidth,
              }}
            >
              {pill.label}
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
