import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import {
  GlitchRevealText,
  type GlitchRevealTextProps,
} from "../GlitchRevealText";

export const GlitchRevealTextComposition: React.FC<GlitchRevealTextProps> = (
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
      <GlitchRevealText {...props} />
    </AbsoluteFill>
  );
};
