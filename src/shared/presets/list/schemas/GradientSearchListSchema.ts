import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GradientSearchListSchema = z.object({
  barBorderRadius: z.number().optional(),
  barHeight: z.number().optional(),
  barPaddingX: z.number().optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  gradientColors: z.array(zColor()).optional(),
  iconSize: z.number().optional(),
  itemGap: z.number().optional(),
  itemSubtitleColor: zColor().optional(),
  itemSubtitleFontSize: z.number().optional(),
  itemTitleFontSize: z.number().optional(),
  listStaggerDelay: z.number().optional(),
  numberFontSize: z.number().optional(),
  numberSize: z.number().optional(),
  searchQuery: z.string().optional(),
  showClearButton: z.boolean().optional(),
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
      iconColor: zColor().optional(),
      number: z.number().optional(),
      subtitle: z.string().optional(),
      title: z.string(),
    }),
  ),
});
