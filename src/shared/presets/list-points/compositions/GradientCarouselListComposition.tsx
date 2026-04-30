import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  GradientCarouselList,
  type GradientCarouselListProps,
} from "../GradientCarouselList";

export const GradientCarouselListComposition: React.FC<
  GradientCarouselListProps
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
      <GradientCarouselList {...props} />
    </AbsoluteFill>
  );
};
