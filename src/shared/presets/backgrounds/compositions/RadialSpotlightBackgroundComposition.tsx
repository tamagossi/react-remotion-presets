import React from "react";

import {
  RadialSpotlightBackground,
  type RadialSpotlightBackgroundProps,
} from "..";

export const RadialSpotlightBackgroundComposition: React.FC<
  RadialSpotlightBackgroundProps
> = (props) => {
  return (
    <RadialSpotlightBackground {...props}>
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
        Radial Spotlight Background
      </div>
    </RadialSpotlightBackground>
  );
};
