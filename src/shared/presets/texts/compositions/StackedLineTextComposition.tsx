import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import { StackedLineText, type StackedLineTextProps } from "../StackedLineText";

export const StackedLineTextComposition: React.FC<StackedLineTextProps> = ({
  lines = ["FULL SCREEN", "POWERFUL", "TYPOGRAPHY"],
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
      <StackedLineText lines={lines} {...props} />
    </AbsoluteFill>
  );
};
