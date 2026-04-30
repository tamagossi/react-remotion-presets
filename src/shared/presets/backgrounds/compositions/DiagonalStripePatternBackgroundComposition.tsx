import React from "react";

import {
  DiagonalStripePatternBackground,
  type DiagonalStripePatternBackgroundProps,
} from "..";

export const DiagonalStripePatternBackgroundComposition: React.FC<
  DiagonalStripePatternBackgroundProps
> = (props) => {
  return (
    <DiagonalStripePatternBackground {...props}>
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
        Diagonal Stripe Pattern Background
      </div>
    </DiagonalStripePatternBackground>
  );
};
