import React from "react";

import { AbsoluteFill } from "remotion";

import {
  HorizontalBarChartCard,
  type HorizontalBarChartCardProps,
} from "../HorizontalBarChartCard";

export const HorizontalBarChartCardComposition: React.FC<
  HorizontalBarChartCardProps
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
      <HorizontalBarChartCard {...props} />
    </AbsoluteFill>
  );
};
