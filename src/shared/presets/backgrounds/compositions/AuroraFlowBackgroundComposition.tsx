import React from "react";

import { AuroraFlowBackground, type AuroraFlowBackgroundProps } from "..";

export const AuroraFlowBackgroundComposition: React.FC<
  AuroraFlowBackgroundProps
> = (props) => {
  return (
    <AuroraFlowBackground {...props}>
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
        Aurora Flow Background
      </div>
    </AuroraFlowBackground>
  );
};
