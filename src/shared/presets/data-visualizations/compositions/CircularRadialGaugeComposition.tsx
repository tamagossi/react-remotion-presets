import React from "react";

import {
  CircularRadialGauge,
  type CircularRadialGaugeProps,
} from "../CircularRadialGauge";

export const CircularRadialGaugeComposition: React.FC<
  CircularRadialGaugeProps
> = (props) => {
  return (
    <CircularRadialGauge {...props}>
      <div />
    </CircularRadialGauge>
  );
};
