import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { PillTagList, type PillTagListProps } from "../PillTagList";

export const PillTagListComposition: React.FC<PillTagListProps> = (props) => {
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
      <PillTagList {...props} />
    </AbsoluteFill>
  );
};
