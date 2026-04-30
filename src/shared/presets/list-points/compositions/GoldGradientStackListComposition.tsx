import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  GoldGradientStackList,
  type GoldGradientStackListProps,
} from "../GoldGradientStackList";

export const GoldGradientStackListComposition: React.FC<
  GoldGradientStackListProps
> = (props) => {
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
      <GoldGradientStackList {...props} />
    </AbsoluteFill>
  );
};
