import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

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
  exitDuration?: number;
  gap?: number;
  holdDuration?: number;
  lineGap?: number;
  segments: MixedEmphasisSegment[] | MixedEmphasisSegment[][];
  staggerDelay?: number;
  startFrame?: number;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const MixedEmphasisTitle: React.FC<MixedEmphasisTitleProps> = ({
  align = "center",
  animationDuration = 45,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  gap = 12,
  holdDuration = 30,
  lineGap = 24,
  segments,
  staggerDelay = 8,
  startFrame = 0,
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const easingFn = Easing.bezier(...easing);
  const bounceEasing = Easing.bezier(0.16, 1.3, 0.3, 1);

  const entryEndGlobal = startFrame + animationDuration;
  const exitStartGlobal = entryEndGlobal + holdDuration;
  const hasExit = exitDuration > 0;

  const lines: MixedEmphasisSegment[][] = Array.isArray(segments[0])
    ? (segments as MixedEmphasisSegment[][])
    : [segments as MixedEmphasisSegment[]];

  const flatSegments: {
    lineIndex: number;
    seg: MixedEmphasisSegment;
    segIndex: number;
  }[] = [];
  for (let li = 0; li < lines.length; li++) {
    for (let si = 0; si < lines[li].length; si++) {
      flatSegments.push({
        lineIndex: li,
        seg: lines[li][si],
        segIndex: si,
      });
    }
  }
  const totalSegments = flatSegments.length;

  const getSegStyle = (
    globalIdx: number,
    lineIdx: number,
    seg: MixedEmphasisSegment,
  ): React.CSSProperties => {
    const segStart = startFrame + globalIdx * staggerDelay;
    const segEnd = segStart + animationDuration * 0.5;

    const entryT = interpolate(frame, [segStart, segEnd], [0, 1], {
      easing: easingFn,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const opacity = interpolate(
      frame,
      [segStart, segStart + animationDuration * 0.3],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    const translateY = (1 - entryT) * 25;

    const rotationT = interpolate(frame, [segStart, segEnd], [-3, 0], {
      easing: bounceEasing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    let finalOpacity = Math.min(opacity, 1);
    if (hasExit) {
      const exitStagger = (totalSegments - 1 - globalIdx) * staggerDelay;
      const exitStart = exitStartGlobal + exitStagger;
      const exitEnd = exitStart + exitDuration * 0.6;
      if (frame >= exitStart) {
        finalOpacity = interpolate(frame, [exitStart, exitEnd], [1, 0], {
          easing: easingFn,
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
      }
    }

    const segFontSize = seg.fontSize ?? 72;
    const segFontWeight = seg.fontWeight ?? 700;
    const segFontStyle = seg.fontStyle ?? "normal";
    const segColor = seg.color ?? "#ffffff";
    const segLetterSpacing = seg.letterSpacing ?? 0;

    return {
      color: segColor,
      fontFamily: "DM Sans",
      fontSize: segFontSize,
      fontStyle: segFontStyle,
      fontWeight: segFontWeight,
      letterSpacing: `${segLetterSpacing}em`,
      lineHeight: 1.1,
      opacity: Math.max(finalOpacity, 0),
      textTransform,
      transform: `translate3d(0, ${translateY}px, 0) rotate(${rotationT}deg)`,
      whiteSpace: "pre",
      willChange: "transform, opacity",
    };
  };

  const getLineOpacity = (lineIdx: number): number => {
    const lineStart = startFrame + lineIdx * staggerDelay * 3;
    const lineOpacity = interpolate(
      frame,
      [lineStart, lineStart + animationDuration * 0.3],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    if (!hasExit) return Math.min(lineOpacity, 1);
    const lastSegInLine = flatSegments.filter((f) => f.lineIndex === lineIdx);
    if (lastSegInLine.length === 0) return Math.min(lineOpacity, 1);
    const maxGlobalInLine = flatSegments.indexOf(
      lastSegInLine[lastSegInLine.length - 1],
    );
    const exitStagger = (totalSegments - 1 - maxGlobalInLine) * staggerDelay;
    const exitStart = exitStartGlobal + exitStagger;
    const exitEnd = exitStart + exitDuration * 0.6 + animationDuration * 0.15;
    if (frame >= exitStart) {
      return interpolate(frame, [exitStart, exitEnd], [1, 0], {
        easing: easingFn,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    return Math.min(lineOpacity, 1);
  };

  const justifyContent =
    align === "left"
      ? "flex-start"
      : align === "right"
        ? "flex-end"
        : "center";

  const alignItems =
    align === "left"
      ? "flex-start"
      : align === "right"
        ? "flex-end"
        : "center";

  let gi = 0;

  return (
    <div
      style={{
        alignItems,
        display: "flex",
        flexDirection: "column",
        gap: lineGap,
      }}
    >
      {lines.map((line, lineIndex) => {
        const lineOpacity = getLineOpacity(lineIndex);
        return (
          <div
            key={lineIndex}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap,
              justifyContent,
              opacity: Math.max(lineOpacity, 0),
              willChange: "opacity",
            }}
          >
            {line.map((seg, segIndex) => {
              const style = getSegStyle(gi, lineIndex, seg);
              gi++;
              return (
                <span key={segIndex} style={style}>
                  {seg.text}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
