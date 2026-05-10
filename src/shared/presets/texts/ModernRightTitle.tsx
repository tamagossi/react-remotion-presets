import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type ModernRightTitleProps = AnimatedTitleProps;

export const ModernRightTitle: React.FC<ModernRightTitleProps> = (props) => {
  return (
    <AnimatedTitle
      accent={["none", "right"]}
      align="right"
      fontSize={[96, 48]}
      gap={12}
      letterSpacing={[0.02, 0.08]}
      {...props}
    />
  );
};
