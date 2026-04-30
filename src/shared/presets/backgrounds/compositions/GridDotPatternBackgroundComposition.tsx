import React from "react";

import {
  GridDotPatternBackground,
  type GridDotPatternBackgroundProps,
} from "..";

export const GridDotPatternBackgroundComposition: React.FC<
  GridDotPatternBackgroundProps
> = (props) => {
  return (
    <GridDotPatternBackground {...props}>
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
        Grid Dot Pattern Background
      </div>
    </GridDotPatternBackground>
  );
};
