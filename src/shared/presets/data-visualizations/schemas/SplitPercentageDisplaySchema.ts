import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const SplitPercentageDisplaySchema = z.object({
  accentColor: zColor().optional(),
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  bottomColor: zColor().optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fontFamily: z.string().optional(),
  showCard: z.boolean().optional(),
  suffix: z.string().optional(),
  theme: z.record(z.string(), z.string()).optional(),
  value: z.number(),
});
