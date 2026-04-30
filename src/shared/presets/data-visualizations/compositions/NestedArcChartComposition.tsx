import React from "react";

import { NestedArcChart, type NestedArcChartProps } from "../NestedArcChart";

export const NestedArcChartComposition: React.FC<NestedArcChartProps> = (
  props,
) => {
  return (
    <NestedArcChart {...props}>
      <div />
    </NestedArcChart>
  );
};
