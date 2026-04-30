import React from "react";

import {
  MixedWeightSlideText,
  type MixedWeightSlideTextProps,
} from "../MixedWeightSlideText";

export const MixedWeightSlideTextComposition: React.FC<
  MixedWeightSlideTextProps
> = (props) => {
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
      <MixedWeightSlideText {...props} />
    </div>
  );
};
