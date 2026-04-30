import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const DataCardSchema = z.object({
  animationDuration: z.number().optional(),
  badgeColor: zColor().optional(),
  badgeText: z.string().optional(),
  cardBg: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  enterEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  exitDuration: z.number().optional(),
  holdDuration: z.number().optional(),
  metricLabel: z.string().optional(),
  metricPrefix: z.string().optional(),
  metricSuffix: z.string().optional(),
  metricValue: z.number().optional(),
  staggerDelay: z.number().optional(),
  subtitle: z.string().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  title: z.string().optional(),
});
