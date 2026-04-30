import React from "react";

import { AbsoluteFill } from "remotion";

import { useMontserrat } from "../../../hooks/useMontserrat";
import { useOswald } from "../../../hooks/useOswald";
import {
  NumberFrameTitle,
  type NumberFrameTitleProps,
} from "../NumberFrameTitle";

export const NumberFrameTitleComposition: React.FC<NumberFrameTitleProps> = ({
  lines = ["FRAME TITLE"],
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
      <NumberFrameTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
