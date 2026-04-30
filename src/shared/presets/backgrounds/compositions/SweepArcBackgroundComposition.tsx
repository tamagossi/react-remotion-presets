import React from "react";

import { SweepArcBackground, type SweepArcBackgroundProps } from "..";

export const SweepArcBackgroundComposition: React.FC<
  SweepArcBackgroundProps
> = (props) => {
  return (
    <SweepArcBackground {...props}>
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
        Sweep Arc Background
      </div>
    </SweepArcBackground>
  );
};
