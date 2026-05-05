import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const NumberedCircleListSchema = z.object({
  accentColor: zColor().optional(),
  backgroundColor: zColor().optional(),
  circleSize: z.number().optional(),
  descriptionColor: zColor().optional(),
  descriptionFontSize: z.number().optional(),
  enterDuration: z.number().optional(),
  enterEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  exitEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  itemGap: z.number().optional(),
  labelFontSize: z.number().optional(),
  numberFontSize: z.number().optional(),
  ringWidth: z.number().optional(),
  showRipple: z.boolean().optional(),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  items: z.array(
    z.object({
      description: z.string().optional(),
      label: z.string(),
      number: z.number(),
    }),
  ),
});
