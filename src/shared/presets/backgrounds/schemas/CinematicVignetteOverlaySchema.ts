import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const CinematicVignetteOverlaySchema = z.object({
  grainAmount: z.number().optional(),
  grainAnimated: z.boolean().optional(),
  grainOpacity: z.number().optional(),
  grainSpeed: z.number().optional(),
  lightLeakColor: zColor().optional(),
  lightLeakOpacity: z.number().optional(),
  vignetteColor: zColor().optional(),
  vignetteShape: z.enum(["circle", "oval"]).optional(),
  vignetteStrength: z.number().optional(),
});
