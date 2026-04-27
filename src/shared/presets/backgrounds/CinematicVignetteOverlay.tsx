import React from "react";

import { AbsoluteFill } from "remotion";

import { GrainOverlay } from "../../components/GrainOverlay";
import { VignetteOverlay } from "../../components/VignetteOverlay";

export type CinematicVignetteOverlayProps = {
  children?: React.ReactNode;
  grainAmount?: number;
  grainAnimated?: boolean;
  grainOpacity?: number;
  grainSpeed?: number;
  lightLeakColor?: string;
  lightLeakOpacity?: number;
  vignetteColor?: string;
  vignetteShape?: "circle" | "oval";
  vignetteStrength?: number;
};

export const CinematicVignetteOverlay: React.FC<
  CinematicVignetteOverlayProps
> = ({
  children,
  grainAmount = 0.3,
  grainAnimated = true,
  grainOpacity = 0.04,
  grainSpeed = 0.5,
  lightLeakColor = "#ff6b35",
  lightLeakOpacity = 0.08,
  vignetteColor = "#000000",
  vignetteShape = "oval",
  vignetteStrength = 0.4,
}) => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {children}

      <GrainOverlay
        amount={grainAmount}
        animated={grainAnimated}
        opacity={grainOpacity}
        speed={grainSpeed}
      />

      <VignetteOverlay
        color={vignetteColor}
        shape={vignetteShape}
        strength={vignetteStrength}
      />

      {lightLeakOpacity > 0 && (
        <div
          style={{
            background: `radial-gradient(circle at 80% 20%, ${lightLeakColor} 0%, transparent 50%)`,
            height: "100%",
            left: 0,
            mixBlendMode: "screen",
            opacity: lightLeakOpacity,
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
