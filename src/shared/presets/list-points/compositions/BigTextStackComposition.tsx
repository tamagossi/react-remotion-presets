import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { BigTextStack, type BigTextStackProps } from "../BigTextStack";

export const BigTextStackComposition: React.FC<BigTextStackProps> = (props) => {
  useAnton();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <BigTextStack {...props} />
    </AbsoluteFill>
  );
};
