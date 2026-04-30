import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const PillBarListSchema = z.object({
  borderRadius: z.number().optional(),
  direction: z.enum(["down", "up"]).optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  holdDuration: z.number().optional(),
  items: z.array(z.string()),
  pillBorderColor: zColor().optional(),
  pillColor: zColor().optional(),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
});
