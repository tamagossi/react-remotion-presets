import React from "react";

import { RotateInText, type RotateInTextProps } from "../RotateInText";

export const RotateInTextComposition: React.FC<RotateInTextProps> = (props) => {
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
      <RotateInText {...props} />
    </div>
  );
};
