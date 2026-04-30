import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  SandwichLabelTitle,
  type SandwichLabelTitleProps,
} from "../SandwichLabelTitle";

export const SandwichLabelTitleComposition: React.FC<
  SandwichLabelTitleProps
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
      <SandwichLabelTitle {...props} />
    </AbsoluteFill>
  );
};
