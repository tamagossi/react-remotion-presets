import React from "react";

import {
  GeometricTessellationBackground,
  type GeometricTessellationBackgroundProps,
} from "../GeometricTessellationBackground";

export const GeometricTessellationBackgroundComposition: React.FC<
  GeometricTessellationBackgroundProps
> = (props) => {
  return (
    <GeometricTessellationBackground {...props}>
      <div
        style={{
          alignItems: "center",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          fontSize: 72,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "0.02em",
          textAlign: "center",
          textShadow: "0 2px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div>TESSELLATION</div>
        <div
          style={{
            color: "#a5f3fc",
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: "0.1em",
            marginTop: 16,
          }}
        >
          GEOMETRIC PATTERNS
        </div>
      </div>
    </GeometricTessellationBackground>
  );
};
