import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type AnimationDirection = "down" | "left" | "right" | "up";

export type LineAccent = "both" | "left" | "none" | "right";

function getOppositeDirection(dir: AnimationDirection): AnimationDirection {
  switch (dir) {
    case "down":
      return "up";
    case "left":
      return "right";
    case "right":
      return "left";
    case "up":
      return "down";
  }
}

export type TitleAnimationOptions = {
  frame: number;
  index: number;
  startFrame: number;
  animationDuration: number;
  staggerDelay: number;
  easing: [number, number, number, number];
  direction: AnimationDirection;
  opacityStart?: number;
  translateDistance?: number;
  holdDuration?: number;
  exitDuration?: number;
  exitDirection?: AnimationDirection;
};

export function getLineAnimationStyle(
  options: TitleAnimationOptions,
): React.CSSProperties {
  const {
    animationDuration,
    direction,
    easing,
    exitDirection,
    exitDuration = 0,
    frame,
    holdDuration = 0,
    index,
    opacityStart = 0,
    staggerDelay,
    startFrame,
    translateDistance = 60,
  } = options;

  const lineStart = startFrame + index * staggerDelay;
  const entryEnd = lineStart + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const entryT = interpolate(frame, [lineStart, entryEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let opacity = 1;
  let x = 0;
  let y = 0;

  if (exitDuration > 0 && frame >= exitStart) {
    const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    opacity = exitT;
    const dist = (1 - exitT) * translateDistance;
    const activeDirection = getOppositeDirection(
      exitDirection ?? getOppositeDirection(direction),
    );
    switch (activeDirection) {
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
  } else if (frame < entryEnd) {
    opacity = interpolate(
      frame,
      [lineStart, lineStart + animationDuration * 0.4],
      [opacityStart, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    const dist = (1 - entryT) * translateDistance;
    switch (direction) {
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
  }

  return {
    opacity: Math.max(opacity, 0),
    transform: `translate3d(${x}px, ${y}px, 0)`,
    willChange: "transform, opacity",
  };
}

type AberrationProgress = {
  offset: number;
  ghostOpacity: number;
};

export function getChromaticAberration(
  frame: number,
  lineStart: number,
  animationDuration: number,
  maxOffset = 14,
): AberrationProgress {
  const aberrationEnd = lineStart + animationDuration * 0.4;
  const offset = interpolate(
    frame,
    [lineStart, aberrationEnd],
    [maxOffset, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const ghostOpacity = interpolate(
    frame,
    [lineStart, aberrationEnd],
    [0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return { ghostOpacity, offset };
}

export type AnimatedTitleProps = {
  lines: string[];
  fontSize?: number | number[];
  fontWeight?: number | number[];
  color?: string | string[];
  letterSpacing?: number | number[];
  lineHeight?: number | number[];
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
  align?: "center" | "left" | "right";
  fontFamily?: string;
  gap?: number;
  startFrame?: number;
  animationDuration?: number;
  staggerDelay?: number;
  easing?: [number, number, number, number];
  entranceDirection?: AnimationDirection;
  opacityStart?: number;
  xOffset?: number;
  yOffset?: number;
  accent?: LineAccent | LineAccent[];
  accentLength?: number;
  accentThickness?: number;
  accentGap?: number;
  chromaticAberration?: boolean;
  chromaticOffset?: number;
  children?: React.ReactNode;
  holdDuration?: number;
  exitDuration?: number;
  exitDirection?: AnimationDirection;
};

function resolvePerLine<T>(
  value: T | T[] | undefined,
  index: number,
  defaultValue: T,
): T {
  if (value === undefined) return defaultValue;
  if (Array.isArray(value)) {
    return value[index] ?? value[value.length - 1] ?? defaultValue;
  }
  return value;
}

const GHOST_LAYERS: { color: string; axis: "x" | "y"; sign: -1 | 1 }[] = [
  { axis: "x", color: "#00f0ff", sign: -1 },
  { axis: "x", color: "#ff0080", sign: 1 },
  { axis: "y", color: "#fff200", sign: 1 },
];

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  accent = "none",
  accentGap = 16,
  accentLength = 96,
  accentThickness = 3,
  align = "center",
  animationDuration = 30,
  children,
  chromaticAberration = true,
  chromaticOffset = 14,
  color = "#ffffff",
  easing = [0.16, 1, 0.3, 1],
  entranceDirection = "up",
  exitDirection,
  exitDuration = 0,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  gap = 16,
  holdDuration = 0,
  letterSpacing = 0.02,
  lineHeight = 1.1,
  lines,
  opacityStart = 0,
  staggerDelay = 8,
  startFrame = 0,
  textTransform = "uppercase",
  xOffset = 0,
  yOffset = 0,
}) => {
  const frame = useCurrentFrame();

  const hasExit = exitDuration > 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
        transform: `translate3d(${xOffset}px, ${yOffset}px, 0)`,
        alignItems:
          align === "left"
            ? "flex-start"
            : align === "right"
              ? "flex-end"
              : "center",
      }}
    >
      {lines.map((text, i) => {
        const wrapperStyle = getLineAnimationStyle({
          animationDuration,
          direction: entranceDirection,
          easing,
          exitDirection,
          exitDuration,
          frame,
          holdDuration,
          index: i,
          opacityStart,
          staggerDelay,
          startFrame,
        });

        const lineStart = startFrame + i * staggerDelay;
        const entryEnd = lineStart + animationDuration;
        const lineExitStart = entryEnd + holdDuration;

        const isExiting = hasExit && frame >= lineExitStart + i * staggerDelay;

        const aberration = chromaticAberration
          ? getChromaticAberration(
              frame,
              lineStart,
              animationDuration,
              chromaticOffset,
            )
          : { ghostOpacity: 0, offset: 0 };

        const accentMode = resolvePerLine<LineAccent>(accent, i, "none");
        const accentEntryT = interpolate(
          frame,
          [lineStart, lineStart + animationDuration],
          [0, 1],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        let accentWidth: number;
        if (hasExit) {
          const lineExitEnd = lineExitStart + i * staggerDelay + exitDuration;
          const accentExitT = interpolate(
            frame,
            [lineExitStart + i * staggerDelay, lineExitEnd],
            [1, 0],
            {
              easing: Easing.bezier(...easing),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );
          accentWidth = (isExiting ? accentExitT : accentEntryT) * accentLength;
        } else {
          accentWidth = accentEntryT * accentLength;
        }

        const baseColor = resolvePerLine(color, i, "#ffffff");
        const resolvedFontSize = resolvePerLine(fontSize, i, 72);
        const resolvedFontWeight = resolvePerLine(fontWeight, i, 400);
        const resolvedLetterSpacing = resolvePerLine(letterSpacing, i, 0.02);
        const resolvedLineHeight = resolvePerLine(lineHeight, i, 1.1);

        const textStyle: React.CSSProperties = {
          color: baseColor,
          fontFamily,
          fontSize: resolvedFontSize,
          fontWeight: resolvedFontWeight,
          letterSpacing: `${resolvedLetterSpacing}em`,
          lineHeight: resolvedLineHeight,
          textTransform,
          whiteSpace: "nowrap",
        };

        const renderAccent = (side: "left" | "right") => (
          <span
            style={{
              backgroundColor: baseColor,
              flexShrink: 0,
              height: accentThickness,
              marginLeft: side === "right" ? accentGap : 0,
              marginRight: side === "left" ? accentGap : 0,
              width: accentWidth,
            }}
          />
        );

        const showLeft = accentMode === "left" || accentMode === "both";
        const showRight = accentMode === "right" || accentMode === "both";

        return (
          <div
            key={i}
            style={{
              ...wrapperStyle,
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {showLeft ? renderAccent("left") : null}
            <div style={{ position: "relative" }}>
              {chromaticAberration && aberration.offset > 0.01
                ? GHOST_LAYERS.map((layer, gi) => {
                    const dx =
                      layer.axis === "x" ? layer.sign * aberration.offset : 0;
                    const dy =
                      layer.axis === "y" ? layer.sign * aberration.offset : 0;
                    return (
                      <div
                        aria-hidden
                        key={gi}
                        style={{
                          ...textStyle,
                          color: layer.color,
                          left: 0,
                          mixBlendMode: "screen",
                          opacity: aberration.ghostOpacity,
                          pointerEvents: "none",
                          position: "absolute",
                          top: 0,
                          transform: `translate3d(${dx}px, ${dy}px, 0)`,
                        }}
                      >
                        {text}
                      </div>
                    );
                  })
                : null}
              <div style={{ ...textStyle, position: "relative" }}>{text}</div>
            </div>
            {showRight ? renderAccent("right") : null}
          </div>
        );
      })}
      {children}
    </div>
  );
};
