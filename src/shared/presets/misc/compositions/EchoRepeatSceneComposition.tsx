import React from "react";

import { DarkGradientBackground } from "../../backgrounds";
import { useInter } from "../../../hooks/useInter";
import {
  EchoRepeatScene,
  type EchoRepeatSceneProps,
} from "../EchoRepeatScene";

export const EchoRepeatSceneComposition: React.FC<EchoRepeatSceneProps> = (
  props
) => {
  useInter();
  return (
    <DarkGradientBackground>
      <EchoRepeatScene {...props} />
    </DarkGradientBackground>
  );
};
