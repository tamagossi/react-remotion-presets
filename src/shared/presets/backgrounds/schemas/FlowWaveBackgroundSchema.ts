import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const FlowWaveBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  flowSpeed: z.number().optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  vignetteStrength: z.number().optional(),
  waveBlur: z.number().optional(),
  waveColors: z.array(zColor()).optional(),
  waveCount: z.number().optional(),
  waveOpacity: z.number().optional(),
  waveThickness: z.number().optional(),
});
