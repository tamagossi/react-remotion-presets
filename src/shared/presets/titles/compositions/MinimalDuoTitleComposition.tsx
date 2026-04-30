import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { MinimalDuoTitle, type MinimalDuoTitleProps } from "../MinimalDuoTitle";

export const MinimalDuoTitleComposition: React.FC<MinimalDuoTitleProps> = ({
  lines = ["MINIMAL", "TITLES"],
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
      <MinimalDuoTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
