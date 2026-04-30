import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const ArchitecturalWireframeBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  driftSpeed: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fadeToCenter: z.boolean().optional(),
  grainAmount: z.number().optional(),
  grainOpacity: z.number().optional(),
  gridDensity: z.number().optional(),
  lineColor: zColor().optional(),
  lineOpacity: z.number().optional(),
  lineThickness: z.number().optional(),
  perspectiveStrength: z.number().optional(),
  vanishingPointX: z.number().optional(),
  vanishingPointY: z.number().optional(),
  vignetteStrength: z.number().optional(),
});
