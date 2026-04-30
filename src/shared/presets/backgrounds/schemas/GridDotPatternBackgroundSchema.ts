import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GridDotPatternBackgroundSchema = z.object({
  accentColor: zColor().optional(),
  animationDuration: z.number().optional(),
  animationSpeed: z.number().optional(),
  baseColor: zColor().optional(),
  dotSize: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  opacity: z.number().optional(),
  parallaxDepth: z.boolean().optional(),
  patternDensity: z.number().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  vignetteStrength: z.number().optional(),
});
