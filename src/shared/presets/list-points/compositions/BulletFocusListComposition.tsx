import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { BulletFocusList, type BulletFocusListProps } from "../BulletFocusList";

export const BulletFocusListComposition: React.FC<BulletFocusListProps> = (
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
      <BulletFocusList {...props} />
    </AbsoluteFill>
  );
};
