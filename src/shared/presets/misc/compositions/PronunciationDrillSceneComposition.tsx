import React from "react";

import { DarkGradientBackground } from "../../backgrounds";
import { useInter } from "../../../hooks/useInter";
import {
  PronunciationDrillScene,
  type PronunciationDrillSceneProps,
} from "../PronunciationDrillScene";

export const PronunciationDrillSceneComposition: React.FC<
  PronunciationDrillSceneProps
> = (props) => {
  useInter();
  return (
    <DarkGradientBackground>
      <PronunciationDrillScene {...props} />
    </DarkGradientBackground>
  );
};
