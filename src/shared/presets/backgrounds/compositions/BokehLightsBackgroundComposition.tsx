import React from "react";

import { BokehLightsBackground, type BokehLightsBackgroundProps } from "..";

export const BokehLightsBackgroundComposition: React.FC<
  BokehLightsBackgroundProps
> = (props) => {
  return (
    <BokehLightsBackground {...props}>
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
        Bokeh Lights Background
      </div>
    </BokehLightsBackground>
  );
};
