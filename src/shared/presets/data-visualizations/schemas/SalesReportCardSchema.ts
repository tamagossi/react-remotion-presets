import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const SalesReportCardSchema = z.object({
  animationDuration: z.number().optional(),
  areaColor: zColor().optional(),
  areaOpacity: z.number().optional(),
  badgeColor: zColor().optional(),
  badgeText: z.string().optional(),
  cardBg: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  data: z.array(z.number()),
  exitDuration: z.number().optional(),
  gridLines: z.boolean().optional(),
  holdDuration: z.number().optional(),
  labels: z.array(z.string()).optional(),
  lineColor: zColor().optional(),
  lineWidth: z.number().optional(),
  metricLabel: z.string().optional(),
  metricPrefix: z.string().optional(),
  metricSuffix: z.string().optional(),
  metricValue: z.number().optional(),
  showDots: z.boolean().optional(),
  showGradient: z.boolean().optional(),
  staggerDelay: z.number().optional(),
  subtitle: z.string().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  title: z.string().optional(),
  enterEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
});
