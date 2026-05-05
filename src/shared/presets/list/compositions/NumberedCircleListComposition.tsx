import React from "react";

import { AbsoluteFill } from "remotion";

import {
  NumberedCircleList,
  type NumberedCircleListProps,
} from "../NumberedCircleList";

export const NumberedCircleListComposition: React.FC<
  NumberedCircleListProps
> = (props) => {
  return (
    <AbsoluteFill>
      <NumberedCircleList {...props} />
    </AbsoluteFill>
  );
};
