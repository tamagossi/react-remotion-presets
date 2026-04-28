import React from "react";

import {
  NodeScatterBackground,
  type NodeScatterBackgroundProps,
} from "../NodeScatterBackground";

export const NodeScatterBackgroundComposition: React.FC<
  NodeScatterBackgroundProps
> = (props) => {
  return (
    <NodeScatterBackground {...props}>
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
        <div>NODE SCATTER</div>
        <div
          style={{
            color: "#94a3b8",
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: "0.1em",
            marginTop: 16,
          }}
        >
          DECENTRALIZED
        </div>
      </div>
    </NodeScatterBackground>
  );
};
