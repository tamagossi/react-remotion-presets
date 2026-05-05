import React from "react";

import { AbsoluteFill } from "remotion";

import { CardBulletList, type CardBulletListProps } from "../CardBulletList";

export const CardBulletListComposition: React.FC<CardBulletListProps> = (
  props,
) => {
  return (
    <AbsoluteFill>
      <CardBulletList {...props} />
    </AbsoluteFill>
  );
};
