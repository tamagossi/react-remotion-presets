import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import { ScalePopText, type ScalePopTextProps } from "../ScalePopText";

export const ScalePopTextComposition: React.FC<ScalePopTextProps> = (props) => {
  useAnton();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ScalePopText {...props} />
    </AbsoluteFill>
  );
};
