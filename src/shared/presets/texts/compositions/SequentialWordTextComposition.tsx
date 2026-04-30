import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../../shared/hooks/useAnton";
import {
  SequentialWordText,
  type SequentialWordTextProps,
} from "../SequentialWordText";

export const SequentialWordTextComposition: React.FC<
  SequentialWordTextProps
> = ({ text = "THANK YOU FOR WATCHING", ...props }) => {
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
      <SequentialWordText text={text} {...props} />
    </AbsoluteFill>
  );
};
