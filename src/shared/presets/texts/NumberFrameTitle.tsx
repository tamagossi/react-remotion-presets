import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

import { useAnton } from "../../hooks/useAnton";

export type NumberFrameTitleProps = {
  animationDuration?: number;
  dividerColor?: string;
  dividerLength?: number;
  dividerThickness?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  holdDuration?: number;
  lines: string[];
  number?: string;
  numberColor?: string;
  numberFontSize?: number;
  ringColor?: string;
  ringThickness?: number;
  startFrame?: number;
  textColor?: string;
  textFontSize?: number;
  textLetterSpacing?: number;
};

export const NumberFrameTitle: React.FC<NumberFrameTitleProps> = ({
  animationDuration = 50,
  dividerColor = "#c9a96e",
  dividerLength = 48,
  dividerThickness = 2,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  holdDuration = 30,
  lines = ["CHAPTER TITLE"],
  number = "01",
  numberColor = "#c9a96e",
  numberFontSize = 110,
  ringColor = "#c9a96e",
  ringThickness = 3,
  startFrame = 0,
  textColor = "#ffffff",
  textFontSize = 60,
  textLetterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();

  useAnton();

  const entryEnd = startFrame + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ringStart = startFrame;
  const ringEnd = startFrame + animationDuration * 0.4;

  const ringT = interpolate(frame, [ringStart, ringEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ringRotation = interpolate(frame, [ringStart, ringEnd], [-45, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ringScale = interpolate(frame, [ringStart, ringEnd], [0.5, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const numberStart = startFrame + animationDuration * 0.1;
  const numberEnd = numberStart + animationDuration * 0.3;

  const numberT = interpolate(frame, [numberStart, numberEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const numberScale = interpolate(frame, [numberStart, numberEnd], [0.6, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dividerStart = startFrame + animationDuration * 0.3;
  const dividerEnd = dividerStart + animationDuration * 0.25;

  const dividerT = interpolate(frame, [dividerStart, dividerEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textStart = startFrame + animationDuration * 0.35;
  const textEnd = textStart + animationDuration * 0.3;

  const textT = interpolate(frame, [textStart, textEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(
    frame,
    [textStart, textStart + animationDuration * 0.15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const ringSize = numberFontSize * 1.45;

  const ringExitScale = ringScale + (1 - exitT);
  const ringExitRotation = ringRotation * exitT;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        gap: 24,
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: ringSize,
          justifyContent: "center",
          opacity: Math.max(Math.min(ringT, exitT), 0),
          position: "relative",
          width: ringSize,
          willChange: "opacity",
        }}
      >
        <div
          style={{
            border: `${ringThickness}px solid ${ringColor}`,
            borderRadius: "50%",
            height: ringSize,
            left: 0,
            opacity: ringT * exitT,
            position: "absolute",
            top: 0,
            transform: `rotate(${ringExitRotation}deg) scale(${ringExitScale})`,
            width: ringSize,
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              background: `conic-gradient(from 45deg, ${ringColor}, transparent, ${ringColor}, transparent, ${ringColor})`,
              borderRadius: "50%",
              height: "100%",
              opacity: ringT * 0.3,
              width: "100%",
            }}
          />
        </div>
        
        <div
          style={{
            alignItems: "center",
            color: numberColor,
            display: "flex",
            fontFamily: "Anton",
            fontSize: numberFontSize,
            fontWeight: 400,
            justifyContent: "center",
            lineHeight: 1,
            opacity: Math.max(Math.min(numberT, exitT), 0),
            transform: `scale(${numberScale * exitT})`,
            willChange: "transform, opacity",
            zIndex: 1,
          }}
        >
          {number}
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <div
          style={{
            backgroundColor: dividerColor,
            height: dividerThickness,
            opacity: Math.max(Math.min(dividerT, exitT), 0),
            transform: `scaleX(${dividerT})`,
            transformOrigin: "left center",
            width: dividerLength,
            willChange: "transform, opacity",
          }}
        />
        <div
          style={{
            color: textColor,
            fontFamily: "Anton",
            fontSize: textFontSize,
            fontWeight: 400,
            letterSpacing: `${textLetterSpacing}em`,
            lineHeight: 1,
            opacity: Math.max(Math.min(textOpacity, exitT), 0),
            textTransform: "uppercase",
            transform: `translate3d(${(1 - textT) * 20}px, 0, 0)`,
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          {lines[0]}
        </div>
      </div>
    </div>
  );
};
