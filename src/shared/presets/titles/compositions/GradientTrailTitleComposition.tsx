import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  GradientTrailTitle,
  type GradientTrailTitleProps,
} from "../GradientTrailTitle";

export const GradientTrailTitleComposition: React.FC<
  GradientTrailTitleProps
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
      <GradientTrailTitle {...props} />
    </AbsoluteFill>
  );
};
