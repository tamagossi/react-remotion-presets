import React from "react";

import { AbsoluteFill } from "remotion";

import {
  GradientSearchList,
  type GradientSearchListProps,
} from "../GradientSearchList";

export const GradientSearchListComposition: React.FC<
  GradientSearchListProps
> = (props) => {
  return (
    <AbsoluteFill
      style={{
        background: "#0a0a14",
      }}
    >
      <GradientSearchList {...props} />
    </AbsoluteFill>
  );
};
