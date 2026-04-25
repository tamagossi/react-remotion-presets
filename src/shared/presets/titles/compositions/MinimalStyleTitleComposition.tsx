import React from "react";

import { AbsoluteFill } from "remotion";

import {
  MinimalStyleTitle,
  type MinimalStyleTitleProps,
} from "../MinimalStyleTitle";
import { useAnton } from "../../../hooks/useAnton";

export const MinimalStyleTitleComposition: React.FC<MinimalStyleTitleProps> = ({
  lines = ["MINIMAL", "STYLE", "CONCEPT"],
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
      <MinimalStyleTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
