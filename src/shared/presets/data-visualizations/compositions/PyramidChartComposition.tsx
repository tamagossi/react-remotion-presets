import React from "react";

import { PyramidChart, type PyramidChartProps } from "../PyramidChart";

export const PyramidChartComposition: React.FC<PyramidChartProps> = (props) => {
  return (
    <PyramidChart {...props}>
      <div />
    </PyramidChart>
  );
};
