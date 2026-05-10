import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type KineticSlamTitleProps = {
  align?: "center" | "left" | "right";
  animationDuration?: number;
  animationMode?: "letterStagger" | "outlineSwap" | "scaleSlam";
  easing?: [number, number, number, number];
  exitDuration?: number;
  exitEasing?: [number, number, number, number];
  fontSize?: number;
  fontWeight?: number;
  glowColor?: string;
  glowIntensity?: number;
  glowSpread?: number;
  holdDuration?: number;
  letterSpacing?: number;
  lines: string[];
  outlineColor?: string;
  startFrame?: number;
  textColor?: string;
};

export const KineticSlamTitle: React.FC<KineticSlamTitleProps> = ({
  align = "center",
  animationDuration = 40,
  animationMode = "scaleSlam",
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 20,
  exitEasing = [0.55, 0, 1, 1],
  fontSize = 96,
  fontWeight = 700,
  glowColor = "#7c3aed",
  glowIntensity = 0.25,
  glowSpread = 300,
  holdDuration = 45,
  letterSpacing = 0.02,
  lines = ["MAKE IT", "HAPPEN"],
  outlineColor = "#ffffff",
  startFrame = 0,
  textColor = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const glowBreathe =
    Math.sin((frame / durationInFrames) * Math.PI * 4) * 0.5 + 0.5;
  const glowOpacity =
    glowIntensity * 0.6 + glowBreathe * (glowIntensity * 0.4);

  const getLineContainerStyle = (index: number): React.CSSProperties => {
    const lineStart = startFrame + index * 12;
    const entryEnd = lineStart + animationDuration;
    const exitStart = entryEnd + holdDuration;
    const exitEnd = exitStart + exitDuration;

    if (animationMode === "scaleSlam") {
      const overshootFrame = lineStart + animationDuration * 0.7;

      const entryScale = interpolate(
        frame,
        [lineStart, overshootFrame, entryEnd],
        [1.35, 1.02, 1],
        {
          easing: Easing.bezier(...easing),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      );

      const entryOpacity = interpolate(
        frame,
        [lineStart, lineStart + animationDuration * 0.4],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );

      const exitScale = interpolate(frame, [exitStart, exitEnd], [1, 0.85], {
        easing: Easing.bezier(...exitEasing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      const exitOpacity = interpolate(frame, [exitStart, exitEnd], [1, 0], {
        easing: Easing.bezier(...exitEasing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      const currentScale = frame >= exitStart ? exitScale : entryScale;

      return {
        opacity: Math.max(Math.min(entryOpacity, exitOpacity), 0),
        transform: `scale(${currentScale})`,
        willChange: "transform, opacity",
      };
    }

    if (animationMode === "outlineSwap") {
      const swapEnd = lineStart + animationDuration * 0.3;

      const entryOpacity = interpolate(frame, [lineStart, swapEnd], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      const exitOpacity = interpolate(frame, [exitStart, exitEnd], [1, 0], {
        easing: Easing.bezier(...exitEasing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return {
        opacity: Math.max(Math.min(entryOpacity, exitOpacity), 0),
        willChange: "opacity",
      };
    }

    // letterStagger
    const exitOpacity = interpolate(frame, [exitStart, exitEnd], [1, 0], {
      easing: Easing.bezier(...exitEasing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return {
      opacity: Math.max(exitOpacity, 0),
      willChange: "opacity",
    };
  };

  const getTextBaseStyle = (): React.CSSProperties => ({
    color: textColor,
    fontFamily: "Anton",
    fontSize,
    fontWeight,
    letterSpacing: `${letterSpacing}em`,
    lineHeight: 1.1,
    textAlign: align,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  });

  const alignItems =
    align === "center"
      ? "center"
      : align === "left"
        ? "flex-start"
        : "flex-end";

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 2,
        }}
      >
        {lines.map((text, i) => {
          const lineStyle = getLineContainerStyle(i);

          if (animationMode === "letterStagger") {
            const lineStart = startFrame + i * 12;
            const entryEnd = lineStart + animationDuration;
            const exitStart = entryEnd + holdDuration;
            const exitEnd = exitStart + exitDuration;

            const chars = text.split("");
            const stagger = animationDuration / (chars.length * 0.6);

            return (
              <div
                key={i}
                style={{
                  ...getTextBaseStyle(),
                  display: "flex",
                }}
              >
                {chars.map((char, ci) => {
                  const charStart = lineStart + ci * stagger;
                  const charEnd = Math.min(
                    charStart + stagger * 0.8,
                    entryEnd,
                  );

                  const charOpacity = interpolate(
                    frame,
                    [charStart, charEnd],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  );

                  const charY = interpolate(
                    frame,
                    [charStart, charEnd],
                    [20, 0],
                    {
                      easing: Easing.bezier(...easing),
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    },
                  );

                  const charExitOpacity = interpolate(
                    frame,
                    [exitStart, exitEnd],
                    [1, 0],
                    {
                      easing: Easing.bezier(...exitEasing),
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    },
                  );

                  return (
                    <span
                      key={ci}
                      style={{
                        display: "inline-block",
                        transform: `translate3d(0, ${charY}px, 0)`,
                        willChange: "opacity, transform",
                        opacity: Math.max(
                          Math.min(charOpacity, charExitOpacity),
                          0,
                        ),
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              </div>
            );
          }

          if (animationMode === "outlineSwap") {
            const lineStart = startFrame + i * 12;
            const swapEnd = lineStart + animationDuration * 0.3;
            const entryEnd = lineStart + animationDuration;
            const exitStart = entryEnd + holdDuration;
            const exitEnd = exitStart + exitDuration;

            const fillOpacity = interpolate(
              frame,
              [swapEnd, entryEnd],
              [0, 1],
              {
                easing: Easing.bezier(...easing),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            const strokeOpacity = interpolate(
              frame,
              [swapEnd, entryEnd],
              [1, 0],
              {
                easing: Easing.bezier(...easing),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            const exitOpacity = interpolate(
              frame,
              [exitStart, exitEnd],
              [1, 0],
              {
                easing: Easing.bezier(...exitEasing),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            return (
              <div
                key={i}
                style={{
                  opacity: lineStyle.opacity,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    ...getTextBaseStyle(),
                    color: "transparent",
                    opacity: strokeOpacity,
                    WebkitTextStroke: `${Math.max(1, fontSize * 0.015)}px ${outlineColor}`,
                  }}
                >
                  {text}
                </div>
                <div
                  style={{
                    ...getTextBaseStyle(),
                    left: 0,
                    opacity: Math.max(Math.min(fillOpacity, exitOpacity), 0),
                    position: "absolute",
                    top: 0,
                  }}
                >
                  {text}
                </div>
              </div>
            );
          }

          return (
            <div key={i} style={{ ...getTextBaseStyle(), ...lineStyle }}>
              {text}
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: `radial-gradient(ellipse ${glowSpread}px 80px at 50% 100%, ${glowColor}, transparent)`,
          bottom: 0,
          height: "35%",
          left: 0,
          opacity: glowOpacity,
          pointerEvents: "none",
          position: "absolute",
          width: "100%",
          zIndex: 1,
        }}
      />
    </div>
  );
};
