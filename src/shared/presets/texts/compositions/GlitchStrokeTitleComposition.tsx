import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  GlitchStrokeTitle,
  type GlitchStrokeTitleProps,
} from "../GlitchStrokeTitle";

export const GlitchStrokeTitleComposition: React.FC<GlitchStrokeTitleProps> = ({
  lines = ["THE PAST IS", "NEVER DEAD"],
  ...props
}) => {
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
      <GlitchStrokeTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
