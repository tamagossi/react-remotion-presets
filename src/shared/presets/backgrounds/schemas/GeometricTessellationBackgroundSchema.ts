import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GeometricTessellationBackgroundSchema = z.object({
  accentColor: zColor().optional(),
  animationDuration: z.number().optional(),
  bandCount: z.number().optional(),
  baseColor: zColor().optional(),
  chevronDepth: z.number().optional(),
  dotDensity: z.number().optional(),
  driftSpeed: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  layerOffset: z.number().optional(),
  lineColor: zColor().optional(),
  lineOpacity: z.number().optional(),
  lineThickness: z.number().optional(),
  nestingDepth: z.number().optional(),
  rotationSpeed: z.number().optional(),
  scalePulse: z.number().optional(),
  tileSize: z.number().optional(),
  patternType: z
    .enum([
      "chevron",
      "chevronDot",
      "diamondCross",
      "diamondGrid",
      "hexCube",
      "lWeave",
    ])
    .optional(),
});
