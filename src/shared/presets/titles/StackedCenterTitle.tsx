import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type StackedCenterTitleProps = AnimatedTitleProps;

export const StackedCenterTitle: React.FC<StackedCenterTitleProps> = (
  props,
) => {
  return (
    <AnimatedTitle
      accent="none"
      align="center"
      fontSize={[72, 96, 72]}
      gap={12}
      letterSpacing={0.02}
      {...props}
    />
  );
};
