import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type StackedRightTitleProps = AnimatedTitleProps;

export const StackedRightTitle: React.FC<StackedRightTitleProps> = (props) => {
  return (
    <AnimatedTitle
      accent={["none", "none", "left"]}
      align="right"
      fontSize={[72, 96, 72]}
      gap={12}
      letterSpacing={0.02}
      {...props}
    />
  );
};
