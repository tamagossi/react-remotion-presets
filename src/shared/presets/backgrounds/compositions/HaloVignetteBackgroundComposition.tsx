import React from "react";

import {
  HaloVignetteBackground,
  type HaloVignetteBackgroundProps,
} from "..";

export const HaloVignetteBackgroundComposition: React.FC<
  HaloVignetteBackgroundProps
> = (props) => {
  return (
    <HaloVignetteBackground {...props}>
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
        Halo Vignette Background
      </div>
    </HaloVignetteBackground>
  );
};
