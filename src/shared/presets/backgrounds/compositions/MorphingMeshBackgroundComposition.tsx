import React from "react";

import { MorphingMeshBackground, type MorphingMeshBackgroundProps } from "../";

export const MorphingMeshBackgroundComposition: React.FC<
  MorphingMeshBackgroundProps
> = (props) => {
  return (
    <MorphingMeshBackground {...props}>
      <div
        style={{
          alignItems: "center",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "0 64px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Gradient Backgrounds
        </h1>
        <p
          style={{
            fontSize: "24px",
            fontWeight: 400,
            marginTop: "16px",
            opacity: 0.8,
          }}
        >
          Fully customizable &amp; looped
        </p>
      </div>
    </MorphingMeshBackground>
  );
};
