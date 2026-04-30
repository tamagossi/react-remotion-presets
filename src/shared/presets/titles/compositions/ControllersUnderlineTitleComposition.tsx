import React from "react";

import { AbsoluteFill } from "remotion";

import { useMontserrat } from "../../../hooks/useMontserrat";
import { useOswald } from "../../../hooks/useOswald";
import {
  ControllersUnderlineTitle,
  type ControllersUnderlineTitleProps,
} from "../ControllersUnderlineTitle";

export const ControllersUnderlineTitleComposition: React.FC<
  ControllersUnderlineTitleProps
> = ({ lines = ["CONTROLLERS"], ...props }) => {
  useOswald();
  useMontserrat();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ControllersUnderlineTitle lines={lines} {...props} />
    </AbsoluteFill>
  );
};
