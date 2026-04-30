import React from "react";

import { WordSwapText, type WordSwapTextProps } from "../WordSwapText";

export const WordSwapTextComposition: React.FC<WordSwapTextProps> = (props) => {
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
      <WordSwapText {...props} />
    </div>
  );
};
