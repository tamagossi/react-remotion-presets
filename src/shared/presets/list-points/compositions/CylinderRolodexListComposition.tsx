import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import {
  CylinderRolodexList,
  type CylinderRolodexListProps,
} from "../CylinderRolodexList";

export const CylinderRolodexListComposition: React.FC<
  CylinderRolodexListProps
> = (props) => {
  useAnton();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        perspective: 800,
      }}
    >
      <CylinderRolodexList {...props} />
    </AbsoluteFill>
  );
};
