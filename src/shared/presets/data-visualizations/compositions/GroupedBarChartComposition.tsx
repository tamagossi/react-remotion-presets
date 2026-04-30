import React from "react";

import { GroupedBarChart, type GroupedBarChartProps } from "..";

export const GroupedBarChartComposition: React.FC<GroupedBarChartProps> = (
  props,
) => {
  return (
    <GroupedBarChart
      {...props}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      subtitle="Infographic Scene 01"
      title="3 Months Data Analysis"
      xLabels={["January", "February", "March"]}
      series={[
        { color: "#06b6d4", name: "Simple Text 01", values: [8, 3, 7] },
        { color: "#f59e0b", name: "Simple Text 02", values: [9, 5, 6] },
        { color: "#ec4899", name: "Simple Text 03", values: [4, 6, 3] },
      ]}
    />
  );
};
