import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import { WaveText, type WaveTextProps } from "../WaveText";

export const WaveTextComposition: React.FC<WaveTextProps> = (props) => {
  useAnton();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WaveText {...props} />
    </AbsoluteFill>
  );
};
