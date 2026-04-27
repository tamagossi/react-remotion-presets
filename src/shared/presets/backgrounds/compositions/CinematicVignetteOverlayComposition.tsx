import React from "react";

import {
  CinematicVignetteOverlay,
  type CinematicVignetteOverlayProps,
  DarkGradientBackground,
} from "..";

export const CinematicVignetteOverlayComposition: React.FC<
  CinematicVignetteOverlayProps
> = (props) => {
  return (
    <DarkGradientBackground
      animationDuration={20}
      baseColor="#020617"
      blobCount={3}
      blobOpacity={0.55}
      blobSize={1.4}
      blurAmount={140}
      colors={["#0f172a", "#1e293b", "#334155"]}
      easing={[0.45, 0, 0.55, 1]}
      grainAmount={0.3}
      grainOpacity={0.04}
      vignetteStrength={0}
    >
      <CinematicVignetteOverlay {...props}>
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
          Cinematic Vignette Overlay
        </div>
      </CinematicVignetteOverlay>
    </DarkGradientBackground>
  );
};
