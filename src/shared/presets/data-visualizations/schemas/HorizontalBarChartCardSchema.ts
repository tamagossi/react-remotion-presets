import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const HorizontalBarChartCardSchema = z.object({
  animationDuration: z.number().optional(),
  badgeColor: zColor().optional(),
  badgeText: z.string().optional(),
  barHeight: z.number().optional(),
  barRadius: z.number().optional(),
  cardBg: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  data: z.array(
    z.object({
      color: zColor(),
      label: z.string(),
      maxValue: z.number().optional(),
      value: z.number(),
    }),
  ),
  enterEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  exitDuration: z.number().optional(),
  gridLines: z.boolean().optional(),
  holdDuration: z.number().optional(),
  metricLabel: z.string().optional(),
  metricPrefix: z.string().optional(),
  metricSuffix: z.string().optional(),
  metricValue: z.number().optional(),
  showPercentages: z.boolean().optional(),
  showValues: z.boolean().optional(),
  staggerDelay: z.number().optional(),
  subtitle: z.string().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  title: z.string().optional(),
  trackColor: zColor().optional(),
});
