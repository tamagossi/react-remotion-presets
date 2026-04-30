import React from "react";

import { AbsoluteFill } from "remotion";

import { useMontserrat } from "../../../hooks/useMontserrat";
import { useOswald } from "../../../hooks/useOswald";
import {
  SplitHighlightTitle,
  type SplitHighlightTitleProps,
} from "../SplitHighlightTitle";

export const SplitHighlightTitleComposition: React.FC<
  SplitHighlightTitleProps
> = ({ lines = ["HIGHLIGHT"], ...props }) => {
  useOswald();
  useMontserrat();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SplitHighlightTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
