import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import { SimpleFadeText, type SimpleFadeTextProps } from "../SimpleFadeText";

export const SimpleFadeTextComposition: React.FC<SimpleFadeTextProps> = ({
  text = "INSPIRED BY CURIOSITY",
  ...props
}) => {
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
      <SimpleFadeText text={text} {...props} />
    </AbsoluteFill>
  );
};
