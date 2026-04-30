import React from "react";

import { ActivityRings, type ActivityRingsProps } from "../ActivityRings";

export const ActivityRingsComposition: React.FC<ActivityRingsProps> = (
  props,
) => {
  return (
    <ActivityRings {...props}>
      <div />
    </ActivityRings>
  );
};
