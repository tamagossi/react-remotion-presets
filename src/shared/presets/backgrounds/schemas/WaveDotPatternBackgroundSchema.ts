import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const WaveDotPatternBackgroundSchema = z.object({
  accentColor: zColor().optional(),
  amplitude: z.number().optional(),
  animationDuration: z.number().optional(),
  animationSpeed: z.number().optional(),
  baseColor: zColor().optional(),
  dotSize: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  frequency: z.number().optional(),
  opacity: z.number().optional(),
  patternDensity: z.number().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  vignetteStrength: z.number().optional(),
  waveDirection: z.enum(["horizontal", "vertical"]).optional(),
});
