import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  GeometricMaskTitle,
  type GeometricMaskTitleProps,
} from "../GeometricMaskTitle";

export const GeometricMaskTitleComposition: React.FC<
  GeometricMaskTitleProps
> = (props) => {
  useAnton();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <GeometricMaskTitle {...props} />
    </AbsoluteFill>
  );
};
