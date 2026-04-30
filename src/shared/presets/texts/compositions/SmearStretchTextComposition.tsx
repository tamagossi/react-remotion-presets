import React from "react";

import {
  SmearStretchText,
  type SmearStretchTextProps,
} from "../SmearStretchText";

export const SmearStretchTextComposition: React.FC<SmearStretchTextProps> = (
  props,
) => {
  return (
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <SmearStretchText {...props} />
    </div>
  );
};
