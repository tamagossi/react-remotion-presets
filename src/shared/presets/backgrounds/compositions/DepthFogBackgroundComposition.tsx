import React from "react";

import { DepthFogBackground, type DepthFogBackgroundProps } from "..";

export const DepthFogBackgroundComposition: React.FC<
  DepthFogBackgroundProps
> = (props) => {
  return (
    <DepthFogBackground {...props}>
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
        Depth Fog Background
      </div>
    </DepthFogBackground>
  );
};
