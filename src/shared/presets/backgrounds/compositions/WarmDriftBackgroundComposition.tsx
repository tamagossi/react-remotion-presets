import React from "react";

import { WarmDriftBackground, type WarmDriftBackgroundProps } from "..";

export const WarmDriftBackgroundComposition: React.FC<
  WarmDriftBackgroundProps
> = (props) => {
  return (
    <WarmDriftBackground {...props}>
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
        Warm Drift Background
      </div>
    </WarmDriftBackground>
  );
};
