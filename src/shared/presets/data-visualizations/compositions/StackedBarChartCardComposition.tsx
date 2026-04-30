import React from "react";

import { AbsoluteFill } from "remotion";

import {
  StackedBarChartCard,
  type StackedBarChartCardProps,
} from "../StackedBarChartCard";

export const StackedBarChartCardComposition: React.FC<
  StackedBarChartCardProps
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
      <StackedBarChartCard {...props} />
    </AbsoluteFill>
  );
};
