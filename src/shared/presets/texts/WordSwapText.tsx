import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type WordSwapTextProps = {
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  letterSpacing?: number;
  startFrame?: number;
  swapInterval?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
  words: string[];
};

export const WordSwapText: React.FC<WordSwapTextProps> = ({
  animationDuration = 30,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  holdDuration = 30,
  letterSpacing = 0.02,
  startFrame = 0,
  swapInterval = 45,
  textColor = "#ffffff",
  textTransform = "uppercase",
  words = ["CREATE", "DESIGN", "BUILD"],
}) => {
  const frame = useCurrentFrame();

  const exitStart = startFrame + animationDuration + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const totalSwapCycle = swapInterval;
  const currentIndex = Math.floor(
    Math.max(0, frame - startFrame) / totalSwapCycle,
  );
  const activeIndex = currentIndex % words.length;

  const localFrame = Math.max(0, frame - startFrame) % totalSwapCycle;
  const swapT = interpolate(localFrame, [0, animationDuration], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = frame >= exitStart ? exitT : 1;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        height: fontSize * 1.2,
        justifyContent: "center",
        opacity: containerOpacity,
        position: "relative",
        willChange: "opacity",
      }}
    >
      {words.map((word, i) => {
        const isActive = i === activeIndex;
        const isPrev =
          i === (activeIndex - 1 + words.length) % words.length;

        const opacity = isActive
          ? interpolate(swapT, [0, 0.5, 1], [0, 1, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : isPrev
            ? interpolate(swapT, [0, 0.5, 1], [1, 0, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;

        const translateY = isActive
          ? interpolate(swapT, [0, 1], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : isPrev
            ? interpolate(swapT, [0, 1], [0, -20], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;

        return (
          <span
            key={i}
            style={{
              color: textColor,
              fontFamily,
              fontSize,
              fontWeight,
              letterSpacing: `${letterSpacing}em`,
              lineHeight: 1,
              opacity,
              position: "absolute",
              textTransform,
              transform: `translate3d(0, ${translateY}px, 0)`,
              whiteSpace: "nowrap",
              willChange: "opacity, transform",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
