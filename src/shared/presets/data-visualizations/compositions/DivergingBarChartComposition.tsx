import React from "react";

import { DivergingBarChart, type DivergingBarChartProps } from "..";

export const DivergingBarChartComposition: React.FC<DivergingBarChartProps> = (
  props,
) => {
  return (
    <DivergingBarChart
      {...props}
      data={[
        { label: "Text 1", value: 85 },
        { label: "Text 2", value: 70 },
        { label: "Text 3", value: 45 },
        { label: "Text 4", value: -35 },
        { label: "Text 5", value: -55 },
        { label: "Text 6", value: -75 },
        { label: "Text 7", value: -45 },
        { label: "Text 8", value: -25 },
        { label: "Text 9", value: -15 },
      ]}
    />
  );
};
