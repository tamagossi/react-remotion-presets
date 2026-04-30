import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const NodeScatterBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  connectionOpacity: z.number().optional(),
  connectionThreshold: z.number().optional(),
  driftSpeed: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  lineColor: zColor().optional(),
  lineWidth: z.number().optional(),
  nodeColor: zColor().optional(),
  nodeCount: z.number().optional(),
  nodeSize: z.number().optional(),
  pulseIntensity: z.number().optional(),
  scatterSeed: z.number().optional(),
  vignetteStrength: z.number().optional(),
});
