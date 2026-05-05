import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const IconGridListSchema = z.object({
  accentColor: zColor().optional(),
  backgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardGap: z.number().optional(),
  cardPadding: z.number().optional(),
  descriptionColor: zColor().optional(),
  descriptionFontSize: z.number().optional(),
  enterDuration: z.number().optional(),
  enterEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  exitEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  iconColor: zColor().optional(),
  iconFontSize: z.number().optional(),
  labelFontSize: z.number().optional(),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  items: z.array(
    z.object({
      description: z.string().optional(),
      icon: z.string(),
      label: z.string(),
    }),
  ),
});
