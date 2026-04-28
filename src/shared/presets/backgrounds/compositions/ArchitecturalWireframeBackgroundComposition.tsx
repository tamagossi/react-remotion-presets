import React from "react";

import {
  ArchitecturalWireframeBackground,
  type ArchitecturalWireframeBackgroundProps,
} from "../ArchitecturalWireframeBackground";

export const ArchitecturalWireframeBackgroundComposition: React.FC<
  ArchitecturalWireframeBackgroundProps
> = (props) => {
  return (
    <ArchitecturalWireframeBackground {...props}>
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
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}
      >
        <div>ARCHITECTURE</div>
        <div
          style={{
            color: "#7dd3fc",
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: "0.1em",
            marginTop: 16,
          }}
        >
          WIREFRAME SPACE
        </div>
      </div>
    </ArchitecturalWireframeBackground>
  );
};
