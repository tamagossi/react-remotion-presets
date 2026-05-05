import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const BarRevealListSchema = z.object({
  accentColor: zColor().optional(),
  backgroundColor: zColor().optional(),
  barHeight: z.number().optional(),
  enterDuration: z.number().optional(),
  enterEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  exitEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  itemFontSize: z.number().optional(),
  itemGap: z.number().optional(),
  ruleWidth: z.number().optional(),
  secondaryTextColor: zColor().optional(),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
  sublabelFontSize: z.number().optional(),
  textColor: zColor().optional(),
  title: z.string().optional(),
  titleFontSize: z.number().optional(),
  items: z.array(
    z.object({
      label: z.string(),
      sublabel: z.string().optional(),
    }),
  ),
});
