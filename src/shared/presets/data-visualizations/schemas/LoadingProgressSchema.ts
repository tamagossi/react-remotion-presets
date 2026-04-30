import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const LoadingProgressSchema = z.object({
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  barColor: zColor().optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fontFamily: z.string().optional(),
  label: z.string().optional(),
  showCard: z.boolean().optional(),
  theme: z.record(z.string(), z.string()).optional(),
  value: z.number(),
});
