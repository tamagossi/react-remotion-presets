import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const DarkGradientBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  blobCount: z.number().optional(),
  blobOpacity: z.number().optional(),
  blobSize: z.number().optional(),
  blurAmount: z.number().optional(),
  colors: z.array(zColor()).optional(),
  driftComplexity: z.number().optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  mixBlendMode: z.enum(["normal", "screen", "soft-light"]).optional(),
  motionStyle: z.enum(["circular", "complex", "figure8"]).optional(),
  startFrame: z.number().optional(),
  vignetteStrength: z.number().optional(),
  easing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  theme: z
    .enum(["auto", "dark", "light", "monochrome", "sunset", "warm"])
    .optional(),
});
