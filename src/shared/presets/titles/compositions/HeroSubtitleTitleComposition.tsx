import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  HeroSubtitleTitle,
  type HeroSubtitleTitleProps,
} from "../HeroSubtitleTitle";

export const HeroSubtitleTitleComposition: React.FC<HeroSubtitleTitleProps> = ({
  lines = ["DYNAMIC", "Titles Kit"],
  ...props
}) => {
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
      <HeroSubtitleTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
