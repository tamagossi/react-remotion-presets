import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { PillBarList, type PillBarListProps } from "../PillBarList";

export const PillBarListComposition: React.FC<PillBarListProps> = (props) => {
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
      <PillBarList {...props} />
    </AbsoluteFill>
  );
};
