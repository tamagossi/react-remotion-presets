import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  NumberFrameTitle,
  type NumberFrameTitleProps,
} from "../NumberFrameTitle";

export const NumberFrameTitleComposition: React.FC<NumberFrameTitleProps> = ({
  lines = ["CHAPTER TITLE"],
  ...props
}) => {
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
      <NumberFrameTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
