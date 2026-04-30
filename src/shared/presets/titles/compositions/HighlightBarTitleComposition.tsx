import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  HighlightBarTitle,
  type HighlightBarTitleProps,
} from "../HighlightBarTitle";

export const HighlightBarTitleComposition: React.FC<HighlightBarTitleProps> = (
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
      <HighlightBarTitle {...props} />
    </AbsoluteFill>
  );
};
