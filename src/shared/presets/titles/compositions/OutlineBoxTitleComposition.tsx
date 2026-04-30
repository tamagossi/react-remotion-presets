import React from "react";

import { AbsoluteFill } from "remotion";

import { useMontserrat } from "../../../hooks/useMontserrat";
import { useOswald } from "../../../hooks/useOswald";
import { OutlineBoxTitle, type OutlineBoxTitleProps } from "../OutlineBoxTitle";

export const OutlineBoxTitleComposition: React.FC<OutlineBoxTitleProps> = ({
  lines = ["OUTLINE BOX"],
  ...props
}) => {
  useOswald();
  useMontserrat();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <OutlineBoxTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
