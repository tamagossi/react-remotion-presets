import React from "react";

import {
  PlexusNetworkBackground,
  type PlexusNetworkBackgroundProps,
} from "../PlexusNetworkBackground";

export const PlexusNetworkBackgroundComposition: React.FC<
  PlexusNetworkBackgroundProps
> = (props) => {
  return (
    <PlexusNetworkBackground {...props}>
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
        <div>PLEXUS NETWORK</div>
        <div
          style={{
            color: "#94a3b8",
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: "0.1em",
            marginTop: 16,
          }}
        >
          CONNECTED DATA
        </div>
      </div>
    </PlexusNetworkBackground>
  );
};
