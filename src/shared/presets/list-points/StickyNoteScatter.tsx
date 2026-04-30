import React from "react";

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type StickyNoteScatterProps = {
  animationDuration?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  itemGap?: number;
  items: string[];
  maxRotation?: number;
  noteColor?: string;
  noteHeight?: number;
  notePadding?: number;
  noteWidth?: number;
  scatterSeed?: number;
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const StickyNoteScatter: React.FC<StickyNoteScatterProps> = ({
  animationDuration = 40,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 24,
  fontWeight = 400,
  holdDuration = 30,
  items,
  maxRotation = 15,
  noteColor = "#fbbf24",
  noteHeight = 80,
  notePadding = 16,
  noteWidth = 200,
  scatterSeed = 42,
  startFrame = 0,
  textColor = "#000000",
  textTransform = "none",
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const entryEnd = startFrame + animationDuration;
  const exitStart = entryEnd + holdDuration;
  const exitEnd = exitStart + exitDuration;

  const listEntryT = interpolate(frame, [startFrame, entryEnd], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listExitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listOpacity = Math.min(listEntryT, listExitT);

  const rand = seededRandom(scatterSeed);

  return (
    <div
      style={{
        height,
        opacity: listOpacity,
        position: "relative",
        width,
        willChange: "opacity",
      }}
    >
      {items.map((item, index) => {
        const itemEntryDelay = index * 8;
        const itemEntryStart = startFrame + itemEntryDelay;
        const itemEntryEnd = itemEntryStart + 20;

        const itemEntryT = interpolate(
          frame,
          [itemEntryStart, itemEntryEnd],
          [0, 1],
          {
            easing: Easing.out(Easing.back(1.2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const x = rand() * (width - noteWidth - 100) + 50;
        const y = rand() * (height - noteHeight - 100) + 50;
        const rotation = (rand() - 0.5) * maxRotation * 2;

        return (
          <div
            key={item}
            style={{
              alignItems: "center",
              backgroundColor: noteColor,
              color: textColor,
              display: "flex",
              fontFamily,
              fontSize,
              fontWeight,
              height: noteHeight,
              justifyContent: "center",
              left: x,
              opacity: itemEntryT,
              padding: notePadding,
              position: "absolute",
              textTransform,
              top: y,
              transform: `rotate(${rotation}deg) scale(${itemEntryT})`,
              transition: "none",
              width: noteWidth,
              willChange: "transform, opacity",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
