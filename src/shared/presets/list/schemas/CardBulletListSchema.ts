import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const CardBulletListSchema = z.object({
  backgroundColor: zColor().optional(),
  bulletColor: zColor().optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  enterDuration: z.number().optional(),
  enterEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  exitEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  itemFontSize: z.number().optional(),
  itemGap: z.number().optional(),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  title: z.string(),
  titleAccentUnderline: z.boolean().optional(),
  titleFontSize: z.number().optional(),
  items: z.array(
    z.object({
      icon: z.string().optional(),
      text: z.string(),
    }),
  ),
});
