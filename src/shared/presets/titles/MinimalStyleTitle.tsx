import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type MinimalStyleTitleProps = AnimatedTitleProps;

export const MinimalStyleTitle: React.FC<MinimalStyleTitleProps> = (props) => {
  return (
    <AnimatedTitle
      accent={["right", "none", "left"]}
      align="left"
      fontSize={[28, 96, 28]}
      gap={8}
      letterSpacing={[0.15, 0.02, 0.15]}
      {...props}
    />
  );
};
