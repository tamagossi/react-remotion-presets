import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const FlatSearchListSchema = z.object({
  accentColor: zColor().optional(),
  accentIcon: z.string().optional(),
  barBorderRadius: z.number().optional(),
  barHeight: z.number().optional(),
  barPaddingX: z.number().optional(),
  barWidth: z.number().optional(),
  bulletSize: z.number().optional(),
  columns: z.number().optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  iconSize: z.number().optional(),
  itemGap: z.number().optional(),
  itemTitleFontSize: z.number().optional(),
  listStaggerDelay: z.number().optional(),
  searchBarBackground: zColor().optional(),
  searchQuery: z.string().optional(),
  showAccentIcon: z.boolean().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  typewriterSpeed: z.number().optional(),
  enterEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  exitEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  items: z.array(
    z.object({
      bulletColor: zColor().optional(),
      title: z.string(),
    }),
  ),
});
