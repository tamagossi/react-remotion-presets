import React from "react";

import { AbsoluteFill } from "remotion";

import { useDmSans } from "../../../hooks/useDmSans";
import {
  MixedEmphasisTitle,
  type MixedEmphasisTitleProps,
} from "../MixedEmphasisTitle";

export const MixedEmphasisTitleComposition: React.FC<
  MixedEmphasisTitleProps
> = ({
  segments = [
    { fontSize: 96, fontWeight: 700, text: "KNOWLEDGE" },
    {
      color: "#909090",
      fontSize: 72,
      fontStyle: "italic",
      fontWeight: 400,
      text: "IS",
    },
    { fontSize: 96, fontWeight: 700, text: "POWER" },
  ],
  ...props
}) => {
  useDmSans();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <MixedEmphasisTitle segments={segments} {...props} />
    </AbsoluteFill>
  );
};
