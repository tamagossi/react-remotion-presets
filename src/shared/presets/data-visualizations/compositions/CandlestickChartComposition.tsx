import React from "react";

import {
  CandlestickChart,
  type CandlestickChartProps,
} from "../CandlestickChart";

export const CandlestickChartComposition: React.FC<CandlestickChartProps> = (
  props,
) => {
  return (
    <CandlestickChart {...props}>
      <div />
    </CandlestickChart>
  );
};
