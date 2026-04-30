import React from "react";

import {
  GridLinePatternBackground,
  type GridLinePatternBackgroundProps,
} from "..";

export const GridLinePatternBackgroundComposition: React.FC<
  GridLinePatternBackgroundProps
> = (props) => {
  return (
    <GridLinePatternBackground {...props}>
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
        Grid Line Pattern Background
      </div>
    </GridLinePatternBackground>
  );
};
