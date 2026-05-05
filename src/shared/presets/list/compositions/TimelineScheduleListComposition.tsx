import React from "react";

import { AbsoluteFill } from "remotion";

import {
  TimelineScheduleList,
  type TimelineScheduleListProps,
} from "../TimelineScheduleList";

export const TimelineScheduleListComposition: React.FC<
  TimelineScheduleListProps
> = (props) => {
  return (
    <AbsoluteFill>
      <TimelineScheduleList {...props} />
    </AbsoluteFill>
  );
};
