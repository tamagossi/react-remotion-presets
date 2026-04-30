import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import { TypewriterText, type TypewriterTextProps } from "../TypewriterText";

export const TypewriterTextComposition: React.FC<TypewriterTextProps> = (
  props,
) => {
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
      <TypewriterText {...props} />
    </AbsoluteFill>
  );
};
