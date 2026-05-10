import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type MinimalDuoTitleProps = AnimatedTitleProps;

export const MinimalDuoTitle: React.FC<MinimalDuoTitleProps> = (props) => {
  return (
    <AnimatedTitle
      accent={["none", "right"]}
      align="left"
      fontSize={[28, 96]}
      gap={8}
      letterSpacing={[0.15, 0.02]}
      {...props}
    />
  );
};
