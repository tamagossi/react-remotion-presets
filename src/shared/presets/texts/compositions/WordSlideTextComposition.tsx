import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import { WordSlideText, type WordSlideTextProps } from "../WordSlideText";

export const WordSlideTextComposition: React.FC<WordSlideTextProps> = (
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
      <WordSlideText {...props} />
    </AbsoluteFill>
  );
};
