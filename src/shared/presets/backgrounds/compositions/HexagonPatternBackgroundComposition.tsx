import React from "react";

import {
  HexagonPatternBackground,
  type HexagonPatternBackgroundProps,
} from "..";

export const HexagonPatternBackgroundComposition: React.FC<
  HexagonPatternBackgroundProps
> = (props) => {
  return (
    <HexagonPatternBackground {...props}>
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
        Hexagon Pattern Background
      </div>
    </HexagonPatternBackground>
  );
};
