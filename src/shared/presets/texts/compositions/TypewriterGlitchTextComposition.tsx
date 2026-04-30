import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import {
  TypewriterGlitchText,
  type TypewriterGlitchTextProps,
} from "../TypewriterGlitchText";

export const TypewriterGlitchTextComposition: React.FC<
  TypewriterGlitchTextProps
> = (props) => {
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
      <TypewriterGlitchText {...props} />
    </AbsoluteFill>
  );
};
