import React from "react";

import { AtmosphericFogBackground, type AtmosphericFogBackgroundProps } from "..";

export const AtmosphericFogBackgroundComposition: React.FC<
  AtmosphericFogBackgroundProps
> = (props) => {
  return (
    <AtmosphericFogBackground {...props}>
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
        Atmospheric Fog Background
      </div>
    </AtmosphericFogBackground>
  );
};
