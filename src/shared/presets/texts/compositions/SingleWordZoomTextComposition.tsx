import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import {
  SingleWordZoomText,
  type SingleWordZoomTextProps,
} from "../SingleWordZoomText";

export const SingleWordZoomTextComposition: React.FC<
  SingleWordZoomTextProps
> = ({ text = "WORDS", ...props }) => {
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
      <SingleWordZoomText text={text} {...props} />
    </AbsoluteFill>
  );
};
