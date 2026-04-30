import React from "react";

import { BlurRevealText, type BlurRevealTextProps } from "../BlurRevealText";

export const BlurRevealTextComposition: React.FC<BlurRevealTextProps> = (
  props,
) => {
  return (
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <BlurRevealText {...props} />
    </div>
  );
};
