import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  ModernRightTitle,
  type ModernRightTitleProps,
} from "../ModernRightTitle";

export const ModernRightTitleComposition: React.FC<ModernRightTitleProps> = ({
  lines = ["MODERN", "TEXT REVEAL"],
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
      <ModernRightTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
