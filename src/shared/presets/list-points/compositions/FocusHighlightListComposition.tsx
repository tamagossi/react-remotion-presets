import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  FocusHighlightList,
  type FocusHighlightListProps,
} from "../FocusHighlightList";

export const FocusHighlightListComposition: React.FC<
  FocusHighlightListProps
> = (props) => {
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
      <FocusHighlightList {...props} />
    </AbsoluteFill>
  );
};
