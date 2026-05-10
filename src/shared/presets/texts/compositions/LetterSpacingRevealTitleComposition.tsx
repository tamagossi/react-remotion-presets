import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  LetterSpacingRevealTitle,
  type LetterSpacingRevealTitleProps,
} from "../LetterSpacingRevealTitle";

export const LetterSpacingRevealTitleComposition: React.FC<
  LetterSpacingRevealTitleProps
> = (props) => {
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
      <LetterSpacingRevealTitle {...props} />
    </AbsoluteFill>
  );
};
