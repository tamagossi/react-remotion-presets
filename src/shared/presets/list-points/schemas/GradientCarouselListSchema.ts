import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GradientCarouselListSchema = z.object({
  direction: z.enum(["left", "right"]).optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  gradientColors: z.tuple([zColor(), zColor()]).optional(),
  holdDuration: z.number().optional(),
  items: z.array(z.string()),
  label: z.string().optional(),
  labelColor: zColor().optional(),
  scrollSpeed: z.number().optional(),
  startFrame: z.number().optional(),
});
