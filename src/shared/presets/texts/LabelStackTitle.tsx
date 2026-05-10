import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type LabelStackTitleProps = AnimatedTitleProps;

export const LabelStackTitle: React.FC<LabelStackTitleProps> = (props) => {
  return (
    <AnimatedTitle
      accent={["none", "right"]}
      align="left"
      fontSize={[36, 96]}
      gap={8}
      letterSpacing={[0.15, 0.02]}
      {...props}
    />
  );
};
