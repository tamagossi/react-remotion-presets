import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const KineticSlamTitleSchema = z.object({
  align: z.enum(["center", "left", "right"]).optional(),
  animationDuration: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.number().optional(),
  glowColor: zColor().optional(),
  glowIntensity: z.number().optional(),
  glowSpread: z.number().optional(),
  holdDuration: z.number().optional(),
  letterSpacing: z.number().optional(),
  lines: z.array(z.string()),
  outlineColor: zColor().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  animationMode: z
    .enum(["letterStagger", "outlineSwap", "scaleSlam"])
    .optional(),
  exitEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
});
