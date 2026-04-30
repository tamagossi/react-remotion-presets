import React from "react";

import { AbsoluteFill } from "remotion";

import { SalesReportCard, type SalesReportCardProps } from "../SalesReportCard";

export const SalesReportCardComposition: React.FC<SalesReportCardProps> = (
  props,
) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: props.theme === "light" ? "#f5f5f5" : "#0a0a0a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SalesReportCard {...props} />
    </AbsoluteFill>
  );
};
