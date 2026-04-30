import React from "react";

import {
  WaveDotPatternBackground,
  type WaveDotPatternBackgroundProps,
} from "..";

export const WaveDotPatternBackgroundComposition: React.FC<
  WaveDotPatternBackgroundProps
> = (props) => {
  return (
    <WaveDotPatternBackground {...props}>
      <div
        style={{
          alignItems: "center",
          color: "#ffffff",
          display: "flex",
          fontFamily: "sans-serif",
          fontSize: 36,
          fontWeight: 300,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        Wave Dot Pattern Background
      </div>
    </WaveDotPatternBackground>
  );
};
