import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const SweepArcBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  arcColor: zColor().optional(),
  arcOpacity: z.number().optional(),
  arcPosition: z.number().optional(),
  arcWidth: z.number().optional(),
  baseColor: zColor().optional(),
  blurAmount: z.number().optional(),
  breatheAmount: z.number().optional(),
  driftAmount: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  vignetteStrength: z.number().optional(),
});
