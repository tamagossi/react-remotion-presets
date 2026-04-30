import React from "react";

import { AbsoluteFill } from "remotion";

import { useMontserrat } from "../../../hooks/useMontserrat";
import { useOswald } from "../../../hooks/useOswald";
import {
  StrikethroughBadgeTitle,
  type StrikethroughBadgeTitleProps,
} from "../StrikethroughBadgeTitle";

export const StrikethroughBadgeTitleComposition: React.FC<
  StrikethroughBadgeTitleProps
> = ({ lines = ["STRIKETHROUGH"], ...props }) => {
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
      <StrikethroughBadgeTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
