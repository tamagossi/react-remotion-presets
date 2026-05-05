import React from "react";

import { AbsoluteFill } from "remotion";

import { IconGridList, type IconGridListProps } from "../IconGridList";

export const IconGridListComposition: React.FC<IconGridListProps> = (
  props,
) => {
  return (
    <AbsoluteFill>
      <IconGridList {...props} />
    </AbsoluteFill>
  );
};
