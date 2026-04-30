import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export type CylinderRolodexListProps = {
  animationDuration?: number;
  dimOpacity?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  holdDuration?: number;
  itemGap?: number;
  items: string[];
  perspective?: number;
  rotationSpeed?: number;
  startFrame?: number;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
  visibleCount?: number;
};

export const CylinderRolodexList: React.FC<CylinderRolodexListProps> = ({
  animationDuration = 40,
  dimOpacity = 0.15,
  easing = [0.22, 1, 0.36, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 48,
  fontWeight = 400,
  holdDuration = 30,
  itemGap = 60,
  items,
  perspective = 800,
  rotationSpeed = 30,
  startFrame = 0,
  textColor = "#ffffff",
  textTransform = "none",
}) => {
  const frame = useCurrentFrame();

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

  const rotation = ((frame - startFrame) * rotationSpeed) / 60;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: itemGap,
        opacity: listOpacity,
        perspective,
        transform: `translate3d(0, ${(1 - listEntryT) * 30}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {items.map((item, index) => {
        const angle = ((index / items.length) * 360 + rotation) % 360;
        const radians = (angle * Math.PI) / 180;
        const normalizedY = Math.sin(radians);
        const normalizedZ = Math.cos(radians);

        const isVisible = normalizedZ > -0.2;
        const depthOpacity = Math.max(0, (normalizedZ + 0.2) / 1.2);
        const itemOpacity = isVisible ? depthOpacity : 0;
        const itemScale = 0.7 + depthOpacity * 0.3;
        const rotateX = -angle;

        const itemEntryDelay = index * 4;
        const itemEntryStart = startFrame + itemEntryDelay;
        const itemEntryEnd = itemEntryStart + 16;

        const itemEntryT = interpolate(
          frame,
          [itemEntryStart, itemEntryEnd],
          [0, 1],
          {
            easing: Easing.out(Easing.quad),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        return (
          <div
            key={item}
            style={{
              color: textColor,
              fontFamily,
              fontSize,
              fontWeight,
              opacity: itemOpacity * dimOpacity * itemEntryT,
              textTransform,
              transform: `translate3d(0, ${normalizedY * itemGap * 0.5}px, ${normalizedZ * 100}px) rotateX(${rotateX}deg) scale(${itemScale})`,
              transformStyle: "preserve-3d",
              transition: "none",
              visibility: isVisible ? "visible" : "hidden",
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
