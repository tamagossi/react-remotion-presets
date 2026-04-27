import React from "react";

import { WaveCurveBackground, type WaveCurveBackgroundProps } from "..";

export const WaveCurveBackgroundComposition: React.FC<
  WaveCurveBackgroundProps
> = (props) => {
  return (
    <WaveCurveBackground {...props}>
      <div
        style={{
          alignItems: "center",
          color: "white",
          display: "flex",
          fontFamily: "sans-serif",
          fontSize: 48,
          fontWeight: 300,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        Wave Curve Background
      </div>
    </WaveCurveBackground>
  );
};
