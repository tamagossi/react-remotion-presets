import React from "react";

import { DarkGradientBackground } from "../../backgrounds";
import { useInter } from "../../../hooks/useInter";
import {
  KaraokeShadowScene,
  type KaraokeShadowSceneProps,
} from "../KaraokeShadowScene";

export const KaraokeShadowSceneComposition: React.FC<
  KaraokeShadowSceneProps
> = (props) => {
  useInter();
  return (
    <DarkGradientBackground>
      <KaraokeShadowScene {...props} />
    </DarkGradientBackground>
  );
};
