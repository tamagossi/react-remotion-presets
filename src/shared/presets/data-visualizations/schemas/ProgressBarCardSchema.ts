import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const ProgressBarCardSchema = z.object({
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  barColors: z.array(zColor()).optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  currentValue: z.number(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fontFamily: z.string().optional(),
  maxValue: z.number(),
  prefix: z.string().optional(),
  showCard: z.boolean().optional(),
  suffix: z.string().optional(),
  theme: z.record(z.string(), z.string()).optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
});
