import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const BokehLightsBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  blurAmount: z.number().optional(),
  bokehColors: z.array(zColor()).optional(),
  bokehCount: z.number().optional(),
  bokehOpacity: z.number().optional(),
  driftAmount: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  hexShape: z.boolean().optional(),
  lightSize: z.number().optional(),
  vignetteStrength: z.number().optional(),
});
