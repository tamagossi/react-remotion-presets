import React from "react";

import { AbsoluteFill } from "remotion";

import {
  OutlineSearchList,
  type OutlineSearchListProps,
} from "../OutlineSearchList";

export const OutlineSearchListComposition: React.FC<
  OutlineSearchListProps
> = (props) => {
  return (
    <AbsoluteFill
      style={{
        background: "#0a0a14",
      }}
    >
      <OutlineSearchList {...props} />
    </AbsoluteFill>
  );
};
