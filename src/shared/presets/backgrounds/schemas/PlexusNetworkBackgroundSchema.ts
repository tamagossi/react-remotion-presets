import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const PlexusNetworkBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  connectionDistance: z.number().optional(),
  connectionOpacity: z.number().optional(),
  connectionThreshold: z.number().optional(),
  driftAmount: z.number().optional(),
  driftSpeed: z.number().optional(),
  emergentShapes: z.boolean().optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  gridDensity: z.number().optional(),
  layout: z.enum(["grid", "scatter"]).optional(),
  lineColor: zColor().optional(),
  lineWidth: z.number().optional(),
  nodeColor: zColor().optional(),
  nodeCount: z.number().optional(),
  nodeSize: z.number().optional(),
  pulseIntensity: z.number().optional(),
  scatterSeed: z.number().optional(),
  shapeOpacity: z.number().optional(),
  startFrame: z.number().optional(),
  vignetteStrength: z.number().optional(),
  easing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
});
