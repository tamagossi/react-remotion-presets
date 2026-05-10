import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  ShadowDepthTitle,
  type ShadowDepthTitleProps,
} from "../ShadowDepthTitle";

export const ShadowDepthTitleComposition: React.FC<ShadowDepthTitleProps> = ({
  lines = ["EVOLVE", "ADAPT", "MOVE", "FORWARD"],
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
      <ShadowDepthTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
