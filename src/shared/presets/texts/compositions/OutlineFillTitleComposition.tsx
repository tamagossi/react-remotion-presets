import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  OutlineFillTitle,
  type OutlineFillTitleProps,
} from "../OutlineFillTitle";

export const OutlineFillTitleComposition: React.FC<OutlineFillTitleProps> = (
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
      <OutlineFillTitle {...props} />
    </AbsoluteFill>
  );
};
