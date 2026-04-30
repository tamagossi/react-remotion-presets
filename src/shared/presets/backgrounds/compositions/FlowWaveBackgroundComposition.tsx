import React from "react";

import { FlowWaveBackground, type FlowWaveBackgroundProps } from "..";

export const FlowWaveBackgroundComposition: React.FC<
  FlowWaveBackgroundProps
> = (props) => {
  return (
    <FlowWaveBackground {...props}>
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
        Flow Wave Background
      </div>
    </FlowWaveBackground>
  );
};
