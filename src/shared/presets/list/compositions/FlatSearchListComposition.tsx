import React from "react";

import { AbsoluteFill } from "remotion";

import { FlatSearchList, type FlatSearchListProps } from "../FlatSearchList";

export const FlatSearchListComposition: React.FC<FlatSearchListProps> = (
  props,
) => {
  return (
    <AbsoluteFill
      style={{
        background: "#0a0a14",
      }}
    >
      <FlatSearchList {...props} />
    </AbsoluteFill>
  );
};
