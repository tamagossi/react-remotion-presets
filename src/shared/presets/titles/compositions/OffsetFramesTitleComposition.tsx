import React from "react";

import { AbsoluteFill } from "remotion";

import { useMontserrat } from "../../../hooks/useMontserrat";
import { useOswald } from "../../../hooks/useOswald";
import {
  OffsetFramesTitle,
  type OffsetFramesTitleProps,
} from "../OffsetFramesTitle";

export const OffsetFramesTitleComposition: React.FC<OffsetFramesTitleProps> = ({
  lines = ["OFFSET FRAMES"],
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
      <OffsetFramesTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
