import React from "react";

import {
  ConcentricCirclePatternBackground,
  type ConcentricCirclePatternBackgroundProps,
} from "..";

export const ConcentricCirclePatternBackgroundComposition: React.FC<
  ConcentricCirclePatternBackgroundProps
> = (props) => {
  return (
    <ConcentricCirclePatternBackground {...props}>
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
        Concentric Circle Pattern Background
      </div>
    </ConcentricCirclePatternBackground>
  );
};
