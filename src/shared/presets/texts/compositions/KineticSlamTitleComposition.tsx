import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  KineticSlamTitle,
  type KineticSlamTitleProps,
} from "../KineticSlamTitle";

export const KineticSlamTitleComposition: React.FC<KineticSlamTitleProps> = (
  props,
) => {
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
      <KineticSlamTitle {...props} />
    </AbsoluteFill>
  );
};
