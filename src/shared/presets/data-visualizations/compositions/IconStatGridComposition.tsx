import React from "react";

import { IconStatGrid, type IconStatGridProps } from "../IconStatGrid";

export const IconStatGridComposition: React.FC<IconStatGridProps> = (props) => {
  return (
    <IconStatGrid {...props}>
      <div />
    </IconStatGrid>
  );
};
