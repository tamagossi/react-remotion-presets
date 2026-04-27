import React from "react";

import {
  DiagonalSpectrumBackground,
  type DiagonalSpectrumBackgroundProps,
} from "..";

export const DiagonalSpectrumBackgroundComposition: React.FC<
  DiagonalSpectrumBackgroundProps
> = (props) => {
  return (
    <DiagonalSpectrumBackground {...props}>
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
        Diagonal Spectrum Background
      </div>
    </DiagonalSpectrumBackground>
  );
};
