import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type BoldRightTitleProps = AnimatedTitleProps;

export const BoldRightTitle: React.FC<BoldRightTitleProps> = (props) => {
  return (
    <AnimatedTitle
      accent={["both", "none"]}
      align="right"
      fontSize={[72, 96]}
      gap={12}
      letterSpacing={0.02}
      {...props}
    />
  );
};
