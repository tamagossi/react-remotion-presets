import React from "react";

export type VignetteShape = "circle" | "oval";

export type VignetteOverlayProps = {
  strength?: number;
  color?: string;
  shape?: VignetteShape;
};

export const VignetteOverlay: React.FC<VignetteOverlayProps> = ({
  color = "#000000",
  shape = "oval",
  strength = 0.4,
}) => {
  const gradient =
    shape === "oval"
      ? `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, ${color} 100%)`
      : `radial-gradient(circle at 50% 50%, transparent 0%, ${color} 100%)`;

  return (
    <div
      style={{
        background: gradient,
        height: "100%",
        left: 0,
        opacity: strength,
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 5,
      }}
    />
  );
};
