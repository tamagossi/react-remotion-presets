import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { FocusStackList, type FocusStackListProps } from "../FocusStackList";

export const FocusStackListComposition: React.FC<FocusStackListProps> = (
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
      <FocusStackList {...props} />
    </AbsoluteFill>
  );
};
