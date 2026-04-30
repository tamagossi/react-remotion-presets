import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  StackedRightTitle,
  type StackedRightTitleProps,
} from "../StackedRightTitle";

export const StackedRightTitleComposition: React.FC<StackedRightTitleProps> = ({
  lines = ["CREATIVE", "TYPOGRAPHY", "PACK"],
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
      <StackedRightTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
