import React from "react";

import { FocusShiftText, type FocusShiftTextProps } from "../FocusShiftText";

export const FocusShiftTextComposition: React.FC<FocusShiftTextProps> = (
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
      <FocusShiftText {...props} />
    </div>
  );
};
