import React from "react";

import { AnimatedTitle, type AnimatedTitleProps } from "./TitleAnimationEngine";

export type HeroSubtitleTitleProps = AnimatedTitleProps;

export const HeroSubtitleTitle: React.FC<HeroSubtitleTitleProps> = (props) => {
  return (
    <AnimatedTitle
      accent={["none", "right"]}
      align="center"
      fontSize={[96, 36]}
      gap={12}
      letterSpacing={[0.02, 0.1]}
      {...props}
    />
  );
};
