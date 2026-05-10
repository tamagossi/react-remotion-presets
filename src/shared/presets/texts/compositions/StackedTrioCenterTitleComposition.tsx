import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  StackedTrioCenterTitle,
  type StackedTrioCenterTitleProps,
} from "../StackedTrioCenterTitle";

export const StackedTrioCenterTitleComposition: React.FC<
  StackedTrioCenterTitleProps
> = ({ lines = ["DIGITAL", "MARKETING", "WEEK"], ...props }) => {
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
      <StackedTrioCenterTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
