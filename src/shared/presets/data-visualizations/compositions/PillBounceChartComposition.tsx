import React from "react";

import { PillBounceChart, type PillBounceChartProps } from "..";

export const PillBounceChartComposition: React.FC<PillBounceChartProps> = (
  props,
) => {
  return (
    <PillBounceChart
      {...props}
      subtitle="Designed By Nacant"
      title="YOUR SIMPLE TEXT"
      pills={[
        { label: "Step 01", number: "01" },
        { color: "#2563eb", label: "Step 02", number: "02" },
        { color: "#1d4ed8", label: "Step 03", number: "03" },
        { color: "#1e40af", label: "Step 04", number: "04" },
      ]}
    />
  );
};
