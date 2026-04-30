import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  StickyNoteScatter,
  type StickyNoteScatterProps,
} from "../StickyNoteScatter";

export const StickyNoteScatterComposition: React.FC<StickyNoteScatterProps> = (
  props,
) => {
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
      <StickyNoteScatter {...props} />
    </AbsoluteFill>
  );
};
