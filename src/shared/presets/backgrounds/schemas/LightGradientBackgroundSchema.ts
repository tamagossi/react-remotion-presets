import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const LightGradientBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  blobCount: z.number().optional(),
  blobOpacity: z.number().optional(),
  blobSize: z.number().optional(),
  blurAmount: z.number().optional(),
  colors: z.array(zColor()).optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  vignetteStrength: z.number().optional(),
});
