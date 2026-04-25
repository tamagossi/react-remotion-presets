import React from "react";

import { LightGradientBackground, type LightGradientBackgroundProps } from "..";

export const LightGradientBackgroundComposition: React.FC<
  LightGradientBackgroundProps
> = (props) => {
  return (
    <LightGradientBackground {...props}>
      <div
        style={{
          alignItems: "center",
          color: "#2d3436",
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
        Light Gradient Background
      </div>
    </LightGradientBackground>
  );
};
