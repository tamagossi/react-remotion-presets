import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

import { AnimationDirection } from "./TitleAnimationEngine";

export type MixedEmphasisSegment = {
  color?: string;
  fontSize?: number;
  fontStyle?: "italic" | "normal";
  fontWeight?: number;
  letterSpacing?: number;
  text: string;
};

export type MixedEmphasisTitleProps = {
  align?: "center" | "left" | "right";
  animationDuration?: number;
  easing?: [number, number, number, number];
  entranceDirection?: AnimationDirection;
  fontFamily?: string;
  gap?: number;
  lineGap?: number;
  segments: MixedEmphasisSegment[] | MixedEmphasisSegment[][];
  startFrame?: number;
  exitDuration?: number;
  holdDuration?: number;
  staggerDelay?: number;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const MixedEmphasisTitle: React.FC<MixedEmphasisTitleProps> = ({
  align = "center",
  animationDuration = 45,
  easing = [0.16, 1, 0.3, 1],
  entranceDirection = "up",
  exitDuration = 0,
  fontFamily = "Anton",
  gap = 12,
  holdDuration = 0,
  lineGap = 24,
  segments,
  staggerDelay = 8,
  startFrame = 0,
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const entryEndGlobal = startFrame + animationDuration;
  const exitStartGlobal = entryEndGlobal + holdDuration;
  const exitFade =
    exitDuration > 0
      ? interpolate(
          frame,
          [exitStartGlobal, exitStartGlobal + exitDuration],
          [1, 0],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        )
      : 1;

  const lines: MixedEmphasisSegment[][] = Array.isArray(segments[0])
    ? (segments as MixedEmphasisSegment[][])
    : [segments as MixedEmphasisSegment[]];

  const getLineStyle = (lineIndex: number): React.CSSProperties => {
    const lineStart = startFrame + lineIndex * staggerDelay * 2;
    const lineEnd = lineStart + animationDuration;

    const t = interpolate(frame, [lineStart, lineEnd], [0, 1], {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const opacity = interpolate(
      frame,
      [lineStart, lineStart + animationDuration * 0.4],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    let x = 0;
    let y = 0;
    const dist = (1 - t) * 50;

    switch (entranceDirection) {
      case "down":
        y = -dist;
        break;
      case "left":
        x = dist;
        break;
      case "right":
        x = -dist;
        break;
      case "up":
        y = dist;
        break;
    }

    return {
      opacity: Math.max(opacity * exitFade, 0),
      transform: `translate3d(${x}px, ${y}px, 0)`,
      willChange: "transform, opacity",
    };
  };

  const getSegmentStyle = (
    lineIndex: number,
    segmentIndex: number,
    seg: MixedEmphasisSegment,
  ): React.CSSProperties => {
    const segStart =
      startFrame + lineIndex * staggerDelay * 2 + segmentIndex * staggerDelay;
    const segEnd = segStart + animationDuration * 0.6;

    const t = interpolate(frame, [segStart, segEnd], [0, 1], {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const opacity = interpolate(
      frame,
      [segStart, segStart + animationDuration * 0.35],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    return {
      color: seg.color ?? "#ffffff",
      fontFamily,
      fontSize: seg.fontSize ?? 72,
      fontStyle: seg.fontStyle ?? "normal",
      fontWeight: seg.fontWeight ?? 700,
      letterSpacing: `${seg.letterSpacing ?? 0.02}em`,
      lineHeight: 1.1,
      opacity: Math.max(opacity * exitFade, 0),
      textTransform,
      transform: `translate3d(0, ${(1 - t) * 30}px, 0)`,
      whiteSpace: "pre",
      willChange: "transform, opacity",
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: lineGap,
        alignItems:
          align === "left"
            ? "flex-start"
            : align === "right"
              ? "flex-end"
              : "center",
      }}
    >
      {lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          style={{
            ...getLineStyle(lineIndex),
            alignItems: "baseline",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap,
            justifyContent:
              align === "left"
                ? "flex-start"
                : align === "right"
                  ? "flex-end"
                  : "center",
          }}
        >
          {line.map((seg, segIndex) => (
            <span
              key={segIndex}
              style={getSegmentStyle(lineIndex, segIndex, seg)}
            >
              {seg.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
