import React from "react";

import { AbsoluteFill } from "remotion";

import { CompactBarList, type CompactBarListProps } from "../CompactBarList";

export const CompactBarListComposition: React.FC<CompactBarListProps> = (
  props,
) => {
  return (
    <AbsoluteFill>
      <CompactBarList {...props} />
    </AbsoluteFill>
  );
};
