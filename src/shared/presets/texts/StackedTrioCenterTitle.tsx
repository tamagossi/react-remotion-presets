import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type StackedTrioCenterTitleProps = AnimatedTitleProps;

export const StackedTrioCenterTitle: React.FC<StackedTrioCenterTitleProps> = (
  props,
) => {
  return (
    <AnimatedTitle
      accent={["both", "none", "both"]}
      align="center"
      fontSize={[72, 96, 72]}
      gap={12}
      letterSpacing={0.02}
      {...props}
    />
  );
};
