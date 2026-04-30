import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const FocusHighlightListSchema = z.object({
  activeIndex: z.number().optional(),
  dimColor: zColor().optional(),
  dimOpacity: z.number().optional(),
  direction: z.enum(["horizontal", "vertical"]).optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  highlightColor: zColor().optional(),
  holdDuration: z.number().optional(),
  items: z.array(z.string()),
  label: z.string().optional(),
  labelColor: zColor().optional(),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
});
