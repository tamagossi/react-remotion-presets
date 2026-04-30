import React from "react";

import { AbsoluteFill } from "remotion";

import { useAnton } from "../../../hooks/useAnton";
import { QuoteBlockTitle, type QuoteBlockTitleProps } from "../QuoteBlockTitle";

export const QuoteBlockTitleComposition: React.FC<QuoteBlockTitleProps> = ({
  attribution = "— W. EDWARDS",
  context = "WITHOUT DATA",
  quote = "YOU'RE JUST ANOTHER PERSON WITH AN OPINION",
  ...props
}) => {
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
      <QuoteBlockTitle
        attribution={attribution}
        context={context}
        quote={quote}
        {...props}
      />
    </AbsoluteFill>
  );
};
