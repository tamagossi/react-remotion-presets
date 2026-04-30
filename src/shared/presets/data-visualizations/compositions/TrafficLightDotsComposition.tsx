import React from "react";

import {
  TrafficLightDots,
  type TrafficLightDotsProps,
} from "../TrafficLightDots";

export const TrafficLightDotsComposition: React.FC<TrafficLightDotsProps> = (
  props,
) => {
  return (
    <TrafficLightDots {...props}>
      <div />
    </TrafficLightDots>
  );
};
