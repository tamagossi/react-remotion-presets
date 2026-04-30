import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GradientTrailTitleSchema = z.object({
  animationDuration: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.union([z.number(), z.array(z.number())]).optional(),
  fontStyle: z.string().optional(),
  fontWeight: z.number().optional(),
  gap: z.number().optional(),
  holdDuration: z.number().optional(),
  lines: z.array(z.string()),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  textTransform: z
    .enum(["capitalize", "lowercase", "none", "uppercase"])
    .optional(),
  trailColor: zColor().optional(),
  trailLength: z.number().optional(),
});
