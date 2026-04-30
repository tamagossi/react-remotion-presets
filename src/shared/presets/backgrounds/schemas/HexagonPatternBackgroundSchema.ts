import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const HexagonPatternBackgroundSchema = z.object({
  accentColor: zColor().optional(),
  animationDuration: z.number().optional(),
  animationSpeed: z.number().optional(),
  baseColor: zColor().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  opacity: z.number().optional(),
  patternDensity: z.number().optional(),
  rotationSpeed: z.number().optional(),
  scaleBreathe: z.boolean().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  vignetteStrength: z.number().optional(),
});
