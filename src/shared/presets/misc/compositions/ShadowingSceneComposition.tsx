import React from "react";

import { DarkGradientBackground } from "../../backgrounds";
import { useInter } from "../../../hooks/useInter";
import { ShadowingScene, type ShadowingSceneProps } from "../ShadowingScene";

export const ShadowingSceneComposition: React.FC<ShadowingSceneProps> = (
  props
) => {
  useInter();
  return (
    <DarkGradientBackground>
      <ShadowingScene {...props} />
    </DarkGradientBackground>
  );
};
