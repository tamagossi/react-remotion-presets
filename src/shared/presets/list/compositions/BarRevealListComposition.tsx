import React from "react";

import { AbsoluteFill } from "remotion";

import { BarRevealList, type BarRevealListProps } from "../BarRevealList";

export const BarRevealListComposition: React.FC<BarRevealListProps> = (
  props,
) => {
  return (
    <AbsoluteFill>
      <BarRevealList {...props} />
    </AbsoluteFill>
  );
};
