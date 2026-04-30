import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GeometricGridBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fadeToHorizon: z.boolean().optional(),
  glowPulse: z.boolean().optional(),
  gridDensity: z.number().optional(),
  lineColor: zColor().optional(),
  lineOpacity: z.number().optional(),
  lineWidth: z.number().optional(),
  perspective: z.number().optional(),
  vignetteStrength: z.number().optional(),
});
