import React from "react";

import {
  GridPatternBackground,
  type GridPatternBackgroundProps,
} from "../GridPatternBackground";

export const GridPatternBackgroundComposition: React.FC<
  GridPatternBackgroundProps
> = (props) => {
  return (
    <GridPatternBackground {...props}>
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
        Grid Pattern Background
      </div>
    </GridPatternBackground>
  );
};
