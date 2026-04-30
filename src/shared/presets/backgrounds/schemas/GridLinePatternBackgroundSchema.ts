import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GridLinePatternBackgroundSchema = z.object({
  accentColor: zColor().optional(),
  animationDuration: z.number().optional(),
  animationSpeed: z.number().optional(),
  baseColor: zColor().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  lineWidth: z.number().optional(),
  opacity: z.number().optional(),
  patternDensity: z.number().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  vignetteStrength: z.number().optional(),
});
