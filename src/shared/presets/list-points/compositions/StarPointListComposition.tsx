import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { StarPointList, type StarPointListProps } from "../StarPointList";

export const StarPointListComposition: React.FC<StarPointListProps> = (
  props,
) => {
  useAnton();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <StarPointList {...props} />
    </AbsoluteFill>
  );
};
