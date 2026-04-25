import React from "react";

import { NeonPulseBackground, type NeonPulseBackgroundProps } from "..";

export const NeonPulseBackgroundComposition: React.FC<
  NeonPulseBackgroundProps
> = (props) => {
  return (
    <NeonPulseBackground {...props}>
      <div
        style={{
          alignItems: "center",
          color: "#ffffff",
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
        Neon Pulse Background
      </div>
    </NeonPulseBackground>
  );
};
