import React from "react";

import { PaperTextureBackground, type PaperTextureBackgroundProps } from "..";

export const PaperTextureBackgroundComposition: React.FC<
  PaperTextureBackgroundProps
> = (props) => {
  return (
    <PaperTextureBackground {...props}>
      <div
        style={{
          alignItems: "center",
          color: "#2a2a2a",
          display: "flex",
          fontFamily: "serif",
          fontSize: 48,
          fontWeight: 400,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        Paper Texture Background
      </div>
    </PaperTextureBackground>
  );
};
