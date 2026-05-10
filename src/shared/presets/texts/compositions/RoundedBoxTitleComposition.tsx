import React from "react";

import { AbsoluteFill } from "remotion";

import { useInter } from "../../../hooks/useInter";
import { useSpaceGrotesk } from "../../../hooks/useSpaceGrotesk";
import { RoundedBoxTitle, type RoundedBoxTitleProps } from "../RoundedBoxTitle";

export const RoundedBoxTitleComposition: React.FC<RoundedBoxTitleProps> = (
  props,
) => {
  useInter();
  useSpaceGrotesk();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <RoundedBoxTitle {...props} />
    </AbsoluteFill>
  );
};
