import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  MinimalStyleTitle,
  type MinimalStyleTitleProps,
} from "../MinimalStyleTitle";

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
