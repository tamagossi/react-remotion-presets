import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const StarfieldBackgroundSchema = z.object({
  animationDuration: z.number().optional(),
  baseColor: zColor().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  nebulaColor: zColor().optional(),
  nebulaOpacity: z.number().optional(),
  starColor: zColor().optional(),
  starCount: z.number().optional(),
  starOpacity: z.number().optional(),
  vignetteStrength: z.number().optional(),
});
