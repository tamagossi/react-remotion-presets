import React from "react";

import { AbsoluteFill } from "remotion";

import {
  DonutBreakdownCard,
  type DonutBreakdownCardProps,
} from "../DonutBreakdownCard";

export const DonutBreakdownCardComposition: React.FC<
  DonutBreakdownCardProps
> = (props) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: props.theme === "light" ? "#f5f5f5" : "#0a0a0a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DonutBreakdownCard {...props} />
    </AbsoluteFill>
  );
};
