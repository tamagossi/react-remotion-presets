import React, { useMemo } from "react";

import { interpolate, useCurrentFrame } from "remotion";

export type GrainOverlayProps = {
  opacity?: number;
  amount?: number;
  animated?: boolean;
  speed?: number;
};

export const GrainOverlay: React.FC<GrainOverlayProps> = ({
  amount = 0.3,
  animated = true,
  opacity = 0.04,
  speed = 0.5,
}) => {
  const frame = useCurrentFrame();

  const grainPattern = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  const grainOpacity = animated
    ? interpolate(
        frame,
        [0, 30 / speed],
        [opacity * amount, opacity * amount * 0.7],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "extend",
        },
      )
    : opacity * amount;

  return (
    <div
      style={{
        backgroundImage: grainPattern,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        height: "100%",
        left: 0,
        opacity: grainOpacity,
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        width: "100%",
      }}
    />
  );
};
