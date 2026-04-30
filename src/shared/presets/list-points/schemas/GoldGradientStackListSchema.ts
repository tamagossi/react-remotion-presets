import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GoldGradientStackListSchema = z.object({
  dimOpacity: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  focusIndex: z.number().optional(),
  fontSize: z.number().optional(),
  gradientColors: z.tuple([zColor(), zColor()]).optional(),
  holdDuration: z.number().optional(),
  items: z.array(z.string()),
  shiftOffset: z.number().optional(),
  startFrame: z.number().optional(),
});
