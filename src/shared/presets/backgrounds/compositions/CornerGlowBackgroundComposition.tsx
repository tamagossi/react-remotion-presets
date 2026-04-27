import React from "react";

import { CornerGlowBackground, type CornerGlowBackgroundProps } from "..";

export const CornerGlowBackgroundComposition: React.FC<
  CornerGlowBackgroundProps
> = (props) => {
  return (
    <CornerGlowBackground {...props}>
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
        Corner Glow Background
      </div>
    </CornerGlowBackground>
  );
};
