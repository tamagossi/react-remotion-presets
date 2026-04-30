import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const AtmosphericFogBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  bandBlur: z.number().optional(),
  bandCount: z.number().optional(),
  bandOpacity: z.number().optional(),
  baseColor: zColor().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fogColors: z.array(zColor()).optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  vignetteStrength: z.number().optional(),
});
