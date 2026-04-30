import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const StarPointListSchema = z.object({
  accentColor: zColor().optional(),
  activeIndex: z.number().optional(),
  backgroundColor: zColor().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  holdDuration: z.number().optional(),
  items: z.array(z.string()),
  staggerDelay: z.number().optional(),
  starColor: zColor().optional(),
  starSize: z.number().optional(),
  startFrame: z.number().optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
});
