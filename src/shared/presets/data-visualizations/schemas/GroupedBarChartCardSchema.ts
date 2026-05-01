import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GroupedBarChartCardSchema = z.object({
  animationDuration: z.number().optional(),
  badgeColor: zColor().optional(),
  badgeText: z.string().optional(),
  barGap: z.number().optional(),
  barWidth: z.number().optional(),
  cardBg: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  colors: z.array(zColor()).optional(),
  exitDuration: z.number().optional(),
  gridLines: z.boolean().optional(),
  groupGap: z.number().optional(),
  holdDuration: z.number().optional(),
  labels: z.array(z.string()).optional(),
  metricLabel: z.string().optional(),
  metricPrefix: z.string().optional(),
  metricSuffix: z.string().optional(),
  metricValue: z.number().optional(),
  seriesNames: z.array(z.string()).optional(),
  showLegend: z.boolean().optional(),
  staggerDelay: z.number().optional(),
  subtitle: z.string().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  title: z.string().optional(),
  data: z.array(
    z.object({ label: z.string().optional(), values: z.array(z.number()) }),
  ),
  enterEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
});
