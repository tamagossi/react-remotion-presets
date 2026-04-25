import React from "react";

import { StarfieldBackground, type StarfieldBackgroundProps } from "..";

export const StarfieldBackgroundComposition: React.FC<
  StarfieldBackgroundProps
> = (props) => {
  return (
    <StarfieldBackground {...props}>
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
        Starfield Background
      </div>
    </StarfieldBackground>
  );
};
