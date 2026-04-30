import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  KineticTextMorph,
  type KineticTextMorphProps,
} from "../KineticTextMorph";

export const KineticTextMorphComposition: React.FC<KineticTextMorphProps> = (
  props,
) => {
  useAnton();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <KineticTextMorph {...props} />
    </AbsoluteFill>
  );
};
