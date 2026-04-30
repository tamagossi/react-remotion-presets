import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { RoundedBoxTitle, type RoundedBoxTitleProps } from "../RoundedBoxTitle";

export const RoundedBoxTitleComposition: React.FC<RoundedBoxTitleProps> = (
  props,
) => {
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
      <RoundedBoxTitle {...props} />
    </AbsoluteFill>
  );
};
