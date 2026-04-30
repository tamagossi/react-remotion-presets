import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type GeometricMaskTitleProps = {
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: number;
  holdDuration?: number;
  maskColor?: string;
  maskWidth?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const GeometricMaskTitle: React.FC<GeometricMaskTitleProps> = ({
  animationDuration = 45,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 120,
  fontStyle = "italic",
  fontWeight = 400,
  holdDuration = 30,
  maskColor = "#6b7280",
  maskWidth = 40,
  startFrame = 0,
  text = "SELECT",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const entryEnd = startFrame + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const entryT = interpolate(frame, [startFrame, entryEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(
    frame,
    [startFrame, startFrame + animationDuration * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const textX = (1 - entryT) * -80;

  const maskEntryStart = startFrame + animationDuration * 0.2;
  const maskEntryEnd = maskEntryStart + animationDuration * 0.6;
  const maskExitStart = exitStart;
  const maskExitEnd = maskExitStart + exitDuration * 0.6;

  const maskEntryT = interpolate(
    frame,
    [maskEntryStart, maskEntryEnd],
    [0, 1],
    {
      easing: Easing.bezier(...easing),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const maskExitT = interpolate(frame, [maskExitStart, maskExitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beforeLast = text.slice(0, -1);
  const lastChar = text.slice(-1);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: Math.max(Math.min(textOpacity, exitT), 0),
          transform: `translate3d(${textX}px, 0, 0)`,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            color: textColor,
            fontFamily,
            fontSize,
            fontStyle,
            fontWeight,
            lineHeight: 1,
            textTransform,
            whiteSpace: "nowrap",
          }}
        >
          <span>{beforeLast}</span>
          <span style={{ position: "relative" }}>
            <span
              style={{
                backgroundColor: maskColor,
                display: "inline-block",
                height: "0.85em",
                left: "-0.05em",
                opacity: Math.max(Math.min(maskEntryT, maskExitT), 0),
                position: "absolute",
                top: "0.05em",
                transform: `scaleX(${maskEntryT * maskExitT})`,
                transformOrigin: "left",
                width: `${maskWidth}px`,
                willChange: "transform, opacity",
              }}
            />
            {lastChar}
          </span>
        </div>
      </div>
    </div>
  );
};
